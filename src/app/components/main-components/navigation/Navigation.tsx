'use client'

import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu } from "@nextui-org/react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { name: "Contact", href: "/contact" },
    { name: "Sexual Health", href: "/services/sexual-health" },
  ];

  const dropDowns = [
    { name: "Sexual Health", href: "/services/sexual-health" },
    { name: "Something Health", href: "/services/sexual-health" },
    { name: "Nothing Health", href: "/services/sexual-health" },
    { name: "Everything Health", href: "/services/sexual-health" },
  ];

  return (
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={() => setIsMenuOpen(!isMenuOpen)}>
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
          onClick={() => setIsMenuOpen(isMenuOpen)}
        />
        <NavbarBrand className="grow-0">
          <Link href="/" className="font-bold text-inherit">HOME</Link>
        </NavbarBrand>

        <Dropdown >
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent hidden sm:block font-bold"
                radius="sm"
                variant="light"
              >
                Services
              </Button>
            </DropdownTrigger>
          </NavbarItem>

          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            {dropDowns.map((item, index) => (
              <DropdownItem key={`${item.name}-${index}`}>
                <Link href={item.href}
                >
                  {item.name}
                </Link>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem isActive>
          <Link color="foreground" href="/contact">
            Contact
          </Link>
        </NavbarItem>

        <NavbarItem>
          <ThemeToggle />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              color={index === 2 ? "primary" : menuItems.length - 1 === index ? "danger" : "foreground"}
              className="w-full"
              href={item.href}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}