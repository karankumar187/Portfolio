import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdArrowForward } from "react-icons/md";
import { HiOutlineAcademicCap } from "react-icons/hi";
import "./styles/Certificates.css";

gsap.registerPlugin(ScrollTrigger);

const certificates = [
    {
        title: "Fundamentals of Network Communication",
        issuer: "Coursera – University of Colorado System",
        date: "2025",
        link: "https://coursera.org/share/25a6b66eacae498614343aea78375f53",
    },
    {
        title: "The Bits and Bytes of Computer Networking",
        issuer: "Coursera – Google",
        date: "2025",
        link: "https://coursera.org/share/16a1eb7538ae94a6c5774e5a0aeb7267",
    },
    {
        title: "The Complete 2024 Web Development Bootcamp",
        issuer: "Udemy",
        date: "2025",
        link: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-557ed525-1675-4475-8e42-9aae1ef62e31.pdf",
    },
];

const Certificates = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading animation
            gsap.from(headingRef.current, {
                y: 80,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });

            // Staggered card animations
            cardsRef.current.forEach((card, i) => {
                if (!card) return;
                gsap.from(card, {
                    y: 60,
                    opacity: 0,
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        toggleActions: "play none none none",
                    },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="certificates-section" ref={sectionRef}>
            <div className="certificates-container section-container">
                <h2 ref={headingRef}>
                    My <span>Certificates</span>
                </h2>

                <div className="certificates-grid">
                    {certificates.map((cert, index) => (
                        <div
                            className="certificate-card"
                            key={index}
                            ref={(el) => (cardsRef.current[index] = el)}
                        >
                            <div className="cert-icon">
                                <HiOutlineAcademicCap />
                            </div>
                            <h4 className="cert-title">{cert.title}</h4>
                            <p className="cert-issuer">{cert.issuer}</p>
                            <p className="cert-date">{cert.date}</p>
                            {cert.link && (
                                <a
                                    href={cert.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cert-link"
                                    data-cursor="disable"
                                >
                                    View Credential <MdArrowForward />
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Certificates;
