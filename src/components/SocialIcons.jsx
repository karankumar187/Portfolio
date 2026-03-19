import {
    FaGithub,
    FaLinkedinIn,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";

const SocialIcons = () => {
    useEffect(() => {
        const social = document.getElementById("social");
        if (!social) return;

        const icons = [];
        social.querySelectorAll("span").forEach((elem) => {
            const link = elem.querySelector("a");
            if (!link) return;
            const rect = elem.getBoundingClientRect();
            icons.push({
                link,
                rect,
                mouseX: rect.width / 2,
                mouseY: rect.height / 2,
                currentX: 0,
                currentY: 0,
            });
        });

        const onMouseMove = (e) => {
            for (const icon of icons) {
                const x = e.clientX - icon.rect.left;
                const y = e.clientY - icon.rect.top;
                if (x < 40 && x > 10 && y < 40 && y > 5) {
                    icon.mouseX = x;
                    icon.mouseY = y;
                } else {
                    icon.mouseX = icon.rect.width / 2;
                    icon.mouseY = icon.rect.height / 2;
                }
            }
        };
        document.addEventListener("mousemove", onMouseMove);

        let rafId;
        const updateAll = () => {
            for (const icon of icons) {
                icon.currentX += (icon.mouseX - icon.currentX) * 0.1;
                icon.currentY += (icon.mouseY - icon.currentY) * 0.1;
                icon.link.style.setProperty("--siLeft", `${icon.currentX}px`);
                icon.link.style.setProperty("--siTop", `${icon.currentY}px`);
            }
            rafId = requestAnimationFrame(updateAll);
        };
        rafId = requestAnimationFrame(updateAll);

        return () => {
            cancelAnimationFrame(rafId);
            document.removeEventListener("mousemove", onMouseMove);
        };
    }, []);

    return (
        <div className="icons-section">
            <div className="social-icons" data-cursor="icons" id="social">
                <span>
                    <a href="https://github.com/karankumar187" target="_blank">
                        <FaGithub />
                    </a>
                </span>
                <span>
                    <a href="https://www.linkedin.com/in/karankr187/" target="_blank">
                        <FaLinkedinIn />
                    </a>
                </span>
            </div>
            <a className="resume-button" href="https://drive.google.com/file/d/1NJeDWhR8hxxTZ9oV6eDxMvCsg8oPcMrB/view?usp=sharing" target="_blank" data-cursor="disable">
                <HoverLinks text="RESUME" />
                <span>
                    <TbNotes />
                </span>
            </a>
        </div>
    );
};

export default SocialIcons;
