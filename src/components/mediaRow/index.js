import React, { Component, PropTypes } from 'react';
import
  {
    StyleSheet, Text, Container, Left, Right, Header, Footer, View, Image, Item, Button, ListView, TouchableOpacity, SliderIOS, ScrollView, Animated
   } from 'react-native';
import { connect } from 'react-redux';
import { resizeImageWithTimThumb } from '../../lib/util';
import { actions } from 'react-native-navigation-redux-helpers';
import MediaView from '../mediaView';
import Moment from 'moment';
import HTMLView from 'react-native-htmlview';
import Icon from 'react-native-vector-icons/FontAwesome';

const {
  reset,
  pushRoute,
} = actions;

class MediaRow extends Component {

  static propTypes = {
    media: PropTypes.object,
    pushRoute: React.PropTypes.func,
  }

  state = {
    rowAnimation: new Animated.Value(0)
  }

  onRowPress(media) {
    // this.props.navigator.push({
    //   component: MediaView,
    //   title: 'Details',
    //   passProps: { media: media }
    // });
  }

  onImageLoad = () => {
    Animated.timing(
      this.state.rowAnimation,
      {
        toValue: 1
      }
    ).start();
  }

  renderRow = (media, createdTime, mediaType) => {
    const { image } = media;

    return (
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <Text style={styles.username}>
            {media.poster_name}
          </Text>
          <Text style={styles.date}>
            {createdTime}
          </Text>
        </View>
        <View style={styles.thumbContainer}>
          {image ?
            <Image
              source={{uri: image}}
              style={styles.thumbnail}
              onLoad={this.onImageLoad}
            />
            :
            <Text>
              No image with post
            </Text>
          }
        </View>
        <View style={styles.footer}>
          <HTMLView
            value={media.message}
            stylesheet={htmlStyles}
          />
          <View style={styles.icons}>
            <View style={styles.likes}>
                <Icon name="heart" size={14} color="#333" />
                <Text style={styles.likesCount}>
                  {media.like_count}
                </Text>
            </View>
            <Icon name={mediaType.toLowerCase()} size={20} color="#333" />
          </View>
        </View>
      </View>
    );
  }

  render() {
    const { media } = this.props;
    const createdTime = Moment(media.external_created_at).fromNow();

    return (
      <Animated.View key={media.id} style={[styles.container, {
        opacity: this.state.rowAnimation,
        transform: [{
          translateY: this.state.rowAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [-50, 0]
          })
        }]
      }]}>
      <TouchableOpacity>
        {this.renderRow(media, createdTime, media.source.source)}
      </TouchableOpacity>
    </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 25,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#ffffff',
    flexWrap: 'wrap',
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  thumbContainer: {
    shadowColor: "#ffffff",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: .3,
    shadowRadius: 5,
    borderRadius: 5,
    alignSelf: 'stretch',
    height: 306,
    position: 'relative'
  },
  date: {
    color: '#333',
    fontSize: 14,
    fontWeight: 'normal',
  },
  username: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  likesCount: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'normal',
    marginLeft: 5,
    marginTop: -2,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignSelf: 'stretch',
  },
  footer: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    alignSelf: 'stretch',
  },
  icons: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginTop: 10
  },
  likes: {
    flex: 1,
    flexDirection: 'row',
  },
  thumbnail: {
    height: 306,
  }
});


const htmlStyles = StyleSheet.create({
  p: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'normal',
  },
});

function bindActions(dispatch) {
  return {
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
  };
}

const mapStateToProps = state => ({
  list: state.list.list,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindActions)(MediaRow);
