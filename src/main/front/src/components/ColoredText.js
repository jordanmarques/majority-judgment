import React from 'react';

const ColoredText = ({text}) => {

    const renderName = (name) => {
        return name.trim().split("").map((char, i) => <span key={i}>{char}</span>)
    };

    return (
        <span className="animation anim-text-flow">
            {renderName(text)}
        </span>
    )
};

export default ColoredText;
