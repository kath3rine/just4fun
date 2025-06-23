import '../style/Lists.css'
import { useState } from 'react'

function List({list}) {
    const [isFlipped, setIsFlipped] = useState(false);
    const handleClick = () => {
        setIsFlipped(!isFlipped);
      };

    return(
        <div className="list">
            <div className={`list ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
            <div id="list-front">
                <h2 id="title">{list.title}</h2>
            </div>

            <div id="list-back">
                {list.items.map((item) => (
                    <li>{item}</li>
                ))}
            </div>
                
            </div>
        </div>
    )
}

function Lists({lists}) {
    return(
        <div id="lists">
            <h3>click on a note to read more</h3>
            <div id="notes">
            {lists.map((list) => (
                <List list={list}/>
            ))}
            </div>
        </div>
    )
}
export default Lists