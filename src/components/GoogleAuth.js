import React from 'react';

class GoogleAuth extends React.Component {

  state = { isSignedIn: null };

  componentDidMount() {
    //Load auth2 library
    window.gapi.load('client:auth2', () => {
      //Callback for when the load finishes
      window.gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_API,
        scope: 'email'
      }).then(() => {
        //init returns a promise.
        //Get a hold of the authorization instance
        this.auth = window.gapi.auth2.getAuthInstance();
        //Update state and re-render by getting sign in status
        this.setState({ isSignedIn: this.auth.isSignedIn.get() })
        this.auth.isSignedIn.listen(this.onAuthChange);
      });  
    });
  }

  //Callback function to the isSignedIn.listen function
  //to change state when user sign in and out.
  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() })
  }

  onSignIn = () => {
    this.auth.signIn();
  }

  onSignOut = () => {
    this.auth.signOut();
  }

  renderAuthButton() {
    if (this.state.isSignedIn === null){
      return null;
    } else if (this.state.isSignedIn) {
      return (
        <button onClick={this.onSignOut} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else  {
      return (
        <button onClick={this.onSignIn} className="ui red google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }
  
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

export default GoogleAuth;