"use client";
import { useEffect, useState } from "react";

import { Layout, TableItems } from "@/components";
import { Product } from "@/models";
import { getAllProducts } from "@/services";

const PanificadoraUcsm = (): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);
  const [refreshTable, setRefreshTable] = useState(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const response: Product[] = await getAllProducts("panificadora-ucsm");
      setProducts(response);
    };
    refreshTable;
    fetchData();
  }, [refreshTable]);
  return (
    <Layout>
      <main>
        <h1>Panificadora ucsm</h1>
        <TableItems
          products={products}
          refresh={() => setRefreshTable(!refreshTable)}
        />
      </main>
    </Layout>
  );
};

export default PanificadoraUcsm;
