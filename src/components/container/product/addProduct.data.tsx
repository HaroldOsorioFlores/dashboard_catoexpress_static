interface DataInput {
  label: string;
  placeholder: string;
  type: string;
  startContent?: string;
  classNames: {
    label: string;
    base?: string;
    innerWrapper?: string;
  };
}
export const dataInput: DataInput[] = [
  {
    label: "Titulo del producto",
    placeholder: "Harina",
    type: "text",
    classNames: { label: "text-default-700" },
  },
  {
    label: "Descripcion del producto",
    placeholder: "Harina con 3 gramos",
    type: "text",
    classNames: { label: "text-default-700" },
  },
  {
    label: "Precio del producto",
    placeholder: "3",
    type: "number",
    startContent: "S/.",
    classNames: { label: "text-default-700", base: "text-sm" },
  },
];
