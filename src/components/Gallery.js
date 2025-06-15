import React, { useState } from 'react';
import "../style/Gallery.css"

function Page({page}) {
    return (
        <div id="page">
            {page.map((item) => (
                <div id="item">
                    <img src={item.img}/>
                    <div id="item-info">
                        <p id="name">{item.name}</p>
                        <p id="info">
                            {item.date} | {item.med} {item.link ? <a href={item.link}>(link)</a> : ""}
                        </p>
                        <p id="desc">{item.desc}</p>
                    </div>
                    
                </div>
            ))}
        </div>
    )
}

function Gallery({pages, title}) {
    const [idx, setIdx] = useState(0);

    const onBack = () => {
        setIdx((prev) => Math.max(prev - 1, 0));
    };

    const onNext = () => {
        setIdx((prev) => Math.min(prev + 1, pages.length - 1));
    };

    const contentStyle = {
        transform: `translateX(-${idx * 100}%)`,
    };
    
    return(
        <div id="gallery">
            <div id="header">
                <h2>{title}</h2>
                <div id="buttons">
                    <button onClick={onBack}>back</button>
                    <button onClick={onNext}>next</button>
                </div>
            </div>
            
            <div id="wrapper">
                <div id="gallery-content" style={contentStyle}>
                {pages.map((page, index) => (
                    <div key={index}>
                        <Page page={page}/>
                    </div>
                ))}
            </div>
            </div>
        </div>
    );
}

export default Gallery