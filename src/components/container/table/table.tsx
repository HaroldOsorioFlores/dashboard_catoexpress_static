"use client";
import {
  Selection,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useMemo, useState } from "react";

import { Products } from "@/models";
import { columTable } from "./table.model";

const columnsInitialized = ["Titulo", "Descripcion", "Precio"];

export const TableItems = ({
  products,
}: {
  products: Products[];
}): JSX.Element => {
  const [columsVisible, setColumsVisible] = useState<Selection>(
    new Set(columnsInitialized)
  );

  const headerConlumss = useMemo(() => {
    if (columsVisible === "all") return columTable;

    return columTable.filter((colum) =>
      Array.from(columsVisible).includes(colum.name)
    );
  }, [columsVisible]);

  return (
    <Table color="warning" aria-label="Actions table products">
      <TableHeader>
        {headerConlumss.map((item, index) => {
          return <TableColumn key={index}>{item.name}</TableColumn>;
        })}
      </TableHeader>
      <TableBody>
        {products.map((item, index) => {
          return (
            <TableRow key={index}>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.description}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
