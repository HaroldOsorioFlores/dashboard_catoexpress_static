"use client";
import { useState, useEffect, use } from "react";

import { Product } from "@/models";
import { getAllProducts } from "@/services";
import { Layout, TableItems } from "@/components";

const CeprobisUcsm = (): JSX.Element => {
  const [ceprobisProducts, setCeprobisProducts] = useState<Product[]>([]);
  const [refreshTable, setRefreshTable] = useState(false);
  useEffect(() => {
    const fetchData = async (): Promise<Product[]> => {
      const res: Product[] = await getAllProducts("/ceprobis-ucsm");
      setCeprobisProducts(res);
      return [];
    };
    refreshTable;
    fetchData();
  }, [refreshTable]);

  return (
    <Layout>
      <main>
        <h1>Ceprobis</h1>
        <TableItems
          products={ceprobisProducts}
          refresh={() => setRefreshTable(!refreshTable)}
        />
      </main>
    </Layout>
  );
};

export default CeprobisUcsm;
