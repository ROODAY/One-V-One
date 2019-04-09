import React from 'react';
import Loader from '../Loader'

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
        showLoader: true
      };

      this.updateAuth = this.updateAuth.bind(this);
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          authUser
            ? this.setState({ authUser })
            : this.setState({ authUser: null });
          this.setState({ showLoader: false });
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    updateAuth(authUser) {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    }

    render() {
      return (
        <AuthUserContext.Provider value={{authUser: this.state.authUser, updateAuth: this.updateAuth}}>
          <Loader visible={this.state.showLoader} />
          <Component {...this.props} />
        </AuthUserContext.Provider>
       );
    }
  }

  return withFirebase(WithAuthentication);
};

export default withAuthentication;