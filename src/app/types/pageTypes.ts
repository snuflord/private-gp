// TYPE DEFINITIONS FOR ARTICLE DATA

export interface ProviderMetadata {
    public_id: string;
    resource_type: string;
}
  
  // Defining the format for images with a shared interface
export interface ImageFormat {
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
export interface MediaData {
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
export  interface TextNode {
    type: 'text';
    text: string;
    underline?: boolean;
    bold?: boolean;
    italic?: boolean;
  }
  
  // Link node, which contains text nodes
export  interface LinkNode {
    type: 'link';
    url: string;
    children: TextNode[];
  }
  
  // Paragraph node can contain text or links
export  interface ParagraphNode {
    type: 'paragraph';
    children: (TextNode | LinkNode)[];
  }
  
  // List node for ordered or unordered lists
export  interface ListNode {
    type: 'list';
    format: 'unordered' | 'ordered';
    children: ListItemNode[];
  }
  
  // Individual list items
 export interface ListItemNode {
    type: 'list-item';
    children: (TextNode | LinkNode)[];
  }
  
  // DescriptionNode can either be a paragraph or a list
export  type DescriptionNode = ParagraphNode | ListNode;
  
  // Main ArticleData interface
export  interface ArticleData {
    Youtube: string | null;
    id: number;
    Title: string;
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