"use client";
import {
  Divider,
  Listbox,
  ListboxSection,
  ListboxItem,
  Button,
} from "@nextui-org/react";
import Link from "next/link";

import { mainAdmin, mainMenu, mainModules } from "@/utils";
import { Close, Dashboard, Hamburguer, ManagmentUser, Module } from "..";
import { CatoexpressLogo } from "../../../public/catoexpresslogo";
import { useState } from "react";

export const Aside = ({
  className,
}: {
  className: string;
}): React.ReactNode | null => {
  const [visibleAside, setVisibleAside] = useState<boolean>(true);
  return visibleAside ? (
    <aside className={className}>
      <Button
        size="sm"
        variant="light"
        className="flex justify-end  self-end relative left-3 top-3"
        color="default"
        onClick={() => setVisibleAside(!visibleAside)}
      >
        {Close}
      </Button>

      <div className="self-center">
        <Link href="/home">{CatoexpressLogo}</Link>
      </div>
      <Divider className="bg-white mb-2" />
      <Listbox
        aria-label="List box navbar catoexpress"
        variant="flat"
        className="p-0"
      >
        <ListboxSection
          title={"Menu"}
          showDivider
          classNames={{ divider: "bg-white", heading: "text-neutral-300" }}
        >
          {mainMenu.map((item, index) => {
            return (
              <ListboxItem key={index} textValue={item.label} className="p-0">
                <Link
                  href={item.path}
                  className="w-full text-sm text-white flex p-2 items-center"
                >
                  <Dashboard className="text-white mr-3" /> {item.label}
                </Link>
              </ListboxItem>
            );
          })}
        </ListboxSection>
        <ListboxSection
          title={"Modulos"}
          showDivider
          classNames={{
            divider: "bg-white",
            heading: "text-neutral-300",
            group: "flex flex-col gap-2",
          }}
        >
          {mainModules.map((item, index) => {
            return (
              <ListboxItem key={index} textValue={item.label} className="p-0">
                <Link
                  href={item.path}
                  className="w-full text-sm text-white flex p-2 items-center"
                >
                  <Module className="text-white mr-3" /> {item.label}
                </Link>
              </ListboxItem>
            );
          })}
        </ListboxSection>
        <ListboxSection
          title={"Administracion"}
          classNames={{ heading: "text-neutral-300" }}
        >
          {mainAdmin.map((item, index) => {
            return (
              <ListboxItem key={index} textValue={item.label} className="p-0">
                <Link
                  href={item.path}
                  className="w-full text-sm text-white flex p-2 items-center"
                >
                  <ManagmentUser className="text-white mr-3" /> {item.label}
                </Link>
              </ListboxItem>
            );
          })}
        </ListboxSection>
      </Listbox>
    </aside>
  ) : (
    <Button size="sm" onClick={() => setVisibleAside(!visibleAside)} variant="light">
      {Hamburguer}
    </Button>
  );
};
