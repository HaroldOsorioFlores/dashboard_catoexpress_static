"use client"
import {
  Avatar,
  Navbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

export const Nav = ({ className }: { className: string }): JSX.Element => {
  return (
    <Navbar className={className} maxWidth="full" position="sticky" isBordered>
      <NavbarContent justify="end">
        <NavbarItem>
          <Avatar />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
