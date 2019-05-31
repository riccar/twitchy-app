import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

  componentDidMount() {
    //Load auth2 library
    window.gapi.load('client:auth2', () => {
      //Callback for when the load finishes
      window.gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_API,
        scope: 'email'
      }).then(() => {
        //init returns a promise. This is call during initialization
        //Get a hold of the authorization instance (this.auth)
        this.auth = window.gapi.auth2.getAuthInstance();
        //Dispatch an action to initialize the state with the sign in status
        //This happens only once and it won't render the button if not executed
        //Since this.props.isSignedIn will be null at initialization
        this.onAuthChange(this.auth.isSignedIn.get());
        //Listen to any sign in status change and dispatch the action creator
        //to change the sign in state every time users sign in or out
        this.auth.isSignedIn.listen(this.onAuthChange);
      });  
    });
  }

  /* Function to change state when user sign in and out.
  It's called with a boolean parameter when it's wired up as a callback for the
  isSignIn listener. It's also called to fire up the action creator*/
  onAuthChange = (isSignedIn) => {
    //Call the proper action creator according th isSignedIn value
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else  {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  };
  
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}//end class

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);