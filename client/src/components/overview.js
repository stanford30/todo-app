import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
// import Cookies from 'js-cookie';
// import { Cookies, useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Note = (props) => {
  let navigate = useNavigate();

  const routeChange = (e) => {
    console.log(e.target.closest('.note').dataset.id);
    let id = e.target.closest('.note').dataset.id;
    let path = `/update/${id}`;
    navigate(path);
  };
  return (
    <div className="note" data-id={props.note._id}>
      <div className="note-body">
        <p className="card-text">{props.note.note}</p>
        <button className="btn btn-danger" onClick={props.handleDelete}>
          Delete
        </button>
        <button className="btn btn-primary" onClick={routeChange}>
          Update
        </button>
      </div>
    </div>
  );
};

export const OverView = (props) => {
  const [notes, setNotes] = useState([]);
  let greeting;

  if (props.user) {
    const firstname = JSON.parse(localStorage.getItem('user')).name.split(
      ' '
    )[0];
    greeting = <h3>Hello {firstname}</h3>;
  } else {
    greeting = (
      <>
        <h3>Hello from the overview</h3>
        <h3>Try: username: test@example.com </h3>
        <h3>password: test1234</h3>
      </>
    );
  }

  const getUserNotes = async () => {
    const res = await axios({
      method: 'GET',
      withCredentials: true,
      url: `/api/v1/users/${props.user.id}`,
    });
    const notes = res.data.user.notes;
    setNotes(notes);
  };

  useEffect(() => {
    if (props.user) getUserNotes();
  }, []);

  const handleDelete = async (e) => {
    // console.log(e.target.closest('.note').dataset.id);
    await axios({
      method: 'DELETE',
      url: `/api/v1/notes/${e.target.closest('.note').dataset.id}`,
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
  if (!props.user) return <div className="overview-container">{greeting}</div>;
  return (
    <div className="overview-container">
      {greeting}
      <div className="note-container">{noteList()}</div>
    </div>
  );
};
//
