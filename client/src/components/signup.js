import axios from 'axios';
import { showAlert } from './login';

const SignupForm = (props) => {
  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Sign up:</h2>
        <form className="form form--login" onSubmit={props.onSubmit}>
          <div className="form__group">
            <label className="form__label" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              className="form__input"
              type="email"
              placeholder="you@example.com"
              required
            ></input>
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className="form__input"
              type="text"
              placeholder="name"
              required
            ></input>
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="form__input"
              type="password"
              placeholder="••••••••"
              required
              minLength={'8'}
            ></input>
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="passwordConfirm">
              Confirm Password
            </label>
            <input
              id="passwordConfirm"
              className="form__input"
              type="password"
              placeholder="••••••••"
              required
              minLength={'8'}
            ></input>
          </div>
          <div className="form__group">
            <button className="btn btn-lg btn-success">Sign Up</button>
          </div>
        </form>
      </div>
    </main>
  );
};
export const Signup = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const name = document.querySelector('#name').value;
    const password = document.querySelector('#password').value;
    const passwordConfirm = document.querySelector('#passwordConfirm').value;
    const res = await axios({
      method: 'POST',
      url: `http://localhost:3000/api/v1/users/signup`,
      data: { email, name, password, passwordConfirm },
      withCredentials: true,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Signed Up successfully!');
      localStorage.setItem('user', JSON.stringify(res.data.data.user));
      window.setTimeout(() => {
        window.location.assign('/');
      }, 1000);
    }
    console.log(res);
  };
  return <SignupForm onSubmit={handleSubmit} />;
};
