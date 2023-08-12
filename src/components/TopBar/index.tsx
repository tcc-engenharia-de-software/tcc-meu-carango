import { TouchableOpacity, View } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Menu } from "../Menu";
import React from "react";
import { styles } from "./styles";
import { useIsOpenMenu } from "./../../hooks/use-is-open-menu";

export const TopBar: React.FC = () => {
  const { setIsOpen, isOpen } = useIsOpenMenu();

  const handleOpenMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View>
      <View className={styles.container}>
        <TouchableOpacity onPress={handleOpenMenu}>
          {!isOpen ? (
            <Icon name="menu" color="#717171" size={20} />
          ) : (
            <Icon name="close" color="#717171" size={20} />
          )}
        </TouchableOpacity>

        <TouchableOpacity>
          <Icon name="bell-outline" color="#717171" size={20} />
        </TouchableOpacity>
      </View>
      <View>
        <Menu isOpen={isOpen} handleOpenMenu={handleOpenMenu} />
      </View>
    </View>
  );
};
