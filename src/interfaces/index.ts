import { ORDER_DIRECTION } from "types";

export interface ParamsRequest {
  limit: number;
  page: number;
  orderBy?: string;
  orderDirection?: ORDER_DIRECTION;
  search?: string;
  refetch?: number;
}

export interface ListResponse<T> {
  data: {
    items: T[];
    total: number;
  };
}
