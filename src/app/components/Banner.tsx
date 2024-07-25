import Image from "next/image";
import bannerImg from "../../../public/luxury-office.webp"

export default function Banner() {
    return (
        <div className="relative overflow-hidden h-[50vh] bg-slate-600 flex items-center justify-center">
            
                <div className="absolute top-0 w-full h-[50vh]">
                    <Image 
                        src={bannerImg}
                        alt="Default Image"
                        width={560}
                        height={620}
                        className="w-full h-full object-cover"
                        priority={true}
                        placeholder="empty"
                    />
                </div>
            

        <div className="absolute inset-0 bg-black/50 w-full h-full z-20"></div>

        <h1 className="relative z-30 text-3xl md:text-5xl font-bold text-white">Private GP Wilmslow</h1>
    </div>

    );
}