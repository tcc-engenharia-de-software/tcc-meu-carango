import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { styles } from "./styles";

interface ExpenseCardProps {
  title: string;
  description: string;
  action?: Function;
}

export const ExpenseCard: React.FC<ExpenseCardProps> = ({
  title,
  description,
  action,
}) => {
  const handleClickCard = () => {
    action?.();
  };

  return (
    <TouchableOpacity onPress={handleClickCard}>
      <View className={styles.container}>
        <Text className={styles.title}>{title}</Text>
        <Text className={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};
