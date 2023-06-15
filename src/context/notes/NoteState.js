import React, { useState } from "react";
import NoteContext from "./NoteContext";


const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "64885a8d33a799832471d5ca",
            "user": "64877a2b44ae6cdc8e6bfa97",
            "title": "Diet and exercise",
            "description": "Eat clean do exercise",
            "tag": "personal",
            "date": "2023-06-13T12:01:17.069Z",
            "__v": 0
        },
        {
            "_id": "648a0a808c92e35e7d317c69",
            "user": "64877a2b44ae6cdc8e6bfa97",
            "title": "Diet and exercise And Yoga",
            "description": "Eat clean do exercise and Yoga",
            "tag": "Public",
            "date": "2023-06-14T18:44:16.379Z",
            "__v": 0
        },
        {
            "_id": "648a0aa38c92e35e7d317c6b",
            "user": "64877a2b44ae6cdc8e6bfa97",
            "title": "Sport and meditation",
            "description": "Mental health is also important",
            "tag": "Public",
            "date": "2023-06-14T18:44:51.702Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(notesInitial);
    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;