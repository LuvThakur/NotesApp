import React, { useContext } from 'react'
import NoteContext from '../ContexAPis/Notes/NoteContext';

function NotesItem(props) {

    const contexdata = useContext(NoteContext);
    const { deletenote } = contexdata;
    const { propsnotes, updatedNotefun } = props;


    const handledelete = () => {
        deletenote(propsnotes._id);
        props.aboutalert("Successfully Deleted", "warning");

    }
    return (
        <div className='col-md-4'>
            <div className="card  my-3">
                <div className="card-body">
                    <div className='d-flex align-items-baseline justify-content-xl-center'>
                        <h5 className="card-title">{propsnotes.title}</h5>

                        <i className="fa-solid fa-trash-can mx-2 " onClick={handledelete}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={updatedNotefun} ></i>
                    </div>
                    <p className="card-text">{propsnotes.description}</p>

                </div>
            </div>

        </div >
    )
}

export default NotesItem