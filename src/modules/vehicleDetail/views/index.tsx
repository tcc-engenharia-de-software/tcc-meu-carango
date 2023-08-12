import { Text, View, FlatList, SafeAreaView } from "react-native";

import { FC } from "react";
import { UseVehicleDetailModel } from "../models/types";
import { ExpenseCard } from "../../../components/ExpenseCard";
import { styles } from "./styles";

export const VehicleDetailView: FC<UseVehicleDetailModel> = ({
  vehicle,
  expenseCards,
}) => {
  return (
    <SafeAreaView className="mx-4 mb-4 flex flex-1">
      <Text className={styles.vehicle.name}>{vehicle?.model}</Text>
      <Text className={styles.vehicle.info.title}>Informações</Text>
      <View>
        <Text className={styles.vehicle.info.key}>
          Média de consumo do veiculo: N/A
        </Text>
        <Text className={styles.vehicle.info.key}>
          Despesas dos últimos 30 dias: N/A
        </Text>
        <Text className={styles.vehicle.info.key}>Próxima manutenção: N/A</Text>
        <Text className={styles.vehicle.info.key}>Próxima manutenção: N/A</Text>
      </View>
      <View>
        <Text className={styles.vehicle.despesas.title}>
          Registro de despesas
        </Text>
      </View>
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
    </SafeAreaView>
  );
};
