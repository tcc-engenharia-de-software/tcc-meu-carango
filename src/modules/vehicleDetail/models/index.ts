import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

import { RootStackParamList, SCREEN_NAMES } from "src/shared";
import { VehicleEntityHome } from "src/modules/home/model/types";

export const useVehicleDetailModel = ({
  navigation,
}: RootStackParamList["VehicleDetail"]) => {
  const [vehicle, setVehicle] = useState<VehicleEntityHome>({
    id: "",
    plate: "",
    model: "",
    initial_kilometer: 0,
    color: "",
    fuel_type: "",
    year: 0,
    manufacturer: "",
    deleted: false,
  });

  useEffect(() => {
    AsyncStorage.getItem("selectedVehicle")
      .then((res) => JSON.parse(res ?? "{}"))
      .then(setVehicle)
      .catch(() => {
        navigation.navigate(SCREEN_NAMES.Home as never);
      });
  }, [navigation]);

  const expenseCards = [
    {
      id: 1,
      title: "Abastecimento",
      description: "Adicionar um novo abastecimento",
      action: () => navigation.navigate(SCREEN_NAMES.fuel.register as never),
    },
    {
      id: 2,
      title: "Manutenção",
      description: "Adicionar um manutenção feita",
      action: () => {},
    },
    {
      id: 3,
      title: "Multa",
      description: "Adicionar uma nova multa paga",
      action: () => {},
    },
    {
      id: 4,
      title: "Seguro",
      description: "Adicionar valor pago do seguro",
      action: () => {},
    },
  ];

  return {
    vehicle,
    expenseCards,
  };
};
