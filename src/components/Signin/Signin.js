import React from 'react';
import '../../App.css';

class Signin extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: '',
      errorMessage: ""
    }
  }
  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  onSubmitSignIn = () => {
  fetch('http://localhost:3000/signin', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: this.state.signInEmail,
      password: this.state.signInPassword
    })
  })
    .then(response => response.json())
    .then(user => {
      if (user.id) {
        this.props.loadUser(user);
        this.props.onRouteChange('home');
      } else {
        // Handle wrong credentials error
        this.setState({ errorMessage: 'Wrong credentials !!! Please sign in with correct credentials!!!' });
      }
    })
    .catch(error => {
      // Handle fetch or network error
      console.log(error);
      // Update state to display a general error message
      this.setState({ errorMessage: 'An error occurred. Please try again.' });
    });
}

  render(){
    return (
      <div>
        <div>
          {/*Render errors due to wrong credentials if they exist*/}
          {this.state.errorMessage && (
            <div className="error-message">{this.state.errorMessage}</div>
          )}
        </div>  
        <article className="br3 bg-white-80 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">  
          <main className="pa4 black-80">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f2 fw6 ph0 mh0">Sign in</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
                  <input 
                    className="pa2 input-reset ba bg-white-70 hover-bg-black hover-white w-100" 
                    type="email" 
                    name="email-address"  
                    id="email-address" 
                    onChange= {this.onEmailChange}
                  />
                </div>
                <div className="mv3">
                  <label className="db b fw6 lh-copy f4 db" htmlFor="password">Password</label>
                  <input 
                    className="b pa2 input-reset ba bg-white-70 hover-bg-black hover-white w-100" 
                    type="password" 
                    name="password"  
                    id="password" 
                    onChange= {this.onPasswordChange}
                  />
                </div>
              </fieldset>
              <div className="b">
                <input 
                  onClick = {this.onSubmitSignIn}
                  className="b ph3 pv2 input-reset ba b--black  grow pointer f4 dib" 
                  type="submit" 
                  value="Sign in"
                />
              </div>
            </div>
          </main>
        </article>
      </div>
    );
  }
}

export default Signin;