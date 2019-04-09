import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    static contextType = AuthUserContext;
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          this.context.updateAuth(authUser);
          if (!condition(authUser)) {
            this.props.history.push(ROUTES.SIGNIN);
          }
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {({authUser, updateAuth}) => {
              //console.log(updateAuth)
              return condition(authUser) ? <Component {...this.props} /> : null;
            }
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return compose(
    withRouter,
    withFirebase,
  )(WithAuthorization);
};

export default withAuthorization;