"use client";
import {
  Button,
  Selection,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { useCallback, useMemo, useState } from "react";

import { Products } from "@/models";
import { columTable } from "./table.model";
import { Delete, Update } from "@/components";

export const TableItems = ({
  products,
}: {
  products: Products[];
}): JSX.Element => {
  const options = useCallback((item: Products, columnKey: React.Key) => {
    const cellValue = item[columnKey as keyof Products];
    if (columnKey === "title") return cellValue;
    if (columnKey === "description") return cellValue;
    if (columnKey === "place") return cellValue;
    if (columnKey === "price") return cellValue;
    if (columnKey === "urlImage")
      return <span className="flex overflow-x-auto w-44">{cellValue}</span>;

    if (columnKey === "actions")
      return (
        <div className="flex gap-2">
          <Tooltip content="Editar un producto">
            <span className="cursor-pointer active:opacity-50 text-default-400">
              <Update props={{ className: "h-5 w-5 " }} />
            </span>
          </Tooltip>
          <Tooltip content="Borrar un producto">
            <span className="cursor-pointer text-danger active:opacity-50">
              <Delete props={{ className: "h-5 w-5 " }} />
            </span>
          </Tooltip>
        </div>
      );
  }, []);

  return (
    <Table
      color="secondary"
      aria-label="Actions table products"
      isHeaderSticky
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[450px]",
      }}
      topContentPlacement="outside"
    >
      <TableHeader>
        {columTable.map((colum, index) => {
          return <TableColumn key={index}>{colum.name}</TableColumn>;
        })}
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product._id}>
            {columTable.map((columnKey, index) => (
              <TableCell key={index}>
                {options(product, columnKey.uid)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
