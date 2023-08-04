import { useEffect, useState } from "react";

import { RootStackParamList, SCREEN_NAMES } from "src/shared";
import { supabase } from "../../../services";

import { retrieveRecenteExpense } from "../services/retrieveRecenteExpense";
import { ExpenseNormalized } from "../services/retrieveRecenteExpense/types";

export const useHomeModel = ({ navigation }: RootStackParamList["Home"]) => {
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
      const { data } = await supabase
        .from("vehicle")
        .select("id, plate, model, initialKilometer");

      if (!data) return;
      setIsLoading(false);
      setVehicleData(data as any);
    };

    loadData();
  }, []);
  useEffect(function getExpense() {
    // ! TODO: should implement how to get vehicle ids
    const fakeIDs: string[] = [];
    retrieveRecenteExpense(fakeIDs).then(setRecentExpenses);
  }, []);

  return {
    redirectToVehicleForm,
    vehicleData,
    isLoading,
    redirectToVehicleDetail,
    recentExpenses,
  };
};
