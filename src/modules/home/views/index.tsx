import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useMemo } from "react";
import { Row, Rows, Table } from "react-native-table-component";

import { CardVehicle } from "src/components/CardVehicle";
import { Header } from "src/components/Header";
import { HomeViewProps } from "./types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { VehicleEntityHome } from "../model/types";
import { format } from "date-fns";
import { styles } from "./styles";

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
        expense.plate.toLocaleUpperCase(),
        expense.type,
        format(new Date(expense.date), "dd/MM/yy"),
        `R$ ${expense.value.toFixed(FRACTIONAL_DIGITS_TO_MONEY)}`,
      ]);
    }

    return [["Ainda não há dados para serem exibidos"]];
  }, [recentExpenses]);

  return (
    <SafeAreaView className={styles.home.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
              clickCard={redirectToVehicleDetail(item)}
              idVehicle={item.id}
              initial_kilometer={item.initial_kilometer}
              name={item.model}
              plate={item.plate}
            />
          )}
          keyExtractor={(item: VehicleEntityHome) => item.id}
          showsHorizontalScrollIndicator={false}
          horizontal
        />

        <Text className={styles.home.recentExpenses.title}>
          Despesas recentes
        </Text>

        <Table style={styles.home.recentExpenses.table.self}>
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
      </ScrollView>
    </SafeAreaView>
  );
};
