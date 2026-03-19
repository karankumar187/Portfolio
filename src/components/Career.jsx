import "./styles/Career.css";

const Career = () => {
    return (
        <div className="career-section section-container">
            <div className="career-container">
                <h2>
                    My Education <span>&</span>
                    <br /> Journey
                </h2>
                <div className="career-info">
                    <div className="career-timeline">
                        <div className="career-dot"></div>
                    </div>
                    <div className="career-info-box">
                        <div className="career-info-in">
                            <div className="career-role">
                                <h4>B.Tech – Computer Science & Engineering</h4>
                                <h5>Lovely Professional University, Phagwara, Punjab</h5>
                            </div>
                            <h3>2027</h3>
                        </div>
                        <p>
                            Pursuing Bachelor of Technology in Computer Science and Engineering
                            with a CGPA of 7.94. Building a strong foundation in full-stack
                            development, data structures, algorithms, and software engineering.
                        </p>
                    </div>
                    <div className="career-info-box">
                        <div className="career-info-in">
                            <div className="career-role">
                                <h4>Intermediate (12th)</h4>
                                <h5>D.A.V. Sr. Sec. Public School, Singrauli, MP</h5>
                            </div>
                            <h3>2023</h3>
                        </div>
                        <p>
                            Completed Intermediate education with 77.8% marks.
                            Developed strong analytical and problem-solving skills.
                        </p>
                    </div>
                    <div className="career-info-box">
                        <div className="career-info-in">
                            <div className="career-role">
                                <h4>Matriculation (10th)</h4>
                                <h5>D.A.V. Sr. Sec. Public School, Singrauli, MP</h5>
                            </div>
                            <h3>2021</h3>
                        </div>
                        <p>
                            Completed Matriculation with 87.6% marks.
                            Strong academic foundation with excellence in mathematics and science.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Career;
