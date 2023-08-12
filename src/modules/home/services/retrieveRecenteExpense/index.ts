import { configurations } from "./../../../../shared";
import { expenseQuery } from "./queries";
import { ExpenseNormalized, ExpenseResponse } from "./types";

export const retrieveRecenteExpense = async (
  vehiclesIds: string[]
): Promise<ExpenseNormalized[]> => {
  return fetch(configurations.SUPABASE_URL + "/graphql/v1", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${configurations.SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({
      query: expenseQuery,
      variables: {
        vehiclesIds,
      },
    }),
  })
    .then((r) => r.json())
    .then(({ data }: ExpenseResponse) => data)
    .then(
      ({
        fuel_supplyCollection,
        insuranceCollection,
        maintenanceCollection,
        traffic_ticketsCollection,
      }) => {
        const expenses: ExpenseNormalized[] = [];

        fuel_supplyCollection.edges.forEach(({ node }) => {
          expenses.push({
            id: node.id,
            date: node.date_time,
            value: node.liters * node.price_per_liter,
            type: "combustível",
            plate: node.vehicles.plate,
          });
        });

        insuranceCollection.edges.forEach(({ node }) => {
          expenses.push({
            id: node.id,
            date: node.date,
            value: node.value,
            type: "seguro",
            plate: node.vehicles.plate,
          });
        });

        maintenanceCollection.edges.forEach(({ node }) => {
          expenses.push({
            id: node.id,
            date: node.date,
            value: node.value,
            type: "manutenção",
            plate: node.vehicles.plate,
          });
        });

        traffic_ticketsCollection.edges.forEach(({ node }) => {
          expenses.push({
            id: node.id,
            date: node.date,
            value: node.value,
            type: "multa",
            plate: node.vehicles.plate,
          });
        });

        expenses.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        return expenses;
      }
    );
};
