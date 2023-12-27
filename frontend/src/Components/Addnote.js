import React, { useContext, useState } from 'react'
import NoteContext from '../ContexAPis/Notes/NoteContext';


const Addnote = (props) => {
    const contextdata = useContext(NoteContext);
    const { addnote } = contextdata;

    const [nott, setnott] = useState({ title: "", description: "", tag: "" })

    const handleclick = (e) => {
        e.preventDefault();
        addnote(nott.title, nott.description, nott.tag);
        setnott({ title: "", description: "", tag: "" })

        props.aboutalert("Successfully Added", "success");
    }

    const change = (e) => {
        setnott({ ...nott, [e.target.name]: e.target.value });
    }



    return (
        <div className='container my-5'>
            <h1 className='text-center'>
                Add Your Notes
            </h1>

            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Enter Title</label>
                    <input type="text" className="form-control" id="title" name='title' value={nott.title} aria-describedby="emailHelp" onChange={change} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Enter Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={nott.description} onChange={change} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Enter Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={nott.tag} onChange={change} />
                </div>
                <button disabled={nott.title.length < 3 || nott.description.length < 5} type="submit" className="btn btn-primary" onClick={handleclick} >ADD</button>
            </form >
        </div >

    )
}

export default Addnote