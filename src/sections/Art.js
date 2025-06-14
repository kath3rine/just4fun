import React, { useState } from 'react';
import '../style/Art.css'
import Face from "../assets/art/face.jpg";
import Fruit from "../assets/art/fruit.png";
import Panda from "../assets/art/panda.png";
import Visualizer from "../assets/art/visualizer.png";

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

function Gallery({title, items}) {
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
            <h1>{title}</h1>
            
            <button onClick={onBack}>back</button>
            <button onClick={onNext}>next</button>
            <div id="gallery-content" style={contentStyle}>
                {items.map((item, index) => (
                    <div key={index}>
                        <Item item={item}/>
                    </div>
                ))}
            </div>
            
        </div>
    );
}

function Art() {
    const traditional = [
        {
            date: "2020",
            med: "colored pencil",
            img: Face
        },
        {
            date: "2020",
            med: "watercolor",
            img: Fruit
        },
        {
            date: "2021",
            med: "acrylic",
            img: Panda
        }
    ]

    const digital = [
        {
            date: "2020",
            med: "colored pencil",
            img: Visualizer,
            link: "https://drive.google.com/file/d/1BjeBTGx6p-eLK-zijbGXJCG2KZDsEStR/view?usp=sharing"
        }
    ]

    return (
        <div id="art">
            <Gallery id="traditional-art" 
            items={traditional}
            title="traditional art"/>

            <Gallery id="digital-art" 
            items={digital}
            title="digital art"/>
        </div>
    );
}
export default Art