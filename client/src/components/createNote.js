import axios from 'axios';
import React from 'react';

const CreateForm = (props) => {
  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Create Note</h2>
        <form className="form form--login" onSubmit={props.onSubmit}>
          <div className="form__group">
            <textarea
              id="note"
              className="textarea__input"
              type="text"
              placeholder="text ..."
              required
            ></textarea>
          </div>

          <div className="form__group">
            <button className="btn btn-lg btn-success">Create Note</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export const Create = () => {
  const handleCreateNote = async (e) => {
    e.preventDefault();
    const note = document.querySelector('#note').value;
    const res = await axios({
      method: 'POST',
      url: `http://localhost:3000/api/v1/notes/`,
      data: { note },
      withCredentials: true,
    });

    if (res.data.status === 'success')
      window.setTimeout(() => {
        window.location.assign('/');
      }, 500);
  };

  return (
    <div>
      <CreateForm onSubmit={handleCreateNote} />
    </div>
  );
};
