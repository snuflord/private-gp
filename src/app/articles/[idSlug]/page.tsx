import { getArticle } from "@/app/lib/alldata";
import Image from "next/image";
import defaultImage from '../../../../public/luxury-office.webp';
import { Metadata } from 'next';
import { notFound } from 'next/navigation'

// TypeScript Interfaces

interface TextNode {
  type: 'text';
  text: string;
  underline?: boolean;
  bold?: boolean;
  italic?: boolean;
}

interface LinkNode {
  type: 'link';
  url: string;
  children: TextNode[];
}

interface ParagraphNode {
  type: 'paragraph';
  children: (TextNode | LinkNode)[];
}

interface ListNode {
  type: 'list';
  format: 'unordered' | 'ordered';
  children: ListItemNode[];
}

interface ListItemNode {
  type: 'list-item';
  children: (TextNode | LinkNode)[];
}

type DescriptionNode = ParagraphNode | ListNode;

interface ImageFormat {
  url: string;
  width: number;
  height: number;
}

interface MediaData {
  attributes: {
    name: string;
    url: string;
    formats: {
      thumbnail?: ImageFormat;
      small?: ImageFormat;
      medium?: ImageFormat;
      large?: ImageFormat;
    };
    provider_metadata?: {
      resource_type: string;
    };
  };
}

interface MediaAttributes {
  data: MediaData[];
}

interface ArticleAttributes {
  Youtube: string | undefined;
  title: string;
  description: DescriptionNode[];
  createdAt: string;
  updatedAt: string;
  media: MediaAttributes;
}

interface ArticleData {
  data: {
    attributes: ArticleAttributes;
  };
}

// idSlug value passed dynamically from dynamic route value.
const extractIdFromIdSlug = (idSlug: string) => {
  return idSlug.split("-")[0]; // Extract the part before the hyphen as the id
};

// Generates Metadata for dynamic page.
export async function generateMetadata({ params }: { params: { idSlug: string } }): Promise<Metadata> {
  const { idSlug } = params;
  const articleId = extractIdFromIdSlug(idSlug);

  // Fetch the article data
  const json = await getArticle(articleId, true);
  const article = json?.data?.attributes;

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
      url: `http://localhost:4000/${idSlug}`,
      images: [
        {
          url: article.media?.data?.[0]?.attributes?.formats?.medium?.url || 'default-image-url',
          width: 800,
          height: 600,
          alt: article.title,
        },
      ],
    },
  };
}

export default async function Page({ params }: { params: { idSlug: string } }) {
  const { idSlug } = params;
  const articleId = extractIdFromIdSlug(idSlug);

  if (!articleId) {
    notFound();
  } else {
    try {
      const json: ArticleData = await getArticle(articleId, true);
      const article = json.data.attributes;

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
        <div className="prose prose-lg max-w-none">
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
            {json && json.data.attributes.media.data[0].attributes?.provider_metadata?.resource_type === 'image' ? (
          <>
            {json && json.data.attributes.media.data.length > 0 && (
              <div className="w-full md:w-1/2 overflow-hidden my-10 mx-auto">
                <div className="flex space-x-10">
                  {json.data.attributes.media.data.map((mediaItem, index) => (
                    <div key={index} className="mb-5 md:mb-0 rounded-lg overflow-hidden">
                      <Image
                        src={mediaItem.attributes.url}
                        alt={mediaItem.attributes.name || "API Image"}
                        width={1200}
                        height={675}
                        className="hidden md:block w-full h-full object-cover"
                        priority={true}
                        placeholder="empty"
                      />
                      <Image
                        src={mediaItem.attributes.formats.small?.url || defaultImage}
                        alt={mediaItem.attributes.name || "API Image"}
                        width={1200}
                        height={675}
                        className="block md:hidden w-full h-full object-cover"
                        priority={true}
                        placeholder="empty"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
            ) : (
          <></>
            )}
          </>
          {/* VIDEO MP4 */}
          <>
            {json && json.data.attributes.media.data[0].attributes?.provider_metadata?.resource_type === 'video' ? (
          <>
            <div className="md:w-2/3 my-10 mx-auto">
              <div className="video-container">
              <video width="100%" height="auto" controls poster="http://res.cloudinary.com/dyrs796wi/video/upload/c_scale,dl_200,vs_6,w_250/movie_example_a349bd8e32.gif">
                <source src={json.data.attributes.media.data[0].attributes?.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            </div>
          </>
            ) : (
          <></>
            )}
          </>
          {/* VIDEO YOUTUBE EMBED */}
          {json && json.data.attributes.Youtube && json.data.attributes.Youtube.trim() !== '' ? (
            <>
            <div className="my-10 mx-auto">
          <div className="w-full h-0 pb-[56.25%] relative">
              <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${json.data.attributes.Youtube.includes('watch?v=') ? json.data.attributes.Youtube.split('watch?v=')[1] : json.data.attributes.Youtube.split('be/')[1]}`}
            title="YouTube video player"
            frameBorder="0"
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
    } catch (error) {
      console.error(error);
      notFound();
    }
  }
}