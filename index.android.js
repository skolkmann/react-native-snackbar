/**
 * This component shows simple notifications in form of a snackbar. While the snackbar content
 * could be anything, it usually shows a message and an action like 'UNDO' to revert the change.
 *
 * This component should be placed at the app's root and be some kind of singleton, so notifications
 * are shown only by that one root instance and don't overlay each other.
 */

import React, { Component } from 'react'
import {
  Animated,
  AppRegistry,
  Button,
  Easing,
  PanResponder,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native'

const SNACKBAR_HEIGHT = 64

export default class snackbar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isVisible: false,
      animatedY: new Animated.Value(0),
    }

    this.showAnimation = Animated.timing(
      this.state.animatedY,
      {
        toValue: -SNACKBAR_HEIGHT,
        duration: 250,
      }
    )

    this.hideAnimation = Animated.timing(
      this.state.animatedY,
      {
        toValue: SNACKBAR_HEIGHT,
        duration: 250,
      }
    )
  }

  show() {
    // The timeout is used to hide the snackbar after a specified time
    clearTimeout(this.timeout)

    // If the snackbar is already shown, hide it first, then show it again
    const sequence = this.state.isVisible ?
      [this.hideAnimation, this.showAnimation] :
      [this.showAnimation]

    this.state.isVisible = true

    Animated.sequence(sequence).start(
      () => {
        this.timeout = setTimeout(
          () => this.hide(),
          2000,
        )
      }
    )
  }

  hide() {
    this.hideAnimation.start(
      () => {
        this.state.isVisible = false
      }
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => this.show()}
          title="Show"
          color="#19B5FE"
        />
        <Animated.View
          style={{
            ...styles.snackbar,
            transform: [{ translateY: this.state.animatedY }],
          }}
        >
          <Text style={styles.message}>
            Item removed!
          </Text>
          <Text style={styles.action}>
            UNDO
          </Text>
        </Animated.View>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  snackbar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -SNACKBAR_HEIGHT,
    height: SNACKBAR_HEIGHT,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  message: {
    fontSize: 18,
    color: '#FFF',
  },
  action: {
    fontSize: 18,
    color: '#2ECC71'
  }
}

AppRegistry.registerComponent('snackbar', () => snackbar)
