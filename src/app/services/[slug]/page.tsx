import { getPage } from "@/app/lib/allDataPages";
import Image from "next/image";
import defaultImage from '../../../../public/luxury-office.webp';
import { Metadata } from 'next';
import { notFound } from 'next/navigation'
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Key } from "react";

// TypeScript Interfaces
// Grouping provider metadata
import {
    ProviderMetadata,
    ImageFormat,
    MediaData,
    TextNode,
    LinkNode,
    ParagraphNode,
    ListNode,
    ListItemNode,
    DescriptionNode,
    PageData
} from "../../types/pageTypes";



// Generates Metadata for dynamic page.
// export async function generateMetadata({ params }: { params: { documentId: string } }): Promise<Metadata> {
  
//   const documentId = params.documentId;
  
//   const articleId = documentId;

//   // Fetch the article data
//   const json = await getArticle(articleId, true);
//   const article = json?.data;

//   if (!article) {
//     return {
//       title: "Article Not Found",
//       description: "The article you're looking for doesn't exist.",
//     };
//   }

//   return {
//     title: article.title,
//     description: `Read more about: ${article.title}`, // Customize this as needed
//     openGraph: {
//       title: article.title,
//       description: article.description[0]?.children[0]?.text || "Private GP UK Article",
//       url: `http://localhost:4000/${documentId}`,
//       images: [
//         {
//           url: article.media?.data?.[0]?.formats?.medium?.url || 'default-image-url',
//           width: 800,
//           height: 600,
//           alt: article.title,
//         },
//       ],
//     },
//   };
// }

export default async function Page({ params }: { params: { slug: string } }) {
  
  const pageSlug = params.slug;
  console.log(`Here is the documentId - ${pageSlug} - coming in dynamically`);

  if (!pageSlug) {
    notFound();
    return null;
  }

  const json: {media: any; data: PageData } = await getPage(pageSlug, true);
  const page = json?.data;

  console.log(page);

  if (!page) {
    notFound();
    return null;
  }

    return (
      <div className="container mx-auto px-4 mt-12 max-w-5xl">
        <div className="md:min-h-[60vh]">
          <div className="flex flex-col md:flex-row md:justify-between">
            <h1 className="text-3xl mb-10 md:text-4xl font-bold">{page.Title}</h1>
          </div>
        </div>
      </div>
    );
  }

