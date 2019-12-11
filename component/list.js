/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import Watch from './watch';
import Permissions from 'react-native-permissions';

export default class List extends Component{
    videoPlayer;

    constructor(props){
        super(props);
        this.state = {
            videoIndex: 0,
            videos :[{
              uri:'https://videos3.earthcam.com/fecnetwork/9974.flv/playlist.m3u8'
            },{
              uri:'https://videos3.earthcam.com/fecnetwork/hdtimes10.flv/playlist.m3u8'
            },{
              uri:'http://184.72.239.149/vod/mp4:bigbuckbunny_1500.mp4/manifest.mpd'
            }]
        };
    }

    componentWillMount() {
      Permissions.check('camera').then(response => {
        // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        if (response !== 'authorized') {
          Permissions.request('camera').then(response => {
            this.checkMicroPermission();
          })
        } else {
          this.checkMicroPermission();
        }
      })
    }

    checkMicroPermission = () => {
      Permissions.check('microphone').then(response => {
        if (response !== 'authorized') {
          Permissions.request('microphone')
        }
      })
    }

    changeDropDownList = (value, index, data) => {

      this.setState({
        videoIndex: index
      })
    }

    render() {
      const {videos, videoIndex} = this.state;

      let data = [{
        value: 'HLS1',
      }, {
        value: 'HLS2',
      }, {
        value: 'DASH',
      }];

      return (
        <View style={styles.container}>
          <Dropdown
            label='Video List'
            data={data}
            containerStyle ={styles.dropdownlist}
            dropdownPosition = {0}
            onChangeText = {this.changeDropDownList}
            value = {data[videoIndex].value}
          />
          <View style={styles.container}>
            <Watch videoLink={videos[videoIndex].uri}/>
          </View>
        </View>
   );}
  }

var styles = StyleSheet.create({
    dropdownlist: {
      margin: 10
    },
    container:{
      flex:1
    }
});