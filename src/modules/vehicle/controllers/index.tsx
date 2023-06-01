import { FC } from "react";

import { RootStackParamList } from "src/shared";

import { NewVehicle } from "src/components/Vehicle";

type VehicleControllerProps = FC<RootStackParamList["Vehicle"]>;

export const VehicleController: VehicleControllerProps = () => <NewVehicle />;
