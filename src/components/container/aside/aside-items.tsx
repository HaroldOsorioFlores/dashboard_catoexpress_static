export interface AsideItem {
  label: string;
  path: string;
}
export const mainModules: AsideItem[] = [
  {
    label: "Ceprobis UCSM",
    path: "/ceprobis-ucsm",
  },
  {
    label: "Como en Casa UCSM",
    path: "/comoencasa-ucsm",
  },
  {
    label: "El Cholo UCSM",
    path: "/elcholo-ucsm",
  },
  {
    label: "Panificadora UCSM",
    path: "/panificadora-ucsm",
  },
];

export const mainMenu: AsideItem[] = [{ label: "Inicio", path: "/home" }];

export const mainAdmin: AsideItem[] = [{ label: "Anadir usuario", path: "" }];
