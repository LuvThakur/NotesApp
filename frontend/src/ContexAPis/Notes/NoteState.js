import NoteContext from './NoteContext'

import { useState } from 'react'


export default function NoteState(props) {

    const host = process.env.REACT_APP_API_HOST

    const notesset = []

    const [notes, setnotes] = useState(notesset);



    // get all notes function

    const getnotes = async () => {

        const response = await fetch(`${host}/api/notes/fetchallnotes`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('auth-token')
                }
            }
        );

        const data = await response.json();
        console.log(data)
        setnotes(data);
    }




    // addnotes
    const addnote = async (title, description, tag) => {
        //   api call to add an note

        try {

            const response = await fetch(`${host}/api/notes/addnotes`,
                {
                    method: "POST", // *GET, POST, PUT, DELETE, etc.

                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem('auth-token')

                    },
                    body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
                }
            );

            if (response.ok) {

                const newNote = await response.json();

                setnotes([...notes, newNote]);
            }
            else {
                console.log("Failed to add note");
            }
        }
        catch (error) {
            console.log(error.message);
        }

    }

    // deletenote

    const deletenote = async (noteid) => {
        //   api call to de
        try {

            const response = await fetch(`${host}/api/notes/deletenote/${noteid}`,
                {
                    method: "DELETE", // *GET, POST, PUT, DELETE, etc.

                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem('auth-token')

                    }
                }
            );

            // const json = await response.json();
            // console.log(json);

            // console.log("deleted id is " + noteid);

            if (response.ok) {
                const updatenote = notes.filter((note) => { return note._id !== noteid })
                setnotes(updatenote);
            } else {
                console.log("Internal Error");
            }
        }
        catch (error) {
            console.log(error.message);
        }
    }

    // editnote 
    const editnote = async (noteid, title, description, tag) => {

        // api call to fetch data

        try {
            const response = await fetch(`${host}/api/notes/updatenote/${noteid}`,
                {
                    method: "PUT", // *GET, POST, PUT, DELETE, etc.

                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem('auth-token')

                    },
                    body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update");
            }
            // Api call Success  update state

            const updatedNotes = notes.map((note) => {
                if (note._id === noteid) {

                    // validation
                    const updatitle = title.length >= 3 ? title : note.title;
                    const updtdescription = description.length >= 5 ? description : note.description;

                    return {
                        ...note,
                        title: updatitle,
                        description: updtdescription,
                        tag,
                    };
                }
                return note;
            });
            setnotes(updatedNotes);
        }
        catch (error) {
            console.error('Error updating note:', error.message);
        }
    };


    return (
        <NoteContext.Provider value={{ notes, setnotes, addnote, deletenote, editnote, getnotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}
