'use client'

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxSectionProps {
    children: React.ReactNode;
    backgroundImage?: string;
    className?: string;
    speed?: number; // 0 to 1
}

export function ParallaxSection({
    children,
    backgroundImage,
    className = "",
    speed = 0.5
}: ParallaxSectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Balanced range to prevent gaps at top or bottom
    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"])

    return (
        <section
            ref={ref}
            className={cn("relative w-full overflow-hidden flex items-center justify-center p-0", className)} // Ensure no default padding interferes
        >
            {backgroundImage && (
                <motion.div
                    style={{ y }}
                    className="absolute inset-0 z-0 h-[140%] -top-[20%]" // Centered excess height
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center h-full"
                        style={{ backgroundImage: `url(${backgroundImage})` }}
                    />
                    {/* Overlay for readability */}
                    <div className="absolute inset-0 bg-black/40" />
                </motion.div>
            )}

            <div className="relative z-10 w-full">
                {children}
            </div>
        </section>
    );
}
