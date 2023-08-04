import { FC } from "react";

import { RootStackParamList } from "src/shared";

import { MaintenanceView } from "../views";
import { useMaintenanceModel } from "../models";

type MaintenanceControllerProps = FC<RootStackParamList["Maintenance"]>;

export const MaintenanceController: MaintenanceControllerProps = ({
  navigation,
}) => <MaintenanceView {...useMaintenanceModel({ navigation })} />;
