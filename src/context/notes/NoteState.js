import React, { useState } from "react";
import NoteContext from "./NoteContext";


const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);

    const getNotes = async () => {
        // API Call 
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4NzdhMmI0NGFlNmNkYzhlNmJmYTk3In0sImlhdCI6MTY4NjYwMDI1OX0.5q3XZuZwpypn75rYQ0tMG4WuZpnydbH597xjl3wPcvw"
            }
        });
        const json = await response.json()
        console.log(json)
        setNotes(json)
    }
    const addNote = async (title, description, tag) => {
        // TODO: API Call
        // API Call 
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4NzdhMmI0NGFlNmNkYzhlNmJmYTk3In0sImlhdCI6MTY4NjYwMDI1OX0.5q3XZuZwpypn75rYQ0tMG4WuZpnydbH597xjl3wPcvw"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note))
    }


    const deleteNote = async (id) => {
        // TODO: API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4NzdhMmI0NGFlNmNkYzhlNmJmYTk3In0sImlhdCI6MTY4NjYwMDI1OX0.5q3XZuZwpypn75rYQ0tMG4WuZpnydbH597xjl3wPcvw"
            },

        });
        const json = await response.json();
        console.log(json);
        // deleting from frontend
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes)
    }


    const editNote = async (id, title, description, tag) => {
        // API Call 
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4NzdhMmI0NGFlNmNkYzhlNmJmYTk3In0sImlhdCI6MTY4NjYwMDI1OX0.5q3XZuZwpypn75rYQ0tMG4WuZpnydbH597xjl3wPcvw"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json)

        // you cannot update state directly in react so you need to make new nots

        // Logic to edit in client
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )

}
export default NoteState