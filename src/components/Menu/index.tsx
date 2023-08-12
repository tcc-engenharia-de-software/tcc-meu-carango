import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export const Menu = ({ isOpen }: { isOpen: boolean }) => {
  if (!isOpen) {
    return null;
  }

  const handleOpenOptions = () => {};

  return (
    <View className={styles.container}>
      <Text className={styles.title}>Menu - Meu carango</Text>
      <View className={styles.containerOptions}>
        <Text className={styles.options}>Perfil</Text>
        <Text className={styles.options}>Notificações</Text>
        <View className="flex flex-row items-center">
          <Text className={styles.options}>Veículos</Text>
          <TouchableOpacity onPress={handleOpenOptions}>
            <Icon name="chevron-down" color="#717171" size={20} />
          </TouchableOpacity>
        </View>
        <Text className={styles.options}>Sair</Text>
      </View>
    </View>
  );
};
