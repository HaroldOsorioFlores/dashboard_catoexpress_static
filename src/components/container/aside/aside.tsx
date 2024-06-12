"use client";
import {
  Divider,
  Listbox,
  ListboxSection,
  ListboxItem,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import { useMemo, useState } from "react";

import {
  CloseIcon,
  DashboardIcon,
  HamburguerIcon,
  ManagmentUserIcon,
  ModuleIcon,
} from "../..";
import { CatoexpressLogo } from "../../../../public/catoexpresslogo";
import { mainAdmin, mainMenu, mainModules } from "./aside-items";

export const Aside = ({
  className,
}: {
  className: string;
}): React.ReactNode => {
  const [visibleAside, setVisibleAside] = useState<boolean>(true);
  const memoListBox = useMemo(() => {
    return (
      <Listbox
        aria-label="List box navbar catoexpress"
        variant="flat"
        className="p-0"
      >
        <ListboxSection
          title={"Menu"}
          showDivider
          classNames={{
            divider: "bg-white",
            heading: "text-neutral-300",
            group: "flex flex-col gap-2",
          }}
        >
          {mainMenu.map((item, index) => {
            return (
              <ListboxItem key={index} textValue={item.label} className="p-0">
                <Button
                  href={item.path}
                  className="w-full text-sm text-white flex justify-start"
                  size="md"
                  as={Link}
                  color="primary"
                  variant="light"
                  startContent={
                    <DashboardIcon
                      props={{ className: "h-5 w-5 text-white" }}
                    />
                  }
                >
                  {item.label}
                </Button>
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
                <Button
                  href={item.path}
                  className="w-full text-sm text-white flex justify-start"
                  size="md"
                  as={Link}
                  color="primary"
                  variant="light"
                  startContent={
                    <ModuleIcon props={{ className: "h-5 w-5 text-white" }} />
                  }
                >
                  {item.label}
                </Button>
              </ListboxItem>
            );
          })}
        </ListboxSection>
        <ListboxSection
          title={"Administracion"}
          showDivider
          classNames={{
            divider: "bg-white",
            heading: "text-neutral-300",
            group: "flex flex-col gap-2",
          }}
        >
          {mainAdmin.map((item, index) => {
            return (
              <ListboxItem key={index} textValue={item.label} className="p-0">
                <Button
                  href={item.path}
                  className="w-full text-sm text-white flex justify-start"
                  size="md"
                  as={Link}
                  color="primary"
                  variant="light"
                  startContent={
                    <ManagmentUserIcon
                      props={{ className: "h-5 w-5 text-white" }}
                    />
                  }
                >
                  {item.label}
                </Button>
              </ListboxItem>
            );
          })}
        </ListboxSection>
      </Listbox>
    );
  }, []);
  return visibleAside ? (
    <aside className={className}>
      <Button
        size="sm"
        variant="light"
        className="flex justify-end  self-end relative left-3 top-3"
        color="default"
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
