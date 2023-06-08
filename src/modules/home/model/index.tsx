import { RootStackParamList, SCREEN_NAMES } from "src/shared";

export const useHomeModel = ({ navigation }: RootStackParamList["Home"]) => {
  const redirectToVehicleForm = () =>
    navigation.navigate(SCREEN_NAMES.vehicle as never);

  return { redirectToVehicleForm };
};
