import { getArticle, getArticleSlugs, getLatestArticles } from "@/app/lib/allDataArticles";
import Image from "next/image";
import defaultImage from '../../../../public/luxury-office.webp';
import { Metadata } from 'next';
import { notFound } from 'next/navigation'
import { TfiLayoutMediaRightAlt } from "react-icons/tfi";


// TypeScript Interfaces
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
  ArticleData
} from "../../types/articleTypes";
import Link from "next/link";
import { Suspense } from "react";
import { Card } from "@/app/components/UI/AllCards";
import { CardSkeleton } from "@/app/components/UI/skeletons";

export async function generateStaticParams() {
  
  const slugs = await getArticleSlugs();
  const slugArray = Array.from(slugs) as string[];
  console.log("Generated static params:", slugArray);

  return slugArray.map((slug): { slug: string } => ({
    slug,
  }));
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  try {
    const articleSlug = params.slug;
    const json = await getArticle(articleSlug, true);
    const article = json?.data;

    if (!article) {
      return { notFound: true };
    }

    return {
      props: { article },
      revalidate: 600,
    };
  } catch (error) {
    console.error("Failed to fetch article:", error);
    return { notFound: true };
  }
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
    description: `Read more about: ${article.title}`,
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

  const latestArticles = await getLatestArticles();
  const latestArticlesArr = await latestArticles;

  if (!article) {
    notFound();
    return null;
  }

    return (
      <div className="mx-auto mt-4 md:mt-12 max-w-5xl">
        <div className="md:min-h-[60vh]">
          <div className="flex flex-col md:flex-row md:justify-between mb-5">
            <span className="font-semibold">
              Posted: {new Date(article.createdAt).toLocaleDateString("en-UK")}
            </span>
            <span className="font-semibold">
              Updated: {new Date(article.updatedAt).toLocaleDateString("en-UK")}
            </span>
          </div>

          <div className="flex w-100">
            <h1 className="text-3xl mb-5 md:text-4xl lg:text-6xl font-bold">{article.title}</h1>
          </div>
          {/* HERO banner */}
          {json && json.data.hero ? (
            <div key={(json.data.hero as MediaData)?.id} className="mb-5 md:mb-10 overflow-hidden">
              <div className="w-full">
                <Image
                  src={(json.data.hero as MediaData).url}
                  alt={(json.data.hero as MediaData).name || "API Image"}
                  width={1200}
                  height={675}
                  className="hidden md:block w-full h-full object-cover aspect-video"
                  priority={true}
                  placeholder="empty"
                />
                <Image
                  src={(json.data.hero as MediaData).formats.small?.url || defaultImage}
                  alt={(json.data.hero as MediaData).name || "API Image"}
                  width={1200}
                  height={675}
                  className="block md:hidden w-full h-full object-cover aspect-video"
                  priority={true}
                  placeholder="empty"
                />
              </div>
          </div>
          ) 
          : (<></>)
          }
          
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
            {/* IMAGES "media" */}
            {/* If there is data, and if the media items resource type is image... truth check then render */}
            {json.data.media ? (
              <>
                <div className="w-full md:w-1/2 overflow-hidden my-10 mx-auto">
                  <div className="flex space-x-2 md:space-x-10">
                  {/* If data.media is an array, map multiple mediaItems */}
                    {Array.isArray(json.data.media) ? json.data.media.map((mediaItem: MediaData) => (
                      <div key={mediaItem.id} className="mb-5 md:mb-0 overflow-hidden">
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
                      <div key={(json.data.media as MediaData).id} className="mb-5 md:mb-0 overflow-hidden">
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
          </div>

          {/* VIDEO MP4 */}
          
          {json && json.data.video && json.data.video.length > 0 && (
            <div>
              <h1 className="text-5xl font-bold">{`${json.data.video[0].caption ? json.data.video[0].caption: 'Video'}`}</h1>
              {Array.isArray(json.data.video) && json.data.video.map((videoItem: any, index: number) => (
                <div key={index} className="w-full my-10 mx-auto">
                  <div className="video-container">
                    <video
                      width="100%"
                      height="auto"
                      controls
                      poster={videoItem.previewUrl || undefined}
                    >
                      <source src={videoItem.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              ))}
            </div>
          )}
            

          {/* YOUTUBE EMBED */}
          {json && json.data.youtube && json.data.youtube.trim() !== '' ? (
              <div className="my-10 mx-auto overflow-hidden">
                <div className="w-full h-0 pb-[56.25%] relative">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${json.data.youtube.includes('watch?v=') ? json.data.youtube.split('watch?v=')[1] : json.data.youtube.split('be/')[1]}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            ) : (
              <></>
            )}

          {latestArticlesArr.length > 0 ? (
            <>
              <Link href="/articles" className="group text-2xl font-bold my-2 md:my-4 transition-all duration-300 underline underline-offset-2 md:hover:underline-offset-8 inline-flex flex-row items-center">Latest Articles<TfiLayoutMediaRightAlt className="transition-all duration-400 ml-4 group-hover:md:scale-125 group-hover:md:ml-5"/></Link>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
                {latestArticlesArr.map((articleItem: ArticleData ) => (
                  
                  <Suspense key={articleItem.id} fallback={<CardSkeleton/>}>
                    <Card key={articleItem.id} article={articleItem} />
                  </Suspense>
                
                ))}
              </div>
            </>
          ) : (
            <></>
          )}          
        </div>
      </div>
    );
  }

