/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import { NodeCameraView, NodePlayerView } from 'react-native-nodemediaclient';
import { NavigationEvents } from "react-navigation";

export default class Capture extends Component{
  constructor(props){
    super(props);
    this.state = {
      publishBtnTitle: 'Start Publish',
    };
  }

  stopPublish = () => {
    this.setState({ publishBtnTitle: 'Start Publish', isPublish: false });
    this.vb.stop();
  }

  startPublish = () => {
    this.setState({ publishBtnTitle: 'Stop Publish', isPublish: true });
    this.vb.start();
  }
 
  render() {

    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillBlur={payload => {
            this.stopPublish()
            this.vb.stopPreview();
          }}
          onWillFocus={payload => {
            this.vb.startPreview();
          }}
        />
        <View style={styles.cameraContainer}>
          <NodeCameraView 
            style={{ flex: 1}}
            ref={(vb) => { this.vb = vb }}
            outputUrl = {"rtmp://3.0.248.253:1935/liveassignment/live"}
            camera={{ cameraId: 0, cameraFrontMirror: true }}
            audio={{ bitrate: 32000, profile: 1, samplerate: 44100 }}
            video={{ preset: 12, bitrate: 2000000, profile: 1, fps: 30, videoFrontMirror: false }}
            autopreview={true}
          />

          <Button
            onPress={() => {
              if (this.state.isPublish) {
                this.stopPublish();
              } else {
                this.startPublish();
              }
            }}
            title={this.state.publishBtnTitle}
            color="#841584"
          />
        </View>
        <View style={styles.playerContainer}>
          <NodePlayerView 
            style={{ flex:1}}
            ref={(vp) => { this.vp = vp }}
            inputUrl={"https://5b48f8f32d3be.streamlock.net/liveassignment/live/playlist.m3u8"}
            scaleMode={"ScaleAspectFit"}
            bufferTime={300}
            maxBufferTime={1000}
            autoplay={true}
          />
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
    container:{
      flex:1,
      flexDirection: 'column',
    },
    cameraContainer: {
      flex:1
    },
    playerContainer: {
      flex:1
    },
    capture: {
      backgroundColor: 'white',
      padding: 10
    }
  });
