'use client';

import { GiHealthNormal } from "react-icons/gi";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Cards() {
    // Create an array of refs
    const cardRefs = useRef<HTMLDivElement[]>([]);

    // Function to add refs to the array
    const addToRefs = (card: HTMLDivElement | null) => {
        if (card) {
            cardRefs.current.push(card);
        } 
    };

    useEffect(() => {
        // Create a GSAP timeline
        const timeline = gsap.timeline();

        // Add each card animation to the timeline
        cardRefs.current.forEach((card, index) => {
            timeline.to(card, { opacity: 1, duration: 1, scale: 1, delay: index * 0.1, ease: "expo" });
        });
    }, []);

    return (
        <div className="mt-10 md:mt-32">
            <h2 className="text-3xl md:text-5xl font-light tracking-wide mb-5 md:mb-10 md:max-w-screen-xl">
                Delivering professional private health care to Alderley, Bramhall, Wilmslow, and Knutsford.
            </h2>
            <div className="grid grid-rows-1 grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 w-full my-4">

                {/* When you set a ref callback on a React element (addToRefs), React automatically calls the callback
                 function with the DOM element as an argument when the element is rendered or updated: */}
                <div ref={addToRefs} className="opacity-0 scale-75 bg-zinc-900 p-5 text-white min-h-40 flex items-center justify-center">
                    <GiHealthNormal className="text-6xl" />
                </div>
                <div ref={addToRefs} className="opacity-0 scale-75 bg-zinc-900 p-5 text-white min-h-40 flex items-center justify-center">
                    <GiHealthNormal className="text-6xl" />
                </div>
                <div ref={addToRefs} className="opacity-0 scale-75 bg-zinc-900 p-5 text-white min-h-40 flex items-center justify-center">
                    <GiHealthNormal className="text-6xl" />
                </div>
            </div>
        </div>
    );
}
