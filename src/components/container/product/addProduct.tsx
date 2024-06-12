import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { AddIcon } from "../..";
import { dataInput } from "./addProduct.data";
import { FormEvent, useState } from "react";
import { postProduct } from "@/services";
import { usePathname } from "next/navigation";
import Image from "next/image";

export const AddProduct = ({
  nameButton,
  refresh,
}: {
  nameButton: string;
  refresh: () => void;
}): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [fileImage, setFileImage] = useState<File>();
  const path = usePathname();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsloading(true);
    const product: FormData = new FormData();
    product.append("title", title);
    product.append("description", description);
    product.append("price", String(price));
    product.append("file", fileImage ?? "");
    const resultProduct: string = await postProduct(product, path);
    console.log(resultProduct);
    setIsloading(false);
    refresh();
    setTimeout(() => {
      onClose();
    }, 400);
  };

  const setChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    label: string
  ) => {
    if (label === "Titulo del producto") return setTitle(event.target.value);
    if (label === "Descripcion del producto")
      return setDescription(event.target.value);
    if (label === "Precio del producto")
      return setPrice(Number(event.target.value));
  };

  const setClean = (label: string) => {
    switch (label) {
      case "Titulo del producto":
        return setTitle("");
      case "Descripcion del producto":
        return setDescription("");
      case "Precio del producto":
        return setPrice(Number(0));
    }
  };
  const setValue = (label: string) => {
    switch (label) {
      case "Titulo del producto":
        return title;
      case "Descripcion del producto":
        return description;
      case "Precio del producto":
        return price;
    }
  };

  return (
    <>
      <Button
        endContent={<AddIcon props={{ className: "h-4 w-4" }} />}
        color="primary"
        onClick={onOpen}
      >
        {nameButton}
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        backdrop="opaque"
        classNames={{ wrapper: "md:ml-[5rem]" }}
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <form className="flex flex-col" onSubmit={handleSubmit} name="form">
              <ModalHeader>Anadir producto</ModalHeader>
              <Divider className="mb-3 max-w-[90%] self-center" />
              <ModalBody>
                {dataInput.map((input, index) => {
                  return (
                    <Input
                      label={input.label}
                      name={String(setValue(input.label))}
                      isRequired
                      placeholder={input.placeholder}
                      classNames={input.classNames}
                      labelPlacement="outside"
                      variant="bordered"
                      type={input.type}
                      startContent={input.startContent}
                      color="primary"
                      value={String(setValue(input.label))}
                      onClear={() => setClean(input.label)}
                      key={index}
                      onChange={(e) => setChange(e, input.label)}
                    />
                  );
                })}

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
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
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

                    <Input
                      id="dropzone-file"
                      type="file"
                      name="file"
                      isRequired
                      className="hidden"
                      onChange={(e) => {
                        setFileImage(e.target.files?.[0]);
                      }}
                    />
                  </label>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" type="submit" isLoading={isLoading}>
                  Anadir producto
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
