
import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';

const launchscreen = require('../../../images/shadow.png');

const {
  replaceAt,
} = actions;

class SplashPage extends Component {

  static propTypes = {
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  componentWillMount() {
    setTimeout(() => {
      this.replaceRoute('home');
    }, 1500);
  }

  replaceRoute(route) {
    this.props.replaceAt('splashscreen', { key: route }, this.props.navigation.key);
  }

  render() { // eslint-disable-line class-methods-use-this
    return (
      <Image source={launchscreen} style={{ flex: 1, height: null, width: null }} />
    );
  }
}

function bindActions(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
  };
}

const mapStateToProps = state => ({
  name: state.user.name,
  list: state.list.list,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindActions)(SplashPage);
