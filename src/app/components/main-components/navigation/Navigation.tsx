'use client'

type PageList = {
  title: string;
  slug: string;
  documentId: string;
};

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu } from "@nextui-org/react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { getPagesNames } from "@/app/lib/allDataPages";
import { getGlobalLogo } from "@/app/lib/globalData";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { MdEmail } from "react-icons/md";
import { HiOutlineChevronRight } from "react-icons/hi2";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [servicePagesList, setServicePagesList] = useState<PageList[]>([]);
  const [logoUrl, setLogoUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pagesResponse = await getPagesNames();
        setServicePagesList(pagesResponse.data);

        const logoResponse = await getGlobalLogo();
        setLogoUrl(logoResponse || "");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(`The pages list includes ${JSON.stringify(servicePagesList)}`);

  // Mobile:
  // const menuItems = [
  //   { name: "Contact", href: "/contact" },
  //   { name: "About", href: "/about" },
  //   { name: "Sexual Health", href: "/services/sexual-health" },
  //   { name: "Something Health", href: "/services/sexual-health" },
  //   { name: "Nothing Health", href: "/services/sexual-health" },
  //   { name: "Everything Health", href: "/services/sexual-health" },
  // ];

  const serviceItems = useMemo(() => servicePagesList.map((page) => ({
    name: page.title,
    href: `/services/${page.slug}`,
  })),
   [servicePagesList]);


  const logoElement = useMemo(() => (
    <>
      {logoUrl && logoUrl !== '' ? (
      <Link href="/" className="flex items-center h-[25px] w-[75px] md:h-[50px] md:w-[150px]">
        <Image 
          src={logoUrl} 
          alt="brand home page main navigation logo"
          width={150} 
          height={50}
          className="object-contain md:hover:scale-105 transition-transform duration-300"
        />
      </Link>
      ) : (
        <Link href="/" className="flex items-center font-bold">
            HOME
        </Link>
      )}
      </>
  ), [logoUrl]);

  return (
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={() => setIsMenuOpen(!isMenuOpen)}>
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
          onClick={() => setIsMenuOpen(isMenuOpen)}
        />
        <NavbarBrand className="grow-0">
          {logoElement}
        </NavbarBrand>

        <NavbarItem className="hidden sm:block">
          <Link className="font-bold" color="foreground" href="/about">
            About
          </Link>
        </NavbarItem>

        <NavbarItem className="hidden sm:block">
          <Link className="font-bold" color="foreground" href="/meet-the-team">
            Meet the Team
          </Link>
        </NavbarItem>

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

          {/* THE DESKTOP DROPDOWN MENU */}
          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
            >
            {serviceItems.map((item, index) => (
              <DropdownItem key={`${item.name}-${index}`} textValue={item.name}>
                <Link className="font-bold text-1xl" href={item.href}>
                  {item.name}
                </Link>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem isActive>
          <Link className="flex space-x-2 items-center group" color="foreground" href="/contact">
            <span className="hidden md:block md:group-hover:text-blue-500 transition-colors duration-300">Contact</span>
            <MdEmail className="block text-2xl md:text-xl md:group-hover:text-blue-500 transition-colors duration-300"/>
          </Link>
        </NavbarItem>

        <NavbarItem className="flex">
          <ThemeToggle />
        </NavbarItem>
      </NavbarContent>

      {/* THE WHOLE MOBILE MENU */}
      <NavbarMenu>
        <NavbarMenuItem>
          <Link className="font-bold" color="foreground" href="/about">
            About
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <Link className="font-bold" color="foreground" href="/meet-the-team">
            Meet the Team
          </Link>
        </NavbarMenuItem>

        {/* Services Accordion */}
        <NavbarMenuItem>
          <Button
            disableRipple
            className="p-0 bg-transparent font-bold flex"
            onClick={() => setIsServicesOpen(!isServicesOpen)} // Toggle the accordion
          >
            Services
            <HiOutlineChevronRight />
          </Button>
        </NavbarMenuItem>

        {isServicesOpen && ( // Conditional rendering of service items
          <div className="flex flex-col pl-4"> {/* Add padding or styling as needed */}
            {serviceItems.map((item, index) => (
              <Link key={`${item.name}-${index}`} className="font-bold text-lg" href={item.href}>
                {item.name}
              </Link>
            ))}
          </div>
        )}
            
      </NavbarMenu>
    </Navbar>
  );
}

function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
