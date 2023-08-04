import { RootStackParamList, SCREEN_NAMES } from "src/shared";

export const useVehicleDetailModel = ({
  navigation,
}: RootStackParamList["VehicleDetail"]) => {
  const handleRedirectToMaintenance = () =>
    navigation.navigate(SCREEN_NAMES.Maintenance as never);

  return { handleRedirectToMaintenance };
};
