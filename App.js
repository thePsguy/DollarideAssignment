/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View, SafeAreaView} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};



export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      rows: 7,                                                                   // The number of rows
      columns: 7,                                                                // number of columns
      colorList: ['black', 'blue', 'cyan', 'green', 'magenta', 'red', 'yellow'], // and colors can be changed
    }
  }

  handleClickOnBox = (i,j) => {
    let nextColor = this.colorDict[''+i+j] + 1;
    this.colorDict[''+i+j] += 1;
    this['box'+i+j].setNativeProps({style: {...styles.box, backgroundColor: this.state.colorList[nextColor%this.state.colorList.length]}})
  };

  colorDict = {};

  render() {
    let rows = [];
    for (let i = 0; i < this.state.rows; i++) {
      let row = [];
      let rowColors = [];
      for (let j = 0; j < this.state.columns; j++) {
        rowColors.push(j);
        this.colorDict[''+i+j] = (i*this.state.columns)+j;
        let box = <TouchableOpacity
          ref={component => this['box'+i+j] = component}
          onPress={() => {this.handleClickOnBox(i,j)}}
          key={j}
          style={{...styles.box, backgroundColor: this.state.colorList[this.colorDict[''+i+j]%this.state.colorList.length]}} />;
        row.push(box);
      }
      rows.push(row);
    }
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.boxContainer}>
          {rows.map((row, index) => (
              <View key={index} style={styles.row}>{row}</View>
          )
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  boxContainer: {
    flexDirection: 'column',
    height: '100%',
    // top: '25%'
  },
  row: {
    flexDirection: 'row',
    flex: 1
    // height: '100%',
    // width: '100%'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  box: {
    flex: 1,
    backgroundColor: 'red',
    margin: 2,
    aspectRatio: 1
  },
});
