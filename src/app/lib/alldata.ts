// API FUNCTIONS
import { API_URL, NEXT_URL } from "../../../config";
import QueryString from "qs";


// Queried articles
interface QueryParams {
 term: string
}
export async function getFilteredArticles({ query }: { query: QueryParams }) {
 const { term } = query;

 const thisQuery = QueryString.stringify(
   {
     filters: {
       $or: [
         {
           title: {
             $contains: term,
           },
         },
         {
           description: {
             $contains: term,
           },
         },
         {
           associatedUsername: {
             $contains: term,
           },
         },
       ],
     },
   },
   {
     encodeValuesOnly: true,
   }
 );

 const res = await fetch(`${API_URL}/articles?${thisQuery}&populate=*`);
 const data = await res.json();

 // console.log(data);

 if (data.data.length === 0) {
   console.log('No articles found')
   return 
 }

 return data;
}

// latest articles
export async function getLatestArticles() {
 const res = await fetch(`${API_URL}/articles?populate=*&pagination[limit]=5&sort[0]=createdAt:desc
 `, {cache: 'no-store' }
 )

 if(!res.ok) {
   throw new Error('Failed to fetch data')
 }

 const json = await res.json()
 
 return json.data
}

// all articles (paginated)
export async function getArticles({ page }: { page?: number | undefined }) {
 const pageNumber = page !== undefined ? page : '1'; // Use page value if provided, otherwise default to 1

 const res = await fetch(
   `${API_URL}/articles/?pagination[page]=${pageNumber}&pagination[pageSize]=9&sort[0]=createdAt:desc&[populate]=*`,
   { cache: 'no-store' }
 );

 if (!res.ok) {
   throw new Error('Failed to fetch data');
 }

 const data = await res.json();

 return data;
}

// single article
export async function getArticle(id: string, revalidate = false) {
 // const baseURL =
 //   process.env.NODE_ENV === "development"
 //     ? `${NEXT_URL}`
 //     : "https://your-live-website.com";

 // if (revalidate) {
 //   await fetch(`${baseURL}/api/article/revalidateArticle`, {
 //     method: "POST",
 //   });
 // }

  const res = await fetch(`${API_URL}/articles/${id}?[populate]=*`, { 
    headers: {
      'Next-Cache-Tags': 'article'
    },
    next: { tags: ['article'] },
    cache: 'no-store' 
  });

  if (!res.ok) {
    console.log('Failed to fetch article. Status:', res.status);
    return null;
  }

  const json = await res.json();

  if (!json || !json.data) {
    console.log('No data in response:', json);
    return null;
  }
  console.log(json)
  return json;
  
}

// user articles - limited  (in LargeCard)
export async function getLimitedUserArticles(id: string) {
 try {
   
   const response = await fetch(`${API_URL}/articles?&pagination[limit]=6&filters[associatedUser][$eq]=${id}&sort[0]=createdAt:desc&[populate]=*`, {
     method: 'GET',
     headers: {
       'Content-Type': 'application/json',
     },
     cache: 'no-store', 
   });

   if (!response.ok) {
     throw new Error('Failed to fetch articles');
   }

   const data = await response.json();
   return data;
 } catch (error) {
 
   console.error('Error fetching articles:', error);
   throw error; 
 }
}

export async function getAllUserArticles(id: string, { page }: { page?: number | undefined }) {
 const pageNumber = page !== undefined ? page : '1'; // Use page value if provided, otherwise default to 1

 const res = await fetch(
   `${API_URL}/articles/?pagination[page]=${pageNumber}&pagination[pageSize]=4&filters[associatedUser][$eq]=${id}&sort[0]=createdAt:desc&[populate]=*`, {
     method: 'GET',
     headers: {
       'Content-Type': 'application/json',
     },
     cache: 'no-store', 
   });

 if (!res.ok) {
   throw new Error('Failed to fetch data');
 }

 const data = await res.json();

 return data;
}
