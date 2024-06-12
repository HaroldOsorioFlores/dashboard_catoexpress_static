import { AxiosResponse } from "axios";

import { Product } from "@/models";
import { apiBase } from "./api";
import { NextResponse } from "next/server";

export const getAllProducts = async (endPoint: string): Promise<Product[]> => {
  try {
    const data: AxiosResponse<Product[]> = await apiBase.get<Product[]>(
      endPoint
    );
    return data.data;
  } catch (error) {
    throw new Error("error en la conexion con la api");
  }
};

export const postProduct = async (
  product: FormData,
  endPoint: string
): Promise<string> => {
  try {
    const data: AxiosResponse<string> = await apiBase.post(endPoint, product);
    return data.data;
  } catch (error) {
    throw new Error("Error en el envio del producto");
  }
};

export const deleteProductById = async (
  id: string,
  endPoint: string
): Promise<string> => {
  const data: AxiosResponse<string> = await apiBase.delete(`${endPoint}/${id}`);

  return data.data;
};

export const updateProductById = async (
  id: string,
  endPoint: string,
  product: FormData
): Promise<string> => {
  try {
    const data: AxiosResponse<string> = await apiBase.patch(
      `${endPoint}/${id}`,
      product
    );
    return data.data;
  } catch (error) {
    throw new NextResponse("Error en el envio del producto");
  }
};

export const getProductById = async (
  id: string,
  endPoint: string
): Promise<Product> => {
  try {
    const data: AxiosResponse<Product> = await apiBase.get(`${endPoint}/${id}`);
    return data.data;
  } catch (error) {
    throw new Error("error al obtener el producto por id");
  }
};
