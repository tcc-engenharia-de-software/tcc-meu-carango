import { Text, View, ScrollView, FlatList } from "react-native";

import { FC } from "react";
import { UseVehicleDetailModel } from "../models/types";
import { ExpenseCard } from "../../../components/ExpenseCard";
import { styles } from "./styles";

export const VehicleDetailView: FC<UseVehicleDetailModel> = ({
  handleRedirectToMaintence,
}) => {
  const expenseCards = [
    {
      id: 1,
      title: "Abastecimento",
      description: "Adicionar um novo abastecimento",
    },
    {
      id: 2,
      title: "Manutenção",
      description: "Adicionar um manutenção feita",
      action: handleRedirectToMaintence,
    },
    {
      id: 3,
      title: "Multa",
      description: "Adicionar uma nova multa paga",
    },
    {
      id: 4,
      title: "Seguro",
      description: "Adicionar valor pago do seguro",
    },
  ];

  return (
    <ScrollView className="mx-4">
      <Text className={styles.vehicle.name}>data.name</Text>
      <Text className={styles.vehicle.info.title}>Informações</Text>
      <View>
        <Text className={styles.vehicle.info.key}>
          Média de consumo do veiculo:
        </Text>
        <Text className={styles.vehicle.info.key}>
          Despesas dos últimos 30 dias:
        </Text>
        <Text className={styles.vehicle.info.key}>Próxima manutenção:</Text>
        <Text className={styles.vehicle.info.key}>Próxima manutenção:</Text>
      </View>
      <View>
        <Text className={styles.vehicle.despesas.title}>
          Registro de despesas
        </Text>
      </View>
      <View className="">
        <FlatList
          className="mx-0 px-0"
          data={expenseCards}
          numColumns={1}
          renderItem={({ item }) => (
            <ExpenseCard
              title={item.title}
              description={item.description}
              action={item.action}
            />
          )}
        />
      </View>
    </ScrollView>
  );
};
