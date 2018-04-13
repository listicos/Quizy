import React, { Component } from 'react'
import { View, StatusBar, StyleSheet } from 'react-native'
import AppNavigation from '../../Navigation/App'
import { connect } from 'react-redux'

const RootContainer = () => (
  <View style={styles.container}>
    <StatusBar barStyle='light-content' />
    <AppNavigation />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default connect()(RootContainer)
