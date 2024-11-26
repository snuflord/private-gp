'use client'

import Link from "next/link";
import Image from "next/image";
import placeholder from "../../../../public/placeholder-image.jpg";

export function Card({article}: {article: any}) {

    const data = article;

    return (
        <Link href={`/articles/${data.slug}`} className="glCard base-card mb-2 md:mb-4 group transition duration-300 border-solid border-2 border-black md:hover:border-black/50 dark:border-white/50 dark:md:hover:border-white p-2 md:p-4 w-full min-h-32 md:min-h-56 h-full flex flex-col">
            <div className="flex flex-col md:flex-row justify-between">
                <h3 className="text-xs md:text-base font-bold mb-2 w-full">{data.title}</h3>
            </div>
        </Link>
    )
}

export function TallCard({article}: {article: any}) {

    const data = article;

    return (
        <Link href={`/articles/${data.slug}`} className="glCard tall-card group mb-2 md:mb-4 group transition duration-300 border-solid border-2 border-black md:hover:border-black/50 dark:border-white/50 dark:md:hover:border-white p-2 md:p-4 w-full min-h-32 md:min-h-72 h-full flex flex-col md:hover:shadow-xl shadow-black dark:shadow-blue-500">
            <div className="flex flex-col h-full justify-between">
                <div className="overflow-hidden">
                    <Image 
                        src={data.hero?.formats?.small.url || placeholder}
                        alt={data.title}
                        width={300}
                        height={200}
                        className="w-full object-cover aspect-video md:group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <h3 className="text-xs md:text-base font-bold w-full">{data.title}</h3>
            </div>
        </Link>
    )
}