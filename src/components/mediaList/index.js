import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, Image, ListView, TouchableOpacity, SliderIOS, ScrollView, AlertIOS, Linking } from 'react-native';
import MediaRow from '../mediaRow';
//import RNInstagramOAuth from 'react-native-instagram-oauth';
import shittyQs from 'shitty-qs';

const INSTAGRAM_CLIENT_ID = '74b319a7d5ea4c48a69f9b1199be1108';
const INSTAGRAM_REDIRECT_URI = 'http://umbrotsstofan.is';

const instagram = {
     client_id: INSTAGRAM_CLIENT_ID,
     redirect_url: INSTAGRAM_REDIRECT_URI  // e.g.: 'test://init'
 };

export default class MediaList extends Component {

  constructor(props, context) {
    super(props, context);
    this._handleOpenURL = this._handleOpenURL.bind(this);
  }

  static propTypes = {
    mediaUrl: PropTypes.string
  }

  state = {
    position: false,
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    }),
    loaded: false
  }

  componentDidUpdate(prevProps, prevState) {
    // if (!prevState.position && this.state.position) {
    //   this.fetchData();
    // }
  }

  componentWillMount() {
    this.fetchData(this.props);
  }

  fetchData(props) {
    console.log('MAMMA');
    fetch(props.mediaUrl)
      .then((response) => response.json())
      .then((responseData) => {
        console.log('hallo data', responseData);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.posts.items),
          loaded: true
        });
        console.log('DATA..', this.state.dataSource);

      })
      .done();
  }

  refetchData() {
    this.setState({loaded: false});
    this.fetchData();
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    Linking.removeEventListener('url', this._handleOpenURL);
  }

  _handleOpenURL(event) {
    console.log('_handleOpenURL');
    console.log('URL', event.url);
  }

  renderRow = (media) => {
    return <MediaRow media={media} key={media.id} loaded={this.state.loaded} navigator={this.props.navigator} />;
  }

  render() {
    return (
      <ListView
         dataSource={this.state.dataSource}
         renderRow={this.renderRow}
         style={styles.listView}
       />
     )
  }
}

const styles = StyleSheet.create({
  listView: {
    paddingTop: 20,
    backgroundColor: '#eeeeee'
  },
  sliderContainer: {
    alignItems: 'center',
    marginTop: -10,
    paddingBottom: 20
  },
  sliderTextLoader: {
    fontSize: 11,
    color: '#afafaf'
  },
  sliderText: {
    fontSize: 12,
    marginTop: 10,
    color: '#838383'
  },
  slider: {
    width: 300
  }
});
