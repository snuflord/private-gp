import { getArticle } from "@/app/lib/allDataArticles";
import Image from "next/image";
import defaultImage from '../../../../public/luxury-office.webp';
import { Metadata } from 'next';
import { notFound } from 'next/navigation'
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Key } from "react";

// TypeScript Interfaces

// Grouping provider metadata
interface ProviderMetadata {
  public_id: string;
  resource_type: string;
}

// Defining the format for images with a shared interface
interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
  provider_metadata: ProviderMetadata;
}

// MediaData representing an individual media item
interface MediaData {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: ProviderMetadata;
  createdAt: string;
  updatedAt: string;
  documentId: string;
  locale: string | null;
  publishedAt: string | null;
}


// Text node within the description
interface TextNode {
  type: 'text';
  text: string;
  underline?: boolean;
  bold?: boolean;
  italic?: boolean;
}

// Link node, which contains text nodes
interface LinkNode {
  type: 'link';
  url: string;
  children: TextNode[];
}

// Paragraph node can contain text or links
interface ParagraphNode {
  type: 'paragraph';
  children: (TextNode | LinkNode)[];
}

// List node for ordered or unordered lists
interface ListNode {
  type: 'list';
  format: 'unordered' | 'ordered';
  children: ListItemNode[];
}

// Individual list items
interface ListItemNode {
  type: 'list-item';
  children: (TextNode | LinkNode)[];
}

// DescriptionNode can either be a paragraph or a list
type DescriptionNode = ParagraphNode | ListNode;

// Main ArticleData interface
interface ArticleData {
  Youtube: string | null;
  id: number;
  title: string;
  description: DescriptionNode[]; // Array of description nodes
  createdAt: string;
  updatedAt: string;
  media: MediaData[]; // Nested media attributes
  slug: string;
  documentId: string;
  locale: string | null;
  publishedAt: string | null;
  localizations: any[]; // Assuming an array for localizations
}


// Generates Metadata for dynamic page.
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  
  const articleSlug = params.slug;

  // Fetch the article data
  const json = await getArticle(articleSlug, true);
  const article = json?.data;

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The article you're looking for doesn't exist.",
    };
  }

  return {
    title: article.title,
    description: `Read more about: ${article.title}`, // Customize this as needed
    openGraph: {
      title: article.title,
      description: article.description[0]?.children[0]?.text || "Private GP UK Article",
      url: `http://localhost:4000/${articleSlug}}`,
      images: [
        {
          url: article.media?.data?.[0]?.formats?.medium?.url || 'default-image-url',
          width: 800,
          height: 600,
          alt: article.title,
        },
      ],
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  
  const articleSlug = params.slug;
  console.log(`Here is the slug - ${articleSlug} - coming in dynamically`);

  if (!articleSlug) {
    notFound();
    return null;
  }

  const json: {media: any; data: ArticleData } = await getArticle(articleSlug, true);
  const article = json?.data;

  if (!article) {
    notFound();
    return null;
  }

    return (
      <div className="container mx-auto px-4 mt-12 max-w-5xl">
        <div className="md:min-h-[60vh]">
          <div className="flex flex-col md:flex-row md:justify-between">
            <h1 className="text-3xl mb-10 md:text-4xl font-bold">{article.title}</h1>
            <div className="md:space-x-2 flex flex-col md:flex-row md:items-center">
              <span className="font-semibold">
                Posted: {new Date(article.createdAt).toLocaleDateString("en-UK")}
              </span>
              <span className="font-semibold">
                Updated: {new Date(article.updatedAt).toLocaleDateString("en-UK")}
              </span>
            </div>
          </div>
          <div>
            {article.description.map((descItem, index) => {
              if (descItem.type === 'paragraph') {
                return (
                  <p className="my-4" key={index}>
                    {descItem.children.map((child, childIndex) => {
                      if (child.type === 'text') {
                        return (
                          <span
                            key={childIndex}
                            style={{
                              textDecoration: child.underline ? 'underline' : 'none',
                              fontWeight: child.bold ? 'bold' : 'normal',
                              fontStyle: child.italic ? 'italic' : 'normal'
                            }}
                          >
                            {child.text}
                          </span>
                        );
                      } else if (child.type === 'link') {
                        return (
                          <a className="underline text-blue-600" target="_blank" key={childIndex} href={child.url}>
                            {child.children.map((linkChild, linkChildIndex) => (
                              <span key={linkChildIndex}>{linkChild.text}</span>
                            ))}
                          </a>
                        );
                      }
                      return null;
                    })}
                  </p>
                );
              } else if (descItem.type === 'list') {
                if (descItem.format === 'unordered') {
                  return (
                    <ul className="list-disc ml-5 my-4" key={index}>
                      {descItem.children.map((listItem, listItemIndex) => (
                        <li key={listItemIndex}>
                          {listItem.children.map((listItemChild, listItemChildIndex) => {
                            if (listItemChild.type === 'text') {
                              return <span key={listItemChildIndex}>{listItemChild.text}</span>;
                            } else if (listItemChild.type === 'link') {
                              return (
                                <a className="underline text-blue-600" target="_blank" key={listItemChildIndex} href={listItemChild.url}>
                                  {listItemChild.children.map((linkChild, linkChildIndex) => (
                                    <span key={linkChildIndex}>{linkChild.text}</span>
                                  ))}
                                </a>
                              );
                            }
                            return null;
                          })}
                        </li>
                      ))}
                    </ul>
                  );
                } else if (descItem.format === 'ordered') {
                  return (
                    <ol className="list-decimal ml-5 my-4" key={index}>
                      {descItem.children.map((listItem, listItemIndex) => (
                        <li key={listItemIndex}>
                          {listItem.children.map((listItemChild, listItemChildIndex) => {
                            if (listItemChild.type === 'text') {
                              return <span key={listItemChildIndex}>{listItemChild.text}</span>;
                            } else if (listItemChild.type === 'link') {
                              return (
                                <a className="underline text-blue-600" target="_blank" key={listItemChildIndex} href={listItemChild.url}>
                                  {listItemChild.children.map((linkChild, linkChildIndex) => (
                                    <span key={linkChildIndex}>{linkChild.text}</span>
                                  ))}
                                </a>
                              );
                            }
                            return null;
                          })}
                        </li>
                      ))}
                    </ol>
                  );
                }
              }
              return null;
            })}
          </div>
          <div>
            <>
            {/* IMAGES */}
            {/* If there is data, and if the media items resource type is image... truth check then render */}
            {json && json.data.media.some((mediaItem: MediaData) => mediaItem.provider_metadata.resource_type === 'image') ? (
              <>
                <div className="w-full md:w-1/2 overflow-hidden my-10 mx-auto">
                  <div className="flex space-x-2 md:space-x-10">
                  {/* If data.media is an array, map multiple mediaItems */}
                    {Array.isArray(json.data.media) ? json.data.media.map((mediaItem: MediaData) => (
                      <div key={mediaItem.id} className="mb-5 md:mb-0 rounded-lg overflow-hidden">
                        <Image
                          src={mediaItem.url}
                          alt={mediaItem.name || "API Image"}
                          width={1200}
                          height={675}
                          className="hidden md:block w-full h-full object-cover"
                          priority={true}
                          placeholder="empty"
                        />
                        <Image
                          src={mediaItem.formats.small?.url || defaultImage}
                          alt={mediaItem.name || "API Image"}
                          width={1200}
                          height={675}
                          className="block md:hidden w-full h-full object-cover"
                          priority={true}
                          placeholder="empty"
                        />
                      </div>
                    )) : (
                      // If it's not an array, handle the single media object- By using 'as MediaData', explicitly tell TypeScript json.data.media is a single MediaData object in this case.
                      <div key={(json.data.media as MediaData).id} className="mb-5 md:mb-0 rounded-lg overflow-hidden">
                        <Image
                          src={(json.data.media as MediaData).url}
                          alt={(json.data.media as MediaData).name || "API Image"}
                          width={1200}
                          height={675}
                          className="hidden md:block w-full h-full object-cover"
                          priority={true}
                          placeholder="empty"
                        />
                        <Image
                          src={(json.data.media as MediaData).formats.small?.url || defaultImage}
                          alt={(json.data.media as MediaData).name || "API Image"}
                          width={1200}
                          height={675}
                          className="block md:hidden w-full h-full object-cover"
                          priority={true}
                          placeholder="empty"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
            </>
            {/* VIDEO MP4 */}
            <>
            {json && json.data.media?.[0]?.provider_metadata.resource_type === 'video' && (
              <>
                <div className="md:w-2/3 my-10 mx-auto">
                  <div className="video-container">
                    <video
                      width="100%"
                      height="auto"
                      controls
                      poster={json.data.media?.[0]?.previewUrl || undefined}
                    >
                      <source src={json.data.media?.[0]?.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </>
            )}
            </>
            {/* VIDEO YOUTUBE EMBED */}
            {json && json.data.Youtube && json.data.Youtube.trim() !== '' ? (
              <>
                <div className="my-10 mx-auto">
                  <div className="w-full h-0 pb-[56.25%] relative">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${json.data.Youtube.includes('watch?v=') ? json.data.Youtube.split('watch?v=')[1] : json.data.Youtube.split('be/')[1]}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  }

