import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Colors, Fonts } from '../../Themes'

export default ({ onPress, text }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.button,
    paddingVertical: 20
  },
  text: {
    ...Fonts.style.h3,
    textAlign: 'center',
    color: Colors.textAccent
  }
})
