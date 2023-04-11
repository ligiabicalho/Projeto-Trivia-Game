import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../trivia.png';
import { fetchApiToken } from '../services/fetchAPI';
import { saveLocalStorage } from '../services/localStorage';
import { actionUserLogin } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  validation = () => {
    const { username, email } = this.state;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
    const usernameValid = username.length > 0;
    return (emailRegex.test(email)
      && usernameValid);
  };

  handlePlayClick = async () => {
    const { history, dispatch } = this.props;
    dispatch(actionUserLogin(this.state));
    const token = await fetchApiToken();
    saveLocalStorage('token', token);
    history.push('/game');
  };

  handleSettingsClick = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { username, email } = this.state;
    return (
      <div className="Pages">
        <div className="Login">
          <header className="Login-header">
            <img src={ logo } className="App-logo" alt="logo" />
          </header>
          <form>
            <label htmlFor="name-input">
              <input
                placeholder="What is your name?"
                className="Inputs-login"
                id="name-input"
                type="text"
                data-testid="input-player-name"
                name="username"
                value={ username }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="email-input">
              <input
                placeholder="What is your Gravatar email?"
                className="Inputs-login"
                id="email-input"
                type="email"
                data-testid="input-gravatar-email"
                name="email"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
            {/* <p className="Lets-play">VAMOS JOGAR?</p> */}
            <button
              className="Button-play"
              type="button"
              data-testid="btn-play"
              disabled={ !this.validation() }
              onClick={ this.handlePlayClick }
            >
              Play
            </button>
            <button
              className="Button-config"
              type="button"
              data-testid="btn-settings"
              onClick={ this.handleSettingsClick }
            >
              Settings
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  dispatch: PropTypes.func,
}.isRequired;

export default connect(null)(Login);
