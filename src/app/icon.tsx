import { ImageResponse } from 'next/og';
import { getGlobalFavicon } from './lib/globalData';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default async function Icon() {
  try {
    const favicon = await getGlobalFavicon();

    if (!favicon) {
      // Fallback to default icon if favicon URL is not available
      return new ImageResponse(
        (
          <div
            style={{
              fontSize: 24,
              background: 'black',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
            }}
          >
            +
          </div>
        ),
        {
          ...size,
        }
      );
    }

    // Use the fetched favicon URL
    return new ImageResponse(
      (
        <img
          src={favicon}
          alt="Favicon"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      ),
      {
        ...size,
      }
    );
  } catch (error) {
    console.error('Error fetching favicon:', error);
    // Fallback to default icon in case of error
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 24,
            background: 'black',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
          }}
        >
          A
        </div>
      ),
      {
        ...size,
      }
    );
  }
}