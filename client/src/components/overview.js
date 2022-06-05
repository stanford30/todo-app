import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
// import Cookies from 'js-cookie';
// import { Cookies, useCookies } from 'react-cookie';

const Note = (props) => {
  return (
    <div className="note">
      <div className="note-body">
        <p className="card-text">{props.note.note}</p>
        <button
          className="btn btn-danger"
          // id={props.note._id}
          onClick={props.handleDelete}
          data-id={props.note._id}
        >
          Delete
        </button>
        <button
          className="btn btn-primary"
          id={props.note._id}
          // onClick={props.handleDelete}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export const OverView = (props) => {
  const [notes, setNotes] = useState([]);
  // console.log(props._locals);
  const getUserNotes = async () => {
    const res = await axios({
      method: 'GET',
      withCredentials: true,
      url: `http://localhost:3000/api/v1/users/${props.user.id}`,
    });
    const notes = res.data.user.notes;
    setNotes(notes);
  };
  useEffect(() => {
    // const getNotes = async () => {
    //   const res = await axios({
    //     method: 'GET',
    //     withCredentials: true,

    //     url: `http://localhost:3000/api/v1/users/${props.user.id}`,
    //   });
    //   const notes = res.data.user.notes;
    //   setNotes(notes);
    // };

    if (props.user) getUserNotes();
  }, []);

  const handleDelete = async (e) => {
    await axios({
      method: 'DELETE',
      url: `http://localhost:3000/api/v1/notes/${e.target.dataset.id}`,
      withCredentials: true,
    });
    // window.location.reload(true);
    await getUserNotes();
  };
  const noteList = () => {
    return notes.map((note) => {
      return <Note note={note} key={note._id} handleDelete={handleDelete} />;
    });
  };
  if (!props.user) return;
  return (
    <div className="overview-container">
      <h3>Hello from overview</h3>
      <div className="note-container">{noteList()}</div>
    </div>
  );
};
