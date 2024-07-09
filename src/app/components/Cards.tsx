export default function Cards() {
    return (
        <div className="mt-10 md:mt-32">

            <h2 className="text-3xl md:text-5xl font-light tracking-wide mb-5 md:mb-10 md:max-w-screen-xl">Delivering professional private health care to Alderley, Bramhall, Wilmslow, and knutsford.</h2>

            <div className="grid grid-rows-1 grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 w-full my-4">
                <div className="bg-zinc-900 p-5 text-white min-h-40 flex items-center justify-center">
                    <span className="font-bold text-3xl">ITEM ONE</span>
                </div>
                <div className="bg-zinc-900 p-5 text-white min-h-40 flex items-center justify-center">
                    <span className="font-bold text-3xl">ITEM TWO</span>
                </div>
                <div className="bg-zinc-900 p-5 text-white min-h-40 flex items-center justify-center">
                    <span className="font-bold text-3xl">ITEM THREE</span>
                </div>
            </div>

        </div>
        
    );
}