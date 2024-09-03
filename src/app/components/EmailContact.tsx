import { MdEmail } from "react-icons/md";

export default function EmailContact() {
  return (
    <section className="mt-10 md:mt-20">
      <h1 className="font-bold mb-4 md:mb-8 text-3xl md:text-8xl flex">Get in touch<span className="ml-4">< MdEmail /></span>
      </h1>
        <h2 className="font-bold text-3xl md:text-6xl">If you would like to contact Dr Brennan, leave a message <a className="underline md:transition-all duration-300 md:hover:opacity-50" href="mailto:joebrennan.work@hotmail.co.uk?subject=To Dr. Brennan: ">here.</a></h2>
    </section>
  )
}
