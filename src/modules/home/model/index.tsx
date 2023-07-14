import { useEffect, useState } from "react";
import { RootStackParamList, SCREEN_NAMES } from "src/shared";
import { supabase } from "../../../services";

export const useHomeModel = ({ navigation }: RootStackParamList["Home"]) => {
  const [vehicleData, setVehicleData] = useState([]);

  const redirectToVehicleForm = () =>
    navigation.navigate(SCREEN_NAMES.vehicle as never);

  useEffect(() => {
    const loadData = async () => {
      const { data } = await supabase
        .from("vehicle")
        .select("id, plate, model, initialKilometer");

      if (!data) return;

      setVehicleData(data as any);
    };

    loadData();
  }, []);

  return { redirectToVehicleForm, vehicleData };
};
