"use client";
import { Layout } from "@/components";
import { Products } from "@/models";
import { getProductById, updateProductById } from "@/services";
import { Button, Divider, Input, Textarea } from "@nextui-org/react";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

const AddProduct = ({ params }: { params: { slug: string } }) => {
  const [product, setProduct] = useState<Products>();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [fileImage, setFileImage] = useState<File>();
  const endpoint = params.slug[1];
  const id = params.slug[0];

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await getProductById(id, endpoint);
      setProduct(response);
    };
    fetchProduct();
  }, [endpoint, id]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: FormData = new FormData();
    if (title) formData.append("title", title);
    if (description) formData.append("description", description);
    if (price) formData.append("price", price);
    if (fileImage) formData.append("file", fileImage ?? "");
    if (formData) {
      const response = await updateProductById(id, endpoint, formData);
      return console.log("respuesta: ", response);
    }
  };

  return (
    <Layout>
      <main className="flex justify-center items-center h-full w-full">
        {product ? (
          <form
            className="flex flex-col max-w-[28rem] w-full p-3 px-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] gap-4 rounded-xl"
            onSubmit={handleSubmit}
          >
            <section>
              <h1>Actualizar producto</h1>
            </section>
            <Divider />
            <section className="text-default-500 text-sm flex flex-col gap-3">
              <Input
                size="md"
                labelPlacement="outside"
                label="Titulo del producto"
                variant="bordered"
                color="primary"
                type="text"
                classNames={{ label: "text-default-500" }}
                onChange={(e) => setTitle(e.target.value)}
                defaultValue={product.title}
              />
              <Textarea
                size="md"
                labelPlacement="outside"
                label="Descripcion del producto"
                variant="bordered"
                color="primary"
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                classNames={{ label: "text-default-500" }}
                defaultValue={product.description}
              />
              <Input
                size="md"
                type="number"
                labelPlacement="outside"
                label="Precio del producto"
                variant="bordered"
                color="primary"
                onChange={(e) => setPrice(e.target.value)}
                classNames={{ label: "text-default-500" }}
                defaultValue={product.price}
              />
              <div className="flex-col  items-center justify-center w-full">
                <p className="text-sm text-default-700 mb-1">
                  Imagen del producto
                </p>
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-default-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-default-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  {fileImage ? (
                    <Image
                      src={URL.createObjectURL(fileImage)}
                      alt="Imagen"
                      width={150}
                      height={150}
                      aria-required
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Image
                        src={product.urlImage ?? ""}
                        alt="Imagen"
                        width={150}
                        height={150}
                        priority
                        aria-required
                      />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">
                          Click para subir una imagen
                        </span>{" "}
                        o desplaza aqui
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG o Wepb (MAX. 800x400px)
                      </p>
                    </div>
                  )}

                  <input
                    id="dropzone-file"
                    type="file"
                    name="file"
                    className="hidden"
                    onChange={(e) => {
                      setFileImage(e.target.files?.[0]);
                    }}
                  />
                </label>
              </div>
            </section>
            <Divider />
            <section className="self-end">
              <Button color="primary" type="submit">
                Enviar
              </Button>
            </section>
          </form>
        ) : (
          <>loading</>
        )}
      </main>
    </Layout>
  );
};
export default AddProduct;
