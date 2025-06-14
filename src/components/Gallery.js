import React, { useState } from 'react';
import TestPic from '../assets/frankfurt.png'
import '../style/Gallery.css'

function Item({item}) {
    return(
        <div id="item">
            <h1>{item.title}</h1>
            <p>{item.desc}</p>
            <img src={item.img}/>
        </div>
    )
}

function Gallery(props) {
    const items = [
        {
            title: "title1",
            desc: "desc1",
            img: TestPic
        },
        {
            title: "title2",
            desc: "desc2",
            img: TestPic
        },
        {
            title: "title3",
            desc: "desc3",
            img: TestPic
        }
    ]

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
            <div id="gallery-content" style={contentStyle}>
                {items.map((item, index) => (
                    <div key={index}>
                        <Item item={item}/>
                    </div>
                ))}
            </div>
            <button onClick={onBack}>back</button>
            <button onClick={onNext}>next</button>
        </div>
    );
}
export default Gallery