type GenericResponse<NodeData> = {
  edges: {
    node: NodeData & {
      vehicles: {
        plate: string;
      };
    };
  }[];
};

export type ExpenseResponse = {
  data: {
    fuel_supplyCollection: GenericResponse<{
      id: string;
      price_per_liter: number;
      liters: number;
      date_time: string;
    }>;

    maintenanceCollection: GenericResponse<{
      id: string;
      value: number;
      date: string;
    }>;

    insuranceCollection: GenericResponse<{
      id: string;
      value: number;
      date: string;
    }>;

    traffic_ticketsCollection: GenericResponse<{
      id: string;
      value: number;
      date: string;
    }>;
  };
};

export type ExpenseNormalized = {
  id: string;
  date: string;
  value: number;
  type: "combustível" | "seguro" | "manutenção" | "multa";
  plate: string;
};
