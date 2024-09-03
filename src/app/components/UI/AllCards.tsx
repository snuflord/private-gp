'use client'

import Link from "next/link";
import Markdown from "react-markdown";

export function Card({article}: {article: any}) {

    const data = article;

    // const truncatedDescription =
    // data.attributes.description.length > 100
    //   ? `${data.attributes.description.substring(0, 100)}...`
    //   : data.attributes.description;

    return (
        <Link href={`/articles/${data.id}`} className="group transition duration-300 bg-slate-800 rounded-lg p-4 md:hover:bg-gradient-to-r from-indigo-500 to-emerald-600 w-full min-h-32 h-full flex flex-col">

            <div className="flex flex-col md:flex-row justify-between">
                <h3 className="text-xs md:text-base font-bold mb-2 w-full md:max-w-[60%]">{data.attributes.title}</h3>
                <span className="text-xs md:text-base mb-2 font-bold underline-offset-2 text-emerald-500 group-hover:text-white group-hover:underline">Author: {data.attributes.associatedUsername}</span>
            </div>
            
            {/* <span className="text-xs md:text-base mb-2">{truncatedDescription}</span> */}

            <span className="text-xs md:text-sm font-bold mt-auto">Updated: {new Date(data.attributes.updatedAt).toLocaleDateString("en-UK")}</span>
            
        </Link>
    )
}