'use client'

import { getArticlesList } from "../lib/allDataArticles"
import { Key, Suspense, useEffect, useState } from "react"
import { CardSkeleton } from "./UI/skeletons";
import { TallCard } from "./UI/AllCards";
import clsx from "clsx";
import Link from "next/link";

export default function ArticlesList() {

    const [currentPage, setCurrentPage] = useState(1);
    const [articlesList, setArticlesList] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const json = await getArticlesList({ page: currentPage });
                setArticlesList(json.data);

                console.log(json.data)

                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchArticles();
    }, [currentPage]); // Include currentPage in dependency array to re-fetch articles when page changes


    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const handleNextPage = () => {
        console.log('next page')
        setCurrentPage(currentPage + 1);
    };

    return (
        <>
            <div className="w-full flex flex-col md:flex-col-reverse my-4 md:my-10">
                <div className="flex md:py-4 w-full items-center justify-end space-x-5 my-5">
                    <button className={clsx("min-w-20 rounded-lg p-2 md:p-4 bg-blue-500 text-white hover:bg-blue-600 font-bold", {"bg-gray-900 hover:bg-gray-900 cursor-not-allowed": currentPage === 1})} onClick={handlePrevPage} disabled={currentPage === 1}>Prev.</button>
                    <button className={clsx("min-w-20 rounded-lg p-2 md:p-4 bg-blue-500 text-white hover:bg-blue-600 font-bold", {"bg-gray-900 hover:bg-gray-900 cursor-not-allowed": articlesList.length < 3})} onClick={handleNextPage} disabled={articlesList.length < 3}>Next</button>
                </div>

                {loading ? (
                    <div className="w-full grid grid-cols-2 gap-4">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <CardSkeleton key={index} />
                        ))}
                    </div>
                ) : articlesList && articlesList.length > 0 ? (
                    <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                        {articlesList.map((article: { id: Key | null | undefined; attributes: any }) => (
                            <Suspense key={article.id} fallback={<CardSkeleton/>}>
                                <TallCard key={article.id} article={article} />
                            </Suspense>
                        ))}
                    </div>
                ) : (
                    <div className="w-full grid grid-cols-2 gap-4 md:gap-8">
                        <div className="mb-2 md:mb-4 bg-slate-800 rounded-lg p-4 w-full min-h-32 md:min-h-56 h-full">
                            <span className="font-bold">No More items!</span>
                        </div>
                        <div className="mb-2 md:mb-4 bg-slate-800 rounded-lg p-4 w-full min-h-32 md:min-h-56 h-full">
                            
                        </div>
                        <div className="mb-2 md:mb-4 bg-slate-800 rounded-lg p-4 w-full min-h-32 md:min-h-56 h-full">
                            
                        </div>
                        <div className="mb-2 md:mb-4 bg-slate-800 rounded-lg p-4 w-full min-h-32 md:min-h-56 h-full">
                            
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}