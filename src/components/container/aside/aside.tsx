"use client";
import {
  Divider,
  Listbox,
  ListboxSection,
  ListboxItem,
  Button,
} from "@nextui-org/react";
import Link from "next/link";

import { CloseIcon, DashboardIcon, HamburguerIcon } from "../..";
import { useMemo, useState } from "react";
import { CatoexpressLogo } from "../../../../public/catoexpresslogo";
import { asideItems } from "./aside-items";

export const Aside = ({
  className,
}: {
  className: string;
}): React.ReactNode | null => {
  const [visibleAside, setVisibleAside] = useState<boolean>(true);

  const memoListBox = useMemo(() => {
    return (
      <Listbox
        aria-label="List box navbar catoexpress"
        variant="flat"
        className="p-0"
      >
        {asideItems.map((item, index) => (
          <ListboxSection
            title={item.title}
            showDivider
            classNames={{
              divider: "bg-white",
              heading: "text-neutral-300",
              group: "flex flex-col gap-2",
            }}
            key={index}
          >
            {item.module.map((item, index) => {
              return (
                <ListboxItem key={index} textValue={item.label} className="p-0">
                  <Button
                    href={item.path}
                    className="w-full text-sm text-white flex justify-start"
                    size="md"
                    as={Link}
                    color="primary"
                    variant="light"
                    startContent={item.icon}
                  >
                    {item.label}
                  </Button>
                </ListboxItem>
              );
            })}
          </ListboxSection>
        ))}
      </Listbox>
    );
  }, []);

  return visibleAside ? (
    <aside className={className}>
      <Button
        size="sm"
        variant="light"
        className="self-end"
        color="default"
        isIconOnly
        onClick={() => setVisibleAside(!visibleAside)}
      >
        {CloseIcon}
      </Button>

      <div className="self-center mb-6">
        <Link href="/home">
          <CatoexpressLogo
            props={{ className: "h-[4rem] w-[8rem]", fill: "#ffffff" }}
          />
        </Link>
      </div>
      <Divider className="bg-white mb-2" />
      {memoListBox}
    </aside>
  ) : (
    <Button
      size="sm"
      onClick={() => setVisibleAside(!visibleAside)}
      variant="light"
    >
      {HamburguerIcon}
    </Button>
  );
};
