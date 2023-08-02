import React, { FC } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

import { Header } from "src/components/Header";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "./styles";
import { CardVehicle } from "src/components/CardVehicle";
import { Table, Row, Rows } from "react-native-table-component";

type HomeTypes = {
  redirectToVehicleForm: Function;
  redirectToVehicleDetail: Function;
  vehicleData: any[];
};

const bills = [
  ["gvx9549", "Combustível", "22/12/2023", "R$ 100,00"],
  ["gvx9549", "Combustível", "22/12/2023", "R$ 100,00"],
  ["gvx9549", "Combustível", "22/12/2023", "R$ 100,00"],
  ["gvx9549", "Combustível", "22/12/2023", "R$ 100,00"],
];

const LENGTH_OF_VOID_ARRAY = 0;

export const HomeView: FC<HomeTypes> = ({
  redirectToVehicleForm,
  vehicleData,
  redirectToVehicleDetail,
}) => {
  const handleNewVehicle = () => {
    redirectToVehicleForm();
  };

  const currentBills =
    bills.length > LENGTH_OF_VOID_ARRAY
      ? bills
      : [["Ainda não há dados para serem exibidos"]];

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
        renderItem={({ item }) => (
          <CardVehicle
            clickCard={redirectToVehicleDetail}
            idVehicle={item.id}
            initialKilometer={item.initialKilometer}
            name={item.model}
            plate={item.plate}
          />
        )}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        horizontal
      />

      <Text className="text-[24px] mt-6 text-gray-400">Despesas recentes</Text>

      <Table style={{ marginTop: 16 }}>
        <Row
          data={["Placa", "Tipo de gasto", "Data", "valor"]}
          style={{
            backgroundColor: "#fff",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            padding: 8,
          }}
        />
        <Rows
          data={currentBills}
          style={{ backgroundColor: "#F5F5F5" }}
          textStyle={{ padding: 8 }}
        />
      </Table>
    </View>
  );
};
