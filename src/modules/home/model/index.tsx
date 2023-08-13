import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

import { RootStackParamList, SCREEN_NAMES } from "src/shared";
import { supabase } from "../../../services";

import { useAuth } from "src/modules/auth";
import { retrieveRecenteExpense } from "../services/retrieveRecenteExpense";
import { ExpenseNormalized } from "../services/retrieveRecenteExpense/types";
import { VehicleEntityHome } from "./types";

export const useHomeModel = ({ navigation }: RootStackParamList["Home"]) => {
  const { user } = useAuth();

  const [vehicleData, setVehicleData] = useState<VehicleEntityHome[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [recentExpenses, setRecentExpenses] = useState<ExpenseNormalized[]>([]);

  const redirectToVehicleForm = () => {
    navigation.navigate(SCREEN_NAMES.vehicle as never);
  };

  const redirectToVehicleDetail = (vehicleData: VehicleEntityHome) => () => {
    AsyncStorage.setItem("selectedVehicle", JSON.stringify(vehicleData));
    navigation.navigate(SCREEN_NAMES.vehicleDetail as never);
  };

  const loadData = useCallback(async () => {
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq("user_id", user?.id);

    if (error) {
      Alert.alert("Erro ao carregar veículos, verifique sua conexão.");
    }

    if (!data) return;
    setIsLoading(false);
    setVehicleData(data as any);
  }, [user?.id]);

  const loadRecentExpenses = useCallback(async () => {
    const vehiclesId = vehicleData.map(({ id }) => id);

    if (!vehiclesId.length) return;
    const expenses = await retrieveRecenteExpense(vehiclesId);
    setRecentExpenses(expenses);
  }, [vehicleData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    loadRecentExpenses();
  }, [loadRecentExpenses]);

  useEffect(() => {
    navigation.addListener("focus", loadData);
    navigation.addListener("focus", loadRecentExpenses);

    return () => {
      navigation.removeListener("focus", () => {});
    };
  }, [loadData, loadRecentExpenses, navigation]);

  return {
    redirectToVehicleForm,
    vehicleData,
    isLoading,
    redirectToVehicleDetail,
    recentExpenses,
  };
};
