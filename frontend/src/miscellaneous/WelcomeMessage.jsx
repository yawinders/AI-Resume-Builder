import React, { useState, useEffect } from "react";

const WelcomeMessage = () => {
    const text = "👉🏿Welcome To AI Resume Builder\nBuild your resume using AI 🤖";
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[index]);
                setIndex(index + 1);
            }, 100);
            return () => clearTimeout(timeout);
        }
    }, [index, text]);

    return (
        <div className="text-xl font-bold whitespace-pre-line text-center">
            {displayedText}
            <span className="blink">|</span>
        </div>
    );
};

export default WelcomeMessage;
