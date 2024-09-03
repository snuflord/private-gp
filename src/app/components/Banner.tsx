'use client'

import Image from "next/image";
import bannerImg from "../../../public/luxury-office.webp";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Banner() {

    const title = useRef<HTMLHeadingElement | null>(null);

    useEffect(() => {
        if (title.current) {
            gsap.to(title.current, {opacity: 1, duration: 1, scale: 1.1, ease: "expo"})
        }
    }, []);

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

            <h1 ref={title} className="relative z-30 opacity-0 text-center text-3xl md:text-5xl font-bold text-white">
                Private GP Service in Wilmslow
            </h1>
        </div>
    );
}
