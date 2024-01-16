export interface ColumInterface {
  name: string;
  uid: string;
}

export const columTable: ColumInterface[] = [
  { name: "Titulo", uid: "title" },
  { name: "Descripcion", uid: "description" },
  { name: "Lugar", uid: "place" },
  { name: " Precio", uid: "price" },
  { name: "Imagen", uid: "urlImage" },
  { name: "Acciones", uid: "actions" },
];
