import { getPage, getPagesSlugs } from "@/app/lib/allDataPages";
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

// This function generates static parameters for each service page
export async function generateStaticParams() {
  
  const slugs = await getPagesSlugs();
  const slugArray = Array.from(slugs) as string[];
  console.log("Generated static params:", slugArray);

  return slugArray.map((slug): { slug: string } => ({
    slug,
  }));
}



// Generates Metadata for dynamic page.
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  
  const pageSlug = params.slug;

  // Fetch the page data
  const json = await getPage(pageSlug, true);
  const page = json?.data;

  if (!page) {
    return {
      title: "page Not Found",
      description: "The page you're looking for doesn't exist.",
    };
  }

  return {
    title: page.title,
    description: `Read more about: ${page.title}`,
    openGraph: {
      title: page.title,
      description: page.Description || "Page description",
      url: `http://localhost:4000/${page.slug}`,
      images: [
        {
          url: page.media?.data?.[0]?.formats?.medium?.url || 'default-image-url',
          width: 800,
          height: 600,
          alt: page.title,
        },
      ],
    },
  };
}

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
            <h1 className="text-3xl mb-10 md:text-4xl font-bold">{page.title}</h1>
          </div>
        </div>
      </div>
    );
  }

