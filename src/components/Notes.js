import { useState } from "react";
import '../style/Notes.css';

function Note({note}) {
    const [expand, setExpand] = useState(false);

    const toggle = () => {
        setExpand(!expand); // Toggle the state
      };

      return (
        <div id="note">
            <div id="note-header">
                <h3>{note.title}</h3>
                <button onClick={toggle}>
                    {expand ? '⬆️' : '⬇️'}
                </button>
            </div>
            {expand && ( 
                <div id="note-content">
                {note.items.map((item) => (
                    <li>{item}</li>
                ))}
                </div>
            )}
        </div>
      );
}

function Notes({notes}) {
    return(
        <div id="notes">
            {notes.map((note) => (
                <Note note={note}/>
            ))}
        </div>
    )
}
export default Notes