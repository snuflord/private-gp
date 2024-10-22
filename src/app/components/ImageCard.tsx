import placeholderImg from "../../../public/wdow_placeholder.webp"
import Image from "next/image";

export default function ImageCard() {
    return (
        <div className="w-100 py-10 md:py-24">
            <div className="flex align-middle flex-col md:flex-row h-fit w-100 gap-5 md:gap-12">
                <div className="bg-zinc-900 w-50 md:w-full d-flex justify-center">
                    <p className="text-white d-flex align-middle w-full p-5 md:p-10 text-1xl md:text-3xl">
                        With over 25 years of experience, Dr. Brennan is a distinguished general practitioner dedicated to your well-being. His extensive expertise covers preventive care, chronic disease management, and acute treatment, ensuring personalized and compassionate healthcare. Dr. Brennan combines the latest medical advancements with a deep understanding of individual health needs, fostering strong patient relationships and proactive wellness strategies. Choosing Dr. Brennan means opting for exceptional care tailored to your unique needs. Experience top-tier medical expertise and a commitment to your health with Dr. Brennan as your trusted healthcare partner.
                    </p>
                </div>
                <div className="w-50 md:w-full flex items-center justify-center">
                    <div className="h-full w-full">
                        <div className="aspect-square">
                            <Image
                                src={placeholderImg}
                                width={500}
                                height={500}
                                alt="Picture of the author"
                                quality="100"
                                loading="lazy"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}