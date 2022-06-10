import axios from 'axios';
// import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UpdateForm = (props) => {
  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Update Note</h2>
        <form className="form form--login" onSubmit={props.onSubmit}>
          <div className="form__group">
            <textarea
              id="note"
              className="textarea__input"
              type="text"
              placeholder="text ..."
              defaultValue={props.noteValue}
              required
            ></textarea>
          </div>

          <div className="form__group">
            <button className="btn btn-lg btn-success">Update Note</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export const Update = () => {
  const [noteValue, setNoteValue] = useState('');
  // setNoteValue(document.querySelector('#note').value);
  const { id } = useParams();

  const getNote = async () => {
    const res = await axios({
      method: 'GET',
      url: `/api/v1/notes/${id}`,
      withCredentials: true,
    });
    setNoteValue(res.data.note.note);
    // console.log(res.data.note.note);
  };

  // const note = res.data.note;
  useEffect(() => {
    getNote();
  }, []);

  const handleUpdateNote = async (e) => {
    try {
      e.preventDefault();
      // const noteID = e.target.closest('.note').dataset.id;
      const note = document.querySelector('#note').value;
      console.log(note);

      const res = await axios({
        method: 'patch',
        url: `/api/v1/notes/${id}`,
        data: { note },
        withCredentials: true,
      });
      // const res = await axios.patch(
      //   `http://localhost:3000/api/v1/notes/${id}`,
      //   note,
      //   { withCredentials: true }
      // );

      console.log(res);

      if (res.data.status === 'success')
        window.setTimeout(() => {
          window.location.assign('/');
        }, 500);
    } catch (err) {
      console.log('error', err);
    }
  };

  return (
    <div>
      <UpdateForm onSubmit={handleUpdateNote} noteValue={noteValue} />
    </div>
  );
};
