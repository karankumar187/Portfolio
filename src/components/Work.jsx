import { useState, useCallback, useEffect, useRef } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: "Deep Packet Inspector",
        category: "Network Security Tool",
        tools: "C++/Python, Socket Programming, TCP/IP, Packet Parsing",
        image: "/images/dpi-new.png",
        description: "Developed a Deep Packet Inspection system to monitor and interpret network-layer traffic, enabling accurate differentiation of TCP, UDP, and ICMP protocols. Augmented network security analysis by facilitating early detection of suspicious traffic patterns.",
        link: "https://github.com/karankumar187/Deep-Packet-Inspector",
    },
    {
        title: "Avanza – Daily Learning Tracker",
        category: "Full Stack Web Application",
        tools: "React.js, Node.js, Express.js, MongoDB, JWT, Tailwind CSS",
        image: "/images/avanza-new.png",
        description: "Engineered a full-stack Daily Learning Tracker to organize and streamline daily study activities, enabling structured logging of topics, time spent, and progress metrics with secure authentication and dynamic progress analytics.",
        link: "https://github.com/karankumar187/Avanza-Daily-Learning-Tracker",
        liveLink: "https://learnflow-daily-learning-tracker-1.onrender.com/",
    },
];

const Work = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const carouselRef = useRef(null);

    // GSAP scroll-triggered entrance animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading animation — slide up + fade in
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

            // Carousel wrapper animation — slide up + fade in with delay
            gsap.from(carouselRef.current, {
                y: 100,
                opacity: 0,
                duration: 1.2,
                delay: 0.3,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Animate slide content on index change
    useEffect(() => {
        const slide = document.querySelector(
            `.carousel-slide:nth-child(${currentIndex + 1})`
        );
        if (!slide) return;

        const info = slide.querySelector(".carousel-info");
        const image = slide.querySelector(".carousel-image-wrapper");

        if (info) {
            gsap.fromTo(
                info,
                { x: -40, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.7, ease: "power2.out", delay: 0.15 }
            );
        }
        if (image) {
            gsap.fromTo(
                image,
                { x: 40, opacity: 0, scale: 0.95 },
                { x: 0, opacity: 1, scale: 1, duration: 0.7, ease: "power2.out", delay: 0.25 }
            );
        }
    }, [currentIndex]);

    const goToSlide = useCallback(
        (index) => {
            if (isAnimating) return;
            setIsAnimating(true);
            setCurrentIndex(index);
            setTimeout(() => setIsAnimating(false), 700);
        },
        [isAnimating]
    );

    const goToPrev = useCallback(() => {
        const newIndex =
            currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
        goToSlide(newIndex);
    }, [currentIndex, goToSlide]);

    const goToNext = useCallback(() => {
        const newIndex =
            currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
        goToSlide(newIndex);
    }, [currentIndex, goToSlide]);

    return (
        <div className="work-section" id="work" ref={sectionRef}>
            <div className="work-container section-container">
                <h2 ref={headingRef}>
                    My <span>Projects</span>
                </h2>

                <div className="carousel-wrapper" ref={carouselRef}>
                    {/* Navigation Arrows */}
                    <button
                        className="carousel-arrow carousel-arrow-left"
                        onClick={goToPrev}
                        aria-label="Previous project"
                        data-cursor="disable"
                    >
                        <MdArrowBack />
                    </button>
                    <button
                        className="carousel-arrow carousel-arrow-right"
                        onClick={goToNext}
                        aria-label="Next project"
                        data-cursor="disable"
                    >
                        <MdArrowForward />
                    </button>

                    {/* Slides */}
                    <div className="carousel-track-container">
                        <div
                            className="carousel-track"
                            style={{
                                transform: `translateX(-${currentIndex * 100}%)`,
                            }}
                        >
                            {projects.map((project, index) => (
                                <div className="carousel-slide" key={index}>
                                    <div className="carousel-content">
                                        <div className="carousel-info">
                                            <div className="carousel-number">
                                                <h3>0{index + 1}</h3>
                                            </div>
                                            <div className="carousel-details">
                                                <h4>{project.title}</h4>
                                                <p className="carousel-category">
                                                    {project.category}
                                                </p>
                                                <div className="carousel-tools">
                                                    <span className="tools-label">Tools & Features</span>
                                                    <p>{project.tools}</p>
                                                </div>
                                                <div className="carousel-links" style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                                                    {project.link && (
                                                        <a href={project.link} target="_blank" data-cursor="disable" style={{ color: '#5eead4', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid #5eead4', padding: '6px 14px', borderRadius: '20px', transition: 'all 0.3s' }}>
                                                            GitHub <MdArrowForward />
                                                        </a>
                                                    )}
                                                    {project.liveLink && (
                                                        <a href={project.liveLink} target="_blank" data-cursor="disable" style={{ color: '#0a0e17', backgroundColor: '#5eead4', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 14px', borderRadius: '20px', fontWeight: '600', transition: 'all 0.3s' }}>
                                                            Live Demo <MdArrowForward />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="carousel-image-wrapper">
                                            <WorkImage image={project.image} alt={project.title} link={project.link} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dot Indicators */}
                    <div className="carousel-dots">
                        {projects.map((_, index) => (
                            <button
                                key={index}
                                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                                    }`}
                                onClick={() => goToSlide(index)}
                                aria-label={`Go to project ${index + 1}`}
                                data-cursor="disable"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Work;
