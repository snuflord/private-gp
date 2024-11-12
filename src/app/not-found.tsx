import clsx from 'clsx';
import Link from 'next/link';

// Helper function to determine brightness
interface ColorBrightnessChecker {
  (hexColor: string): boolean;
}

const isColorBright: ColorBrightnessChecker = (hexColor) => {
  // Remove '#' if present
  const color = hexColor.replace('#', '');
  
  // Parse RGB values
  const r = parseInt(color.slice(0, 2), 16);
  const g = parseInt(color.slice(2, 4), 16);
  const b = parseInt(color.slice(4, 6), 16);
  
  // Calculate brightness (using luminance formula)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
  // Return true if brightness is higher than a threshold
  return brightness > 127; // Adjust threshold as needed
};

export default function Navigation() {
  const backgroundColor = '#000000'; // Tailwind blue-500 hex value

  return (

    <div className='w-full h-screen my-10 md:w-1/2 m-auto p-1 md:p-6 shadow-xl flex flex-col justify-center items-center'>
      
      <h2 className='font-bold text-2xl mb-3'>404 Not Found!</h2>
      <span className='flex space-x-2'><p>Could not find the requested page.</p></span>
      <Link
      href="/"
      className={clsx(
        'bg-blue-500 rounded-lg p-4 mt-4 transition font-bold md:hover:bg-blue-500/50 duration-300',
        isColorBright(backgroundColor) ? 'text-black' : 'text-white'
      )}
      >
        Return Home
      </Link>
    </div>
  );
}
