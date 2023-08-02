import { FC } from "react";

import { RootStackParamList } from "src/shared";

import { VehicleDetailView } from "../views";
import { useVehicleDetailModel } from "../models";

type VehicleDetailControllerProps = FC<RootStackParamList["VehicleDetail"]>;

export const VehicleDetailController: VehicleDetailControllerProps = ({
  navigation,
}) => <VehicleDetailView {...useVehicleDetailModel({ navigation })} />;
