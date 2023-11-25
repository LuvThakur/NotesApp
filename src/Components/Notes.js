import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../ContexAPis/Notes/NoteContext';
import NotesItem from './NotesItem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';


function Notes(props) {

    const inputRef = useRef(null);
    const closereff = useRef(null);

    let navigate = useNavigate();

    const contextdata = useContext(NoteContext);
    // destructuring of contextdata
    const { notes, getnotes, editnote } = contextdata;

    useEffect(() => {

        if (localStorage.getItem('auth-token')) {
            getnotes();
        }
        else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [1])

    const [nott, setnott] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const updatedNotefun = (currentNote) => {

        inputRef.current.click();
        setnott({ id: currentNote._id, etitle: currentNote.title || "", edescription: currentNote.description || "", etag: currentNote.tag || "" });
    }



    const handleclick = (e) => {

        editnote(nott.id, nott.etitle, nott.edescription, nott.etag);
        closereff.current.click();
        props.aboutalert("Successfully Updated", "success");

    }

    const change = (e) => {
        setnott({ ...nott, [e.target.name]: e.target.value });
    }


    return (

        <div className='row my-3'>

            <Addnote aboutalert={props.aboutalert} />
            {/* modal are use for display an update notes */}
            <button type="button" ref={inputRef} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-etitle" id="exampleModalLabel">Update Notes</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">


                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Enter title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={nott.etitle} aria-describedby="emailHelp" onChange={change} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Enter Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={nott.edescription} onChange={change} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Enter etag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={nott.etag} onChange={change} />
                                </div>
                            </form >

                        </div>
                        <div className="modal-footer">
                            <button ref={closereff} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={nott.etitle.length < 3 || nott.edescription.length < 5} onClick={handleclick} type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>


            <h2> Your Notes</h2>
            {
                notes.map((notes, key) => {
                    return <NotesItem key={notes._id} updatedNotefun={() => updatedNotefun(notes)} propsnotes={notes} aboutalert={props.aboutalert} />;
                })
            }
        </div>
    )
}



export default Notes