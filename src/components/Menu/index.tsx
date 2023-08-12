import { Alert, Text, TouchableOpacity, View } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import { styles } from "./styles";
import { useAuth } from "src/modules/auth/hooks";

type MenuProps = {
  isOpen: boolean;
  handleOpenMenu: () => void;
};

export const Menu = ({ isOpen, handleOpenMenu }: MenuProps) => {
  const authentication = useAuth();
  if (!isOpen) {
    return null;
  }

  const handleOpenOptions = () => {};

  const handleSignOut = async () => {
    try {
      await authentication.signOut();
      handleOpenMenu();
    } catch {
      Alert.alert("Ops...Aconteceu um erro", "Tente novamente mais tarde");
    }
  };

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
        <TouchableOpacity onPress={handleSignOut}>
          <Text className={styles.options}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
