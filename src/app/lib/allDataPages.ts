import { API_URL } from "../../../config";
import QueryString from "qs";

export async function getPagesNames() {
  
    const res = await fetch(`${API_URL}/pages?fields[0]=Title&fields[1]=slug&fields[2]=documentId`);
  
    if (!res.ok) {
      throw new Error('Failed to fetch page data');
    }
  
    const data = await res.json();

    if (!data || !data.data) {
      console.log('No pages found or invalid response structure:', data);
      return null;
    }
  
    return data;
}

export async function getPagesSlugs() {
  
    const res = await fetch(`${API_URL}/pages?fields[0]=slug`);
  
    if (!res.ok) {
      throw new Error('Failed to fetch page data');
    }
  
    const data = await res.json();

    if (!data || !data.data) {
      console.log('No pages found or invalid response structure:', data);
      return null;
    }
  
    return data;
}

// all pages
export async function getPages() {
  
    const res = await fetch(`${API_URL}/pages/?[populate]=*`);
  
    if (!res.ok) {
      throw new Error('Failed to fetch page data');
    }
  
    const data = await res.json();

    if (!data || !data.data) {
      console.log('No pages found or invalid response structure:', data);
      return null;
    }
  
    return data;
}

// single page
export async function getPage(slug: string, revalidate = false) {
    console.log(`ID: ${slug} passed ass prop on request`)
    console.log(API_URL);
    const res = await fetch(`${API_URL}/pages/${slug}?[populate]=*`, {
      headers: {
        'Next-Cache-Tags': 'article'
      },
      next: { tags: ['pages'] },
    //   cache: 'no-store'
    });
  
    if (!res.ok) {
      console.log('Failed to fetch page. Status:', res.status);
      return null;
    }
  
    const data = await res.json();
    
    if (!data || !data.data) {
      console.log('No data in response:', data);
      return null;
    }
  
    return data;
  }