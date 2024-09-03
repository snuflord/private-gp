import Link from "next/link";
 
const LINKS = [
  {
    title: "Product",
    items: ["Overview", "Features", "Solutions", "Tutorials"],
  },
  {
    title: "Company",
    items: ["About us", "Careers", "Press", "News"],
  },
  {
    title: "Resource",
    items: ["Blog", "Newsletter", "Events", "Help center"],
  },
];
 
const currentYear = new Date().getFullYear();
 
export default function Footer() {

    return (
      <footer className="border-solid border-t-1 border-black dark:border-white py-16">
          <div className="container mx-auto px-4">
              <div className="grid grid-rows-1 grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 w-full">
                  <div className="my-5 flex flex-col">
                      <Link className="mt-2" href="/terms-conditions">Terms and Conditions</Link>
                      <Link className="mt-2" href="https://drsknn.store/" target="_blank">Book</Link>
                  </div>
                  <div className="my-5 flex flex-col">
                      <Link className="mt-2" href="/terms-conditions">Another Link</Link>
                      <Link className="mt-2" href="/terms-conditions">Another Link 2</Link>
                  </div>
              </div>
          </div>
      </footer>
    )
}