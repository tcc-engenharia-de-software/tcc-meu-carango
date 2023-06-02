import { FC } from "react";

import { RootStackParamList } from "src/shared";

import { VehicleView } from "../views/newVehicle";
import { useVehicleModel } from "../models";

type VehicleControllerProps = FC<RootStackParamList["Vehicle"]>;

export const VehicleController: VehicleControllerProps = ({ navigation }) => (
  <VehicleView {...useVehicleModel({ navigation })} />
);
