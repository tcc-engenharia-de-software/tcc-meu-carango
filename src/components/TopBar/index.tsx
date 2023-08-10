import React from "react";
import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "./styles";
import { useIsOpenMenu } from "~/hooks/use-is-open-menu";

export const TopBar: React.FC = () => {
  const { setIsOpen, isOpen } = useIsOpenMenu();

  const handleOpenMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View className={styles.container}>
      <TouchableOpacity onPress={handleOpenMenu}>
        <Icon name="menu" color="#717171" size={20} />
      </TouchableOpacity>

      <TouchableOpacity>
        <Icon name="bell-outline" color="#717171" size={20} />
      </TouchableOpacity>
    </View>
  );
};
