"use client";

import { Link } from "@nextui-org/react";

export default function Home() {
  return (
    <main className="flex flex-col">
      <h1>No es parte del nav</h1>
      <Link href={"/home"}>Home </Link>
    </main>
  );
}
