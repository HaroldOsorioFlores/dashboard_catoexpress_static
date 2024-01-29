import { DashboardIcon, ManagmentUserIcon, ModuleIcon } from "@/components";

export interface AsideItem {
  label: string;
  path: string;
  icon: JSX.Element;
}
export const mainModules: AsideItem[] = [
  {
    label: "Ceprobis UCSM",
    path: "/ceprobis-ucsm",
    icon: <ModuleIcon className="text-white mr-3" />,
  },
  {
    label: "Como en Casa UCSM",
    path: "/comoencasa-ucsm",
    icon: <ModuleIcon className="text-white mr-3" />,
  },
  {
    label: "El Cholo UCSM",
    path: "/elcholo-ucsm",
    icon: <ModuleIcon className="text-white mr-3" />,
  },
  {
    label: "Panificadora UCSM",
    path: "/panificadora-ucsm",
    icon: <ModuleIcon className="text-white mr-3" />,
  },
];

export const mainMenu: AsideItem[] = [
  {
    label: "Inicio",
    path: "/home",
    icon: <DashboardIcon className="text-white mr-3" />,
  },
];

export const mainAdmin: AsideItem[] = [
  {
    label: "Anadir usuario",
    path: "",
    icon: <ManagmentUserIcon className="text-white mr-3" />,
  },
];

export const asideItems = [
  { title: "Menu", module: mainMenu },
  { title: "Modulos", module: mainModules },
  { title: "Administracion", module: mainAdmin },
];
