import placeholderImg from "../../../public/placeholder-headshot.jpg"
import Image from "next/image";

export default function ImageCard() {
    return (
        <div className="w-100 my-10 md:my-24">
            <div className="flex flex-col md:flex-row h-auto md:max-h-[600px] w-100 gap-5">
                <div className="bg-zinc-900 w-full p-5">Item One</div>

                <div className="w-full flex items-center justify-center">
                    <div className="h-full w-full">
                        <Image
                            src={placeholderImg}
                            width={500}
                            height={500}
                            alt="Picture of the author"
                            quality="100"
                            loading="lazy"
                            className="object-contain w-full h-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}