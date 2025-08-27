import { useState } from "react";

type NoteItemType = {
    header: number; 
    text: string; 
    list?: string[]
}

type NoteType = {
    title: string;
    items: []
}

function Note({note}: {note: NoteType}) {
    const [expand, setExpand] = useState(false);
    const toggle = () => {
        setExpand(!expand); 
    };

    return(
        <div>
            <div style={{
            width: "260px",
            filter: "drop-shadow(5px 10px 5px #bbb)",
            textWrap: "wrap",
            margin: "10px 20px 10px 0px"
        }}>
            <div className="s1" style={{ 
                padding: "10px 20px 0px 20px"
            }}>
                <h3 style={{ textAlign: "center"}}>
                    {note.title}
                </h3>
                <div style={{marginBottom: "20px"}}>
                    {expand && note.items && note.items.map((item : NoteItemType) => (
                    <div>
                        <p style={{fontWeight: "bold", }}>
                            {item.header}
                        </p>
                        <p>{item.text}</p>
                            {item.list && item.list.map((bullet: string) => (
                            <li style={{margin: "0px"}}>
                                {bullet}
                            </li>
                            ))}
                    </div>
                    ))}
                </div>
                <button style={{
                    height: "30px", 
                    width: "30px",
                    marginBottom: "10px"
                }}
                onClick={toggle}>
                    {expand ? '⬆️' : '⬇️'}
                </button>
            </div>
        </div>
        </div>
    )
}

function Notes({notes}: {notes: NoteType[]}) {
    return(
        <div style={{ marginTop: "20px", paddingTop: "20px" }}>
            <h2>thoughts</h2>
            <div style={{display: "flex", flexWrap: "wrap"}}>
            {notes.map((note) => (
                <Note note={note}/>
            ))}
            </div>
        </div>
    )
}
export default Notes