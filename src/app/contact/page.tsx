import Contact from "../components/Contact";

export default function ConntactPage() {
    return (
        <div>
            <div className="my-14 md:my-40">
                <h1 className="font-bold text-4xl tracking-wide md:text-6xl lg:text-7xl text-center">If you would like to leave Dr Brennan a message, you can contact him by using the form below</h1>
            </div>
            <Contact />
        </div>
    );
}