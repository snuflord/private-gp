'use client'

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu } from "@nextui-org/react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { getPagesNames } from "@/app/lib/allDataPages";
import { useEffect, useState } from "react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pagesList, setPagesList] = useState([]);

  useEffect(() => {
    const fetchPageNames = async () => {
        try {
          const json = await getPagesNames();
          setPagesList(json.data);
          console.log(json.data)

          // setLoading(false); // Set loading to false after data is fetched
        } catch (error) {
          console.error('Error fetching pages:', error);
        }
    };

    fetchPageNames();
  }, []);

  console.log(`The pages list includes ${JSON.stringify(pagesList)}`);

  // Mobile:
  // const menuItems = [
  //   { name: "Contact", href: "/contact" },
  //   { name: "About", href: "/about" },
  //   { name: "Sexual Health", href: "/services/sexual-health" },
  //   { name: "Something Health", href: "/services/sexual-health" },
  //   { name: "Nothing Health", href: "/services/sexual-health" },
  //   { name: "Everything Health", href: "/services/sexual-health" },
  // ];

  const menuItems = pagesList.map((page: { Title: string, slug: string, documentId: string }) => ({
    name: page.Title,
    href: `/services/${page.slug}`,
  }));

  // In the dropdown list:
  // const dropDowns = [
  //   { name: "Sexual Health", href: "/services/sexual-health" },
  //   { name: "Something Health", href: "/services/sexual-health" },
  //   { name: "Nothing Health", href: "/services/sexual-health" },
  //   { name: "Everything Health", href: "/services/sexual-health" },
  // ];

  const dropDowns = pagesList.map((page: { Title: string, slug: string, documentId: string }) => ({
    name: page.Title,
    href: `/services/${page.slug}`,
  }));

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
                className="p-0 bg-transparent data-[hover=true]:bg-transparent hidden sm:block font-bold md:hover:underline underline-offset-4"
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
              <DropdownItem key={`${item.name}-${index}`} textValue={item.name}>
                <Link href={item.href}>
                  {item.name}
                </Link>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        <NavbarItem className="hidden sm:block">
          <Link color="foreground" href="/about">
            About
          </Link>
        </NavbarItem>

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

function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
