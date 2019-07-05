import React from 'react';

const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div className="row">
      <form className="col s8 offset-s2" onSubmit={handleSubmit} name={name}>
        {name === 'signup' ? (
          <div className="row">
            <div className="input-field col s6">
              <input placeholder="First Name" type="text" name="firstName" />
            </div>
            <div className="input-field col s6">
              <input placeholder="Last Name" type="text" name="lastName" />
            </div>
          </div>
        ) : null}

        <div className="row">
          <div className="input-field col s12">
            <input placeholder="Email" type="text" name="email" />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input placeholder="Password" type="password" name="password" />
          </div>
        </div>
        <div>
          <button className="teal accent-3 btn-small" type="submit">
            {displayName}
          </button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

export default AuthForm;
{
  /* <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div> */
}
