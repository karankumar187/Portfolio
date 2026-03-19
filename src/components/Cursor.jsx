import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
    const cursorRef = useRef(null);
    useEffect(() => {
        let hover = false;
        const cursor = cursorRef.current;
        if (!cursor) return;

        const mousePos = { x: 0, y: 0 };
        const cursorPos = { x: 0, y: 0 };

        // Use quickSetter for high-perf updates instead of creating new tweens each frame
        const setX = gsap.quickSetter(cursor, "x", "px");
        const setY = gsap.quickSetter(cursor, "y", "px");

        document.addEventListener("mousemove", (e) => {
            mousePos.x = e.clientX;
            mousePos.y = e.clientY;
        });

        requestAnimationFrame(function loop() {
            if (!hover) {
                const speed = 4; // lower = more responsive (was 6)
                cursorPos.x += (mousePos.x - cursorPos.x) / speed;
                cursorPos.y += (mousePos.y - cursorPos.y) / speed;
                setX(cursorPos.x);
                setY(cursorPos.y);
            }
            requestAnimationFrame(loop);
        });

        document.querySelectorAll("[data-cursor]").forEach((item) => {
            const element = item;
            element.addEventListener("mouseover", (e) => {
                const target = e.currentTarget;
                const rect = target.getBoundingClientRect();

                if (element.dataset.cursor === "icons") {
                    cursor.classList.add("cursor-icons");
                    gsap.to(cursor, { x: rect.left, y: rect.top, duration: 0.1 });
                    cursor.style.setProperty("--cursorH", `${rect.height}px`);
                    hover = true;
                }
                if (element.dataset.cursor === "disable") {
                    cursor.classList.add("cursor-disable");
                }
            });
            element.addEventListener("mouseout", () => {
                cursor.classList.remove("cursor-disable", "cursor-icons");
                hover = false;
            });
        });
    }, []);

    return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
