import { getArticle } from "@/app/lib/alldata";
import Image from "next/image";
import defaultImage from '../../../../public/luxury-office.webp';

// TypeScript Interfaces

interface TextNode {
  type: 'text';
  text: string;
  underline?: boolean;
  bold?: boolean;
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
    url: string;
    formats: {
      thumbnail?: ImageFormat;
      small?: ImageFormat;
      medium?: ImageFormat;
      large?: ImageFormat;
    };
  };
}

interface MediaAttributes {
  data: MediaData[];
}

interface ArticleAttributes {
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

export default async function Page({ params }: { params: { id: string } }) {

  const json: ArticleData = await getArticle(params.id, true);

  const article = json.data.attributes;

  console.log(article);

  return (
    <div className="container mx-auto px-4 mt-12">
      <div className="md:min-h-[60vh]">
        <div className="flex flex-col md:flex-row md:justify-between">

          <h1 className="text-2xl md:text-5xl font-bold">{article.title}</h1>

          <div className="md:space-x-2 flex flex-col md:flex-row md:items-center">
            <span className="font-bold">
              Posted: {new Date(article.createdAt).toLocaleDateString("en-UK")}
            </span>
            <span className="font-bold">
              Updated: {new Date(article.updatedAt).toLocaleDateString("en-UK")}
            </span>
          </div>
        </div>

        <div>
          {article.description.map((descItem, index) => {
            if (descItem.type === 'paragraph') {
              return (
                <p className="my-2" key={index}>
                  {descItem.children.map((child, childIndex) => {
                    if (child.type === 'text') {
                      return (
                        <span
                          key={childIndex}
                          style={{
                            textDecoration: child.underline ? 'underline' : 'none',
                            fontWeight: child.bold ? 'bold' : 'normal'
                          }}
                        >
                          {child.text}
                        </span>
                      );
                    } else if (child.type === 'link') {
                      return (
                        <a className="underline" target="_blank" key={childIndex} href={child.url}>
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
                  <ul className="list-disc ml-5" key={index}>
                    {descItem.children.map((listItem, listItemIndex) => (
                      <li key={listItemIndex}>
                        {listItem.children.map((listItemChild, listItemChildIndex) => {
                          if (listItemChild.type === 'text') {
                            return <span key={listItemChildIndex}>{listItemChild.text}</span>;
                          } else if (listItemChild.type === 'link') {
                            return (
                              <a className="underline" target="_blank" key={listItemChildIndex} href={listItemChild.url}>
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
                  <ol className="list-decimal ml-5" key={index}>
                    {descItem.children.map((listItem, listItemIndex) => (
                      <li key={listItemIndex}>
                        {listItem.children.map((listItemChild, listItemChildIndex) => {
                          if (listItemChild.type === 'text') {
                            return <span key={listItemChildIndex}>{listItemChild.text}</span>;
                          } else if (listItemChild.type === 'link') {
                            return (
                              <a className="underline" target="_blank" key={listItemChildIndex} href={listItemChild.url}>
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
          {json && json.data.attributes.media.data ? (
            <>
              <Image
                src={json.data.attributes.media.data[0].attributes.url}
                alt="API Image"
                width={1200}
                height={675}
                className="hidden md:block rounded-lg mt-5 md:w-full"
                priority={true}
                placeholder="empty"
              />
              <Image
                src={json.data.attributes.media.data[0].attributes.formats.small?.url || defaultImage}
                alt="API Image"
                width={1200}
                height={675}
                className="block md:hidden rounded-lg mt-5 md:w-full"
                priority={true}
                placeholder="empty"
              />
            </>
          ) : (
            <Image
              src={defaultImage}
              alt="Default Image"
              width={560}
              height={620}
              className="block rounded-lg mt-5 md:w-full"
              priority={true}
              placeholder="empty"
            />
          )}
        </div>
      </div>
    </div>
  );
}
