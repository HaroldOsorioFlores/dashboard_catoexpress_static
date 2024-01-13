import Link from "next/link";

export const Nav = (): JSX.Element => {
  return (
    <nav className="flex flex-col mb-6">
      <ul>
        <li>
          <Link href={"/catoexpress-ucsm"}>Catoexpress</Link>
        </li>
      </ul>
    </nav>
  );
};
