"use client";
import { useState, useEffect } from "react";

import { Products } from "@/models";
import { ceprobisproducts } from "@/services";
import { Layout } from "@/components";

const CeprobisUcsm = (): JSX.Element => {
  const [ceprobisProducts, setSeprobisProducts] = useState<Products[]>([]);
  useEffect(() => {
    const fetchData = async (): Promise<Products[]> => {
      const res: Products[] = await ceprobisproducts();
      setSeprobisProducts(res);
      return [];
    };
    fetchData();
  }, []);
  return (
    <Layout>
      <main>
        <h1>Ceprobis</h1>
        {ceprobisProducts.map((item, index) => (
          <div key={index}>
            <p>Titulo: {item.title}</p>
            <p>Descripcion: {item.description}</p>
          </div>
        ))}
      </main>
    </Layout>
  );
};

export default CeprobisUcsm;
