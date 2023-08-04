import React, { FC, useMemo } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Row, Rows, Table } from "react-native-table-component";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { CardVehicle } from "src/components/CardVehicle";
import { Header } from "src/components/Header";

import { styles } from "./styles";
import { HomeViewProps } from "./types";

const LENGTH_OF_VOID_ARRAY = 0;
const FRACTIONAL_DIGITS_TO_MONEY = 2;

export const HomeView: FC<HomeViewProps> = ({
  redirectToVehicleForm,
  vehicleData,
  redirectToVehicleDetail,
  recentExpenses,
}) => {
  const handleNewVehicle = () => {
    redirectToVehicleForm();
  };

  const currentBills = useMemo(() => {
    if (recentExpenses.length > LENGTH_OF_VOID_ARRAY) {
      return recentExpenses.map((expense) => [
        expense.plate,
        expense.type,
        expense.date,
        `R$ ${expense.value.toFixed(FRACTIONAL_DIGITS_TO_MONEY)}`,
      ]);
    }

    return [["Ainda não há dados para serem exibidos"]];
  }, [recentExpenses]);

  return (
    <View className={styles.home.container}>
      <Header title="Meu carango" description="Veículos" />
      <View className="text-xl mt-10">
        <TouchableOpacity
          className="border rounded-full p-2 w-20 border-gray-300 drop-shadow-xl"
          onPress={handleNewVehicle}>
          <Icon name="plus" color="#717171" size={60} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={vehicleData}
        renderItem={({ item }: any) => (
          <CardVehicle
            clickCard={redirectToVehicleDetail}
            idVehicle={item.id}
            initialKilometer={item.initialKilometer}
            name={item.model}
            plate={item.plate}
          />
        )}
        keyExtractor={(item: any) => item.id}
        showsHorizontalScrollIndicator={false}
        horizontal
      />

      <Text className={styles.home.recentExpenses.title}>
        Despesas recentes
      </Text>

      <Table style={styles.home.recentExpenses.table.container}>
        <Row
          style={styles.home.recentExpenses.table.header}
          data={["Placa", "Tipo de gasto", "Data", "valor"]}
        />
        <Rows
          style={styles.home.recentExpenses.table.rows.self}
          textStyle={styles.home.recentExpenses.table.rows.textStyle}
          data={currentBills}
        />
      </Table>
    </View>
  );
};
