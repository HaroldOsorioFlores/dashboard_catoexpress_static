"use client";
import {
  Divider,
  Listbox,
  ListboxSection,
  ListboxItem,
} from "@nextui-org/react";
import Link from "next/link";

import { mainAdmin, mainMenu, mainModules } from "@/utils";
import { Dashboard, ManagmentUser, Module } from "..";
import { CatoexpressLogo } from "../../../public/catoexpresslogo";

export const Aside = ({ className }: { className: string }): JSX.Element => {
  return (
    <aside className={className}>
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
  );
};
