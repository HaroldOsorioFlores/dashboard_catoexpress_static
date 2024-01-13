import { AxiosResponse } from "axios";

import { Products } from "@/models";
import { apiBase, ceprobisEndPoint } from "./api";

export const ceprobisproducts = async (): Promise<Products[]> => {
  try {
    const data: AxiosResponse<Products[]> = await apiBase.get<Products[]>(
      ceprobisEndPoint
    );
    return data.data;
  } catch (error) {
    throw new Error("error en la conexion con la api");
  }
};
