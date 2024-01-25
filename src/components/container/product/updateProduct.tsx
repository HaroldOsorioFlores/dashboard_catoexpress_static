"use client";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";

import { AddIcon, UpdateIcon } from "@/components";
import { useEffect, useState } from "react";
import { Products } from "@/models";
import { getProductById, updateProductById } from "@/services";
import { useParams, usePathname, useSearchParams } from "next/navigation";

export const UpdateProduct = ({
  onClick,
}: {
  onClick: () => void;
}): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [idProduct, setIdProduct] = useState<string>();
  const [product, setProduct] = useState<Products>();
  const params = useSearchParams().get("id");
  const path = usePathname();

  useEffect(() => {
    const fetchProduct = async () => {
      const response: Products = await getProductById(idProduct ?? "", path);
      setProduct(response);
    };
    fetchProduct();
  }, [idProduct, path]);

  const handleClick = () => {
    onOpen();
    onClick();
    setIdProduct(params ?? "");
  };

  const entries = Object.entries(product ?? "");
  console.log(idProduct);
  console.log(product);

  return (
    <>
      <Tooltip content="Editar un producto">
        <Button
          className="cursor-pointer active:opacity-50 text-default-400  h-[2rem] w-[2rem] flex "
          onClick={handleClick}
          isIconOnly
        >
          <UpdateIcon props={{ className: "h-5 w-full self-center " }} />
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <form className="flex flex-col">
              <ModalHeader>
                <p>Actualizar producto</p>
              </ModalHeader>
              <Divider className="max-w-[90%] self-center" />
              <ModalBody></ModalBody>
              <ModalFooter>
                <Button
                  endContent={<AddIcon props={{ className: "h-4 w-4" }} />}
                  color="primary"
                >
                  Actualizar
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
