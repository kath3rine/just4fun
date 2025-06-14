import React, { useState } from 'react';
import "../style/Gallery.css"

function Item({item}) {
    return (
        <div id="item">
            <div className="container" id="img-container">
                <img src={item.img}/>
            </div>
            <div className="container" id="caption-container">
                <p>{item.date} | {item.med} {item.link ? <a href={item.link}>(link)</a> : ""}</p>
            </div>
            
        </div>
    )
}

function Gallery({items}) {
    const [idx, setIdx] = useState(0);

    const onBack = () => {
        setIdx((prev) => Math.max(prev - 1, 0));
    };

    const onNext = () => {
        setIdx((prev) => Math.min(prev + 1, items.length - 1));
    };

    const contentStyle = {
        transform: `translateX(-${idx * 100}%)`,
    };
    
    return(
        <div id="gallery">
            <button onClick={onBack}>back</button>
            <button onClick={onNext}>next</button>
            <div id="wrapper">
                <div id="gallery-content" style={contentStyle}>
                {items.map((item, index) => (
                    <div key={index}>
                        <Item item={item}/>
                    </div>
                ))}
            </div>
            </div>
        </div>
    );
}

export default Gallery