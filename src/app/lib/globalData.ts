import { API_URL } from "../../../config";

export async function getGlobalData() {
  const res = await fetch(`${API_URL}/global?[populate]=*`);
  if (!res.ok) {
    throw new Error('Failed to fetch global data');
  }

  const data = await res.json();

  if (!data) {
    console.log('No global data found or invalid response structure:', data);
    return null;
  }

  return data;
}

// In-memory cache
let logoCache: { url: string | null, timestamp: number } | null = null;
const CACHE_DURATION = 60 * 60 * 1000; // Cache duration in milliseconds (e.g., 1 hour)

export async function getGlobalLogo() {
  const now = Date.now();

  // Check if the cache is valid
  if (logoCache && (now - logoCache.timestamp < CACHE_DURATION)) {
    // console.log('Using cached logo URL:', logoCache.url);
    return logoCache.url;
  }
  // Fetch the logo from the API
//   console.log('Fetching logo URL from API');
  const res = await fetch(`${API_URL}/global?populate=logo&fields[0]=id`);
  if (!res.ok) {
    throw new Error('Failed to fetch global data');
  }
  const data = await res.json();

  if (!data) {
    console.log('No global data found or invalid response structure:', data);
    return null;
  }

  const logoUrl = data?.data?.logo?.url || null;

  // Update the cache
  logoCache = { url: logoUrl, timestamp: now };
//   console.log('Updating cache with new logo URL:', logoUrl);

  return logoUrl;
}

export async function getGlobalFavicon() {
  const res = await fetch(`${API_URL}/global?populate=favicon&fields[0]=id`);
  if (!res.ok) {
    throw new Error('Failed to fetch global data');
  }

  const data = await res.json();

  if (!data) {
    console.log('No global data found or invalid response structure:', data);
    return null;
  }

  return data?.data?.favicon?.url || null;
}