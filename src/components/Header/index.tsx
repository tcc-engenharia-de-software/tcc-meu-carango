import React from "react";
import { Text, View } from "react-native";

import { styles } from "./styles";

interface HeaderProps {
  title: string;
  description?: string
}


export const Header: React.FC<HeaderProps> = ({ title, description }) => (
  <View className={styles.container}>
  <Text className={styles.title}>{title}</Text>
  {description && <Text className={styles.description}>{description}</Text>}
  </View>
);