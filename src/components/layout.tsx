import { Aside, Nav } from ".";

export const Layout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <section className=" flex bg-white">
      <section className=" max-sm:hidden p-5 h-screen  sticky top-0">
        <Aside
          className={
            "w-72 flex flex-col h-full bg-zinc-800 rounded-xl text-white px-5 py-3 shadow-xl"
          }
        />
      </section>
      <section className="p-5 md:pr-5 w-full flex flex-col gap-5">
        <section>
          <Nav className={"shadow-md rounded-md p3"} />
        </section>
        <section className="h-full w-full">{children}</section>
      </section>
    </section>
  );
};
