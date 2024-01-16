"use client";
import {
  Button,
  Input,
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
import { AddIcon, Delete, Search, Update } from "@/components";
import Link from "next/link";

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

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center gap-5">
          <div className="flex w-full">
            <Input
              type="search"
              placeholder="Buscar producto"
              startContent={<Search props={{ className: "h-4 w-5" }} />}
              size="sm"
              className="sm:max-w-[44%] "
            />
          </div>
          <div>
            <Button
              as={Link}
              href="/"
              color="primary"
              endContent={<AddIcon props={{ className: "h-4 w-4" }} />}
            >
              Anadir producto
            </Button>
          </div>
        </div>
        <div>
          <p className="text-sm text-default-400">Total {products.length}</p>
        </div>
      </div>
    );
  }, [products]);

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
      topContent={topContent}
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
