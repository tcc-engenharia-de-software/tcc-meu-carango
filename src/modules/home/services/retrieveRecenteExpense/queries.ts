export const expenseQuery = `
fragment vehicle_data_for_expensive on vehicles {
  plate
}

query Expenses($vehiclesIds: [UUID!]) {
  fuel_supplyCollection(
    filter: {vehicle_id: {in: $vehiclesIds}}
    first: 5
    orderBy: [{date_time: DescNullsLast}]
  ) {
    edges {
      node {
        id
        price_per_liter
        liters
        date_time
        vehicles {
          ...vehicle_data_for_expensive
        }
      }
    }
  }
  
  maintenanceCollection(
    filter: {vehicle_id: {in: $vehiclesIds}}
    first: 5
    orderBy: [{date: DescNullsLast}]
  ) {
    edges {
      node {
        id
        value
        date
        vehicles {
          ...vehicle_data_for_expensive
        }
      }
    }
  }

  insuranceCollection(
    filter: {vehicle_id: {in: $vehiclesIds}}
    first: 5
    orderBy: [{date: DescNullsLast}]
  ) {
    edges {
      node {
        id
        value
        date
        vehicles {
          ...vehicle_data_for_expensive
        }
      }
    }
  }

  traffic_ticketsCollection(
    filter: {vehicle_id: {in: $vehiclesIds}}
    first: 5
    orderBy: [{date: DescNullsLast}]
  ) {
    edges {
      node {
        id
        value
        date
        vehicles {
          ...vehicle_data_for_expensive
        }
      }
    }
  }
}
`;
