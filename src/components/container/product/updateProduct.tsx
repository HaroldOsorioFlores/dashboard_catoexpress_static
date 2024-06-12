"use client";
import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { FormEvent, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { AddIcon, UpdateIcon } from "@/components";
import { Product } from "@/models";
import { getProductById, updateProductById } from "@/services";

export const UpdateProduct = ({
  id,
  refresh,
}: {
  id: string;
  refresh: () => void;
}): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [product, setProduct] = useState<Product>();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [fileImage, setFileImage] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);
  const path = usePathname();

  useEffect(() => {
    const fetchProduct = async () => {
      const response: Product = await getProductById(id ?? "", path);
      setProduct(response);
    };
    fetchProduct();
  }, [id, path]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData: FormData = new FormData();
    if (title) formData.append("title", title);
    if (description) formData.append("description", description);
    if (price) formData.append("price", price);
    if (fileImage) formData.append("file", fileImage ?? "");
    const response = await updateProductById(id, path, formData);
    refresh();
    setLoading(false);
    console.log("respuesta: ", response);
    return setTimeout(() => {
      onClose();
    }, 400);
  };

  return (
    <>
      <Tooltip content="Editar un producto">
        <Button
          className="cursor-pointer active:opacity-50 text-default-400  h-[2rem] w-[2rem] flex "
          onClick={onOpen}
          isIconOnly
          variant="light"
        >
          <UpdateIcon props={{ className: "h-5 w-full self-center " }} />
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => {
            return (
              product && (
                <form
                  className="flex flex-col"
                  onSubmit={handleSubmit}
                  name={`update product ${product.place}`}
                  id={product._id}
                >
                  <ModalHeader>
                    <p>Actualizar producto</p>
                  </ModalHeader>
                  <Divider className="max-w-[90%] self-center" />
                  <ModalBody>
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
                      name={product.title}
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
                      name={product.description}
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
                      name={product.price}
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
                            priority
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
                              </span>
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
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      endContent={<AddIcon props={{ className: "h-4 w-4" }} />}
                      color="primary"
                      type="submit"
                      isLoading={loading}
                    >
                      Actualizar
                    </Button>
                  </ModalFooter>
                </form>
              )
            );
          }}
        </ModalContent>
      </Modal>
    </>
  );
};
