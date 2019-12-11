/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';

export default class Watch extends Component{
    videoPlayer;

    constructor(props){
        super(props);
        this.state = {
            currentTime: 0,
            duration: 0,
            isFullScreen: false,
            isLoading: true,
            paused: false,
            playerState: PLAYER_STATES.PLAYING,
            screenType:'content',
        };
    }

    onSeek = seek => {
        this.videoPlayer.seek(seek);
    };

    onPaused = playerState => {
        this.setState({
          paused: !this.state.paused,
          playerState,
        });
      };
    
    onReplay = () => {
        this.setState({ playerState: PLAYER_STATES.PLAYING });
        this.videoPlayer.seek(0);
      };

    onProgress = data => {
        const { isLoading, playerState } = this.state;
        // Video Player will continue progress even if the video already ended
        if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
          this.setState({ currentTime: data.currentTime });
        }
    };
    
    onLoad = data => this.setState({ duration: data.duration, isLoading: false });
    onLoadStart = data => this.setState({ isLoading: true });
    onEnd = () => this.setState({ playerState: PLAYER_STATES.ENDED });
    onError = () => alert('Oh! ', error);
    exitFullScreen = () => {
        alert("Exit full screen");
      };
    enterFullScreen = () => {};
    onFullScreen = () => {
        if(this.state.screenType=='content')
          this.setState({screenType:'cover'});
       else
          this.setState({screenType:'content'});
      };

    onSeeking = currentTime => this.setState({ currentTime });

    render() {
      const {videoLink} = this.props;

      return (
        <View style={styles.container}>
            <Video source={{isNetwork: true,
                            type: '',
                    uri: videoLink}}
                ref={videoPlayer => (this.videoPlayer = videoPlayer)}
                onBuffer={this.onBuffer}                
                onError={this.videoError}  
                onEnd={this.onEnd}
                onLoad={this.onLoad}
                onLoadStart={this.onLoadStart}
                onProgress={this.onProgress}
                paused={this.state.paused}   
                onFullScreen={this.state.isFullScreen}
                resizeMode={this.state.screenType}
                style={styles.backgroundVideo} 
                volume={0}
            />

            <MediaControls
                duration={this.state.duration}
                isLoading={this.state.isLoading}
                mainColor="orange"
                onFullScreen={this.onFullScreen}
                onPaused={this.onPaused}
                onReplay={this.onReplay}
                onSeek={this.onSeek}
                playerState={this.state.playerState}
                progress={this.state.currentTime}
                /> 
        </View>
   );}
  }

var styles = StyleSheet.create({
    backgroundVideo: {
      position: 'absolute',
      top: 50,
      left: 0,
      bottom: 0,
      right: 0,
    },
    container:{
      flex:1
    }
});