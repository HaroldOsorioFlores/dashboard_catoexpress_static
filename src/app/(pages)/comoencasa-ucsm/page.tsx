"use client";
import { useEffect, useState } from "react";

import { Layout, TableItems } from "@/components";
import { Product } from "@/models";
import { getAllProducts } from "@/services";

const ComoencasaUcsm = (): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);
  const [refreshTable, setRefreshTable] = useState(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const response: Product[] = await getAllProducts("comoencasa-ucsm");
      setProducts(response);
    };
    refreshTable;
    fetchData();
  }, [refreshTable]);
  return (
    <Layout>
      <main>
        <h1>Como en casa</h1>
        <TableItems
          products={products}
          refresh={() => setRefreshTable(!refreshTable)}
        />
      </main>
    </Layout>
  );
};

export default ComoencasaUcsm;
