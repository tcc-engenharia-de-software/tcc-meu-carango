import { FC } from "react";
import { RootStackParamList } from "src/shared";

import { FuelRegisterView } from "../../views";
import { useFuelRegisterModel } from "../../models";

type FuelRegisterControllerProps = FC<RootStackParamList["FuelSupply"]>;

export const FuelRegisterController: FuelRegisterControllerProps = ({
  navigation,
}) => <FuelRegisterView {...useFuelRegisterModel({ navigation })} />;
