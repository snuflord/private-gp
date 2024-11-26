'use client'

type PageList = {
  title: string;
  slug: string;
  documentId: string;
};

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { getPagesNames } from "@/app/lib/allDataPages";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { HiOutlineChevronRight } from "react-icons/hi2";
import { LogoSkeleton } from "../../UI/skeletons";
import { useLogo } from "../../../../../context/LogoContext";
import { HiOutlineMail } from "react-icons/hi";
import { CiLogin } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";
import { FaHospitalUser } from "react-icons/fa";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [servicePagesList, setServicePagesList] = useState<PageList[]>([]);
  const { logoUrl, loading } = useLogo();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pagesResponse = await getPagesNames();
        setServicePagesList(pagesResponse.data);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(`The pages list includes ${JSON.stringify(servicePagesList)}`);

  const fixedItems = [
    { name: "About", href: "/about" },
    { name: "Team", href: "/team" },
    { name: "Articles", href: "/articles" },
  ];

  const serviceItems = useMemo(() => [
    { name: 'Overview', href: '/services' }, // Hardcoded route
    ...servicePagesList.map((page) => ({
      name: page.title,
      href: `/services/${page.slug}`,
    })),
  ], [servicePagesList]);

  const handleLinkClick = () => {
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 300);
  };

  const logoElement = useMemo(() => (
    loading ? (
      <LogoSkeleton />
    ) : (
      <Link href="/" className="flex h-[50px] w-[150px]">
        {typeof logoUrl === 'string' && logoUrl !== '' ? (
          <Image 
            src={logoUrl} 
            alt="brand home page main navigation logo"
            width={150} 
            height={50}
            className="object-contain md:hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <>HOME</>
        )}
      </Link>
    )
  ), [logoUrl, loading]);

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

        <Dropdown >
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="text-1xl p-0 bg-transparent data-[hover=true]:bg-transparent hidden sm:block font-bold md:hover:underline underline-offset-4"
                radius="sm"
                variant="light"
              >
                Services and Treatments
              </Button>
            </DropdownTrigger>
          </NavbarItem>

          {/* THE DESKTOP DROPDOWN MENU */}
          <DropdownMenu
            aria-label="ACME features"
            // className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
            >
            {serviceItems.map((item, index) => (
              <DropdownItem key={`${item.name}-${index}`} textValue={item.name}>
                <Link className="font-bold text-1xl transition-opacity duration-300 md:hover:opacity-75 block w-100" href={item.href}>
                  {item.name}
                </Link>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        {fixedItems.map((item, index) => (
          <NavbarItem className="hidden sm:block" key={`${item.name}-${index}`} >
            <Link className="font-bold text-1xl transition-opacity duration-300 md:hover:opacity-75 block w-100" href={item.href}>
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem isActive>
          <Link className="flex space-x-2 items-center group" color="foreground" href="/contact">
            <span className="hidden md:block md:group-hover:opacity-75 transition-opacity duration-300">Contact</span>
            <HiOutlineMail className="ml-3 md:group-hover:opacity-75 transition-opacity duration-300 text-xl"/>
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <Button 
                variant="shadow" 
                
              >
                <span className="hidden md:block font-bold text-md">Login</span>
                <CiLogin className="text-lg font-bold"/>
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">

              <DropdownItem textValue="admin-login" startContent={<IoMdSettings />} key="new"><Link href="/admin-login-portal">Admin Login</Link></DropdownItem>

              <DropdownItem textValue="patient-login" startContent={<FaHospitalUser />} className="font-bold" key="copy"><Link href="/login-portal">Patient Lgin</Link></DropdownItem>

            </DropdownMenu>
          </Dropdown>
        </NavbarItem>

        <NavbarItem className="hidden md:block">
          <ThemeToggle />
        </NavbarItem>
      </NavbarContent>

      {/* THE WHOLE MOBILE MENU */}
      <NavbarMenu>

        {/* Services Accordion */}
        <NavbarMenuItem>
          <Button
            disableRipple
            className="p-0 bg-transparent text-1xl m-0 font-bold flex items-center h-auto"
            onClick={() => setIsServicesOpen(!isServicesOpen)} // Toggle the accordion
          >
            Services and Treatments
            <HiOutlineChevronRight
              className={`transition-transform duration-300 ${
                isServicesOpen ? 'rotate-90' : 'rotate-0'
              }`}
            />
          </Button>
        </NavbarMenuItem>

        <div
          className={`transition-all duration-1000 overflow-hidden ${
            isServicesOpen ? 'max-h-72 opacity-100 overflow-scroll' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col pl-4">
            {serviceItems.map((item, index) => (
              <Link key={`${item.name}-${index}`} className="font-bold text-lg mb-2" href={item.href} onClick={handleLinkClick}>
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {fixedItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`} >
            <Link  href={item.href} className="font-bold" color="foreground" onClick={handleLinkClick}>
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}

        <NavbarMenuItem>
          <Link className="font-bold" color="foreground" href="/contact" onClick={handleLinkClick}>
            Contact
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}

function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
