"use client";
import {
  Button,
  Input,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { useCallback, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import { Product } from "@/models";
import { columTable } from "./table.model";
import { DeleteIcon, SearchIcon, AddProduct } from "@/components";
import { deleteProductById } from "@/services";
import { UpdateProduct } from "../product/updateProduct";

export const TableItems = ({
  products,
  refresh,
}: {
  products: Product[];
  refresh: () => void;
}): JSX.Element => {
  const [searchChange, setSearchChange] = useState<Product[]>([]);
  const path = usePathname();
  const options = useCallback(
    (item: Product, columnKey: React.Key) => {
      const cellValue = item[columnKey as keyof Product];

      const deleteProduct = async (id: string): Promise<string> => {
        const response: string = await deleteProductById(id, path);
        console.log(response);
        refresh();
        return response;
      };
      if (columnKey === "title") return cellValue;
      if (columnKey === "description") return cellValue;
      if (columnKey === "place") return cellValue;
      if (columnKey === "price") return cellValue;
      if (columnKey === "urlImage")
        return (
          <span className="flex overflow-auto w-44 h-[2.3rem]">
            {cellValue}
          </span>
        );
      if (columnKey === "actions")
        return (
          <div className="flex gap-1">
            <UpdateProduct id={item._id} refresh={refresh} />
            <Tooltip content="Borrar un producto">
              <Button
                className="cursor-pointer text-danger active:opacity-50 h-[2rem] w-[2rem] flex"
                onClick={() => deleteProduct(item._id)}
                isIconOnly
                variant="light"
              >
                <DeleteIcon props={{ className: "h-5 w-full  self-center" }} />
              </Button>
            </Tooltip>
          </div>
        );
    },
    [refresh, path]
  );

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center gap-5">
          <div className="flex w-full">
            <Input
              type="search"
              placeholder="Buscar producto"
              startContent={<SearchIcon props={{ className: "h-4 w-5" }} />}
              size="sm"
              className="sm:max-w-[44%] "
              onChange={async (e) => {
                const value = e.target.value;
                const Fuse = (await import("fuse.js")).default;
                const fuse = new Fuse(products, {
                  keys: ["title", "description"],
                });
                const results = fuse.search(value);
                const items = results.map((item) => item.item);
                setSearchChange(items);
              }}
            />
          </div>
          <div>
            <AddProduct nameButton="Anadir producto" refresh={refresh} />
          </div>
        </div>
        <div>
          <p className="text-sm text-default-400">Total {products.length}</p>
        </div>
      </div>
    );
  }, [products, refresh]);

  return (
    <Table
      color="default"
      aria-label="Actions table products"
      isHeaderSticky
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "sm:max-w-[23rem] md:max-w-full max-h-[30rem]",
        th: ["bg-transparent"],
      }}
      topContentPlacement="outside"
      topContent={topContent}
      removeWrapper
      selectionMode="single"
      isCompact
    >
      <TableHeader columns={columTable}>
        {(colum) => {
          return <TableColumn key={colum.uid}>{colum.name}</TableColumn>;
        }}
      </TableHeader>
      <TableBody
        emptyContent={<Spinner label="Cargando..." />}
        items={searchChange.length === 0 ? products : searchChange}
      >
        {(product) => (
          <TableRow key={product._id}>
            {columTable.map((columnKey, index) => (
              <TableCell key={index}>
                {options(product, columnKey.uid)}
              </TableCell>
            ))}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
