"use client";
import { useEffect, useState } from "react";

import { Layout, TableItems } from "@/components";
import { Product } from "@/models";
import { getAllProducts } from "@/services";

const ElcholoUcsm = (): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);
  const [refreshTable, setRefreshTable] = useState(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const response: Product[] = await getAllProducts("elcholo-ucsm");
      setProducts(response);
    };
    fetchData();
    refreshTable;
  }, [refreshTable]);
  return (
    <Layout>
      <main>
        <h1>EL cholo ucsm</h1>
        <TableItems
          products={products}
          refresh={() => setRefreshTable(!refreshTable)}
        />
      </main>
    </Layout>
  );
};

export default ElcholoUcsm;
