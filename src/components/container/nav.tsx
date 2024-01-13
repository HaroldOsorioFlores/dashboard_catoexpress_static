"use client";
import { Link } from "@nextui-org/react";

export const Nav = (): JSX.Element => {
  return (
    <nav className="flex flex-col mb-6">
      <ul className="flex flex-col">
        <li>
          <Link href={"/home"}>Home</Link>
        </li>
        <li>
          <Link href={"/ceprobis-ucsm"}>ceprobis ucsm</Link>
        </li>
        <li>
          <Link href={"/comoencasa-ucsm"}>como en casa ucsm</Link>
        </li>
        <li>
          <Link href={"/elcholo-ucsm"}>el cholo ucsm</Link>
        </li>
        <li>
          <Link href={"/panificadora-ucsm"}>panificadora ucsm</Link>
        </li>
      </ul>
    </nav>
  );
};
