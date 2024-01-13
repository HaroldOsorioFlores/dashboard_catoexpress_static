"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col">
      <h1>No es parte del nav</h1>
      <Link href={"/home"}>Ir a ceprobis </Link>
    </main>
  );
}
