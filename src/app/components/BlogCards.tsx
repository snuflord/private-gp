'use client'

import { getArticles } from "../lib/allDataArticles"
import { Key, Suspense, useEffect, useState } from "react"
import { CardSkeleton } from "./UI/skeletons";
import { Card } from "./UI/AllCards";
import clsx from "clsx";
import Link from "next/link";

export default function BlogCards() {

    const [currentPage, setCurrentPage] = useState(1);
    const [articlesList, setArticlesList] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const json = await getArticles({ page: currentPage });
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
            <Link href="/articles">See Articles</Link>
            <div className="w-full flex flex-col md:flex-col-reverse my-10">
                <div className="flex md:py-4 w-full items-center justify-end space-x-5 my-5">
                    <button className={clsx("min-w-20 rounded-lg p-2 md:p-4 bg-blue-500 hover:bg-blue-600 font-bold", {"bg-gray-900 hover:bg-gray-900 cursor-not-allowed": currentPage === 1})} onClick={handlePrevPage} disabled={currentPage === 1}>Prev.</button>
                    <button className={clsx("min-w-20 rounded-lg p-2 md:p-4 bg-blue-500 hover:bg-blue-600 font-bold", {"bg-gray-900 hover:bg-gray-900 cursor-not-allowed": articlesList.length < 3})} onClick={handleNextPage} disabled={articlesList.length < 3}>Next</button>
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 w-full">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <CardSkeleton key={index} />
                        ))}
                    </div>
                ) : articlesList && articlesList.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 w-full">
                        {articlesList.map((article: { id: Key | null | undefined; attributes: any }) => (
                            <Suspense key={article.id} fallback={<CardSkeleton/>}>
                                <Card key={article.id} article={article} />
                            </Suspense>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3 w-full">
                        <div className="bg-slate-800 rounded-lg p-4 w-full min-h-32 h-full">
                            <span className="font-bold">No More items!</span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}