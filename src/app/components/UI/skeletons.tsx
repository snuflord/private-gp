// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

  export function CardSkeleton() {
    return (
      <div className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-200 shadow-sm min-h-32 opacity-20`}>
        <div className="bg-gray-300 rounded-lg p-4 h-full flex items-center justify-center">
            <span className="font-bold text-black">Media Loading</span>
        </div>
      </div>
    );
  }