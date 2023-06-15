import React from 'react'

const NoteItem = (props) => {
    const { note } = props
    return (

        <div className="col-md-3" >

            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title" key={note._id}> {note.title}</h5>
                    <p className="card-text" key={note._id}>{note.description}</p>
                </div>
            </div>
        </div>

    )
}

export default NoteItem;
