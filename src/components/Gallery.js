import React, { useState } from 'react';
import "../style/Gallery.css"

function Page({page}) {
    return (
        <div id="page">
            <div id="item">
                <img src={page.img}/>
                <div id="item-info">
                    <p id="name">{page.name}</p>
                    <p id="info">
                        {page.date} {page.med} {page.link ? <a href={page.link}>(link)</a> : ""}
                    </p>
                    <p id="desc">{page.desc}</p>
                </div>
            </div>
        </div>
    )
}

function Gallery({pages, title, num, col}) {
    const [idx, setIdx] = useState(0);

    const onBack = () => {
        setIdx((prev) => Math.max(prev - 1, 0));
    };

    const onNext = () => {
        setIdx((prev) => Math.min(prev + 1, pages.length - 1));
    };

    const sliding = {
        transform: `translateX(-${idx * (100 / num)}%)`,
    };
    
    return(
        <div id="gallery" className={col}>
            <div id="header">
                <h2>{title}</h2>
                <div id="buttons">
                    <button onClick={onBack}>back</button>
                    <button onClick={onNext}>next</button>
                </div>
            </div>
            
            <div id="wrapper">
                <div id="gallery-content" style={sliding}>
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