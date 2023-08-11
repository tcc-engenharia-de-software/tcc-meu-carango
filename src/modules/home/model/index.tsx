import { useEffect, useState } from "react";

import { RootStackParamList, SCREEN_NAMES } from "src/shared";
import { supabase } from "../../../services";

import { retrieveRecenteExpense } from "../services/retrieveRecenteExpense";
import { ExpenseNormalized } from "../services/retrieveRecenteExpense/types";
import { useAuth } from "src/modules/auth";
import { Alert } from "react-native";

export const useHomeModel = ({ navigation }: RootStackParamList["Home"]) => {
  const { user } = useAuth();

  const [vehicleData, setVehicleData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [recentExpenses, setRecentExpenses] = useState<ExpenseNormalized[]>([]);

  const redirectToVehicleForm = () => {
    navigation.navigate(SCREEN_NAMES.vehicle as never);
  };

  const redirectToVehicleDetail = () =>
    navigation.navigate(SCREEN_NAMES.vehicleDetail as never);

  useEffect(() => {
    const loadData = async () => {
      const { data, error } = await supabase
        .from("vehicles")
        .select("id, plate, model, initial_kilometer")
        .eq("user_id", user?.id);

      if (error) {
        Alert.alert("Erro ao carregar veículos, verifique sua conexão.");
      }

      if (!data) return;
      setIsLoading(false);
      setVehicleData(data as any);
    };

    loadData();
  }, [user?.id]);

  useEffect(
    function getExpense() {
      const vehiclesId = vehicleData.map(({ id }) => id);

      if (!vehiclesId.length) return;

      retrieveRecenteExpense(vehiclesId).then(setRecentExpenses);
    },
    [vehicleData]
  );

  return {
    redirectToVehicleForm,
    vehicleData,
    isLoading,
    redirectToVehicleDetail,
    recentExpenses,
  };
};
