import { useEffect, useState } from "react";
import { RootStackParamList, SCREEN_NAMES } from "src/shared";
import { supabase } from "../../../services";

export const useHomeModel = ({
  navigation,
}: RootStackParamList["VehicleDetail"]) => {
  const [vehicleData, setVehicleData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const redirectToVehicleForm = () =>
    navigation.navigate(SCREEN_NAMES.vehicle as never);

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

  return {
    redirectToVehicleForm,
    vehicleData,
    isLoading,
    redirectToVehicleDetail,
  };
};
