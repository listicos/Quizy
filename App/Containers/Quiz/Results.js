// @flow

import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import entities from 'entities'
import { fetchQuestions, clearQuestions } from './actions'
import Button from '../../Components/Button'
import { Colors, Fonts } from '../../Themes'
import type { QuizState } from './models'

type ResultsComponent = {
  clearQuestions: Function,
  fetchQuestions: Function,
  quiz: QuizState,
  navigation: Object
}

const Results = ({ clearQuestions, fetchQuestions, navigation, quiz }: ResultsComponent) => {
  const restartGame = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Intro' })]
    })
    navigation.dispatch(resetAction)
  }

  const getScore = () => quiz.results.filter((result) => result.isCorrect)

  const renderItem = ({ item }) => {
    return (
      <View style={[styles.questionContainer, item.isCorrect ? styles.questionContainerCorrect : null]}>
        <Text style={styles.question}>{entities.decodeHTML(item.question)}</Text>
        <Text style={styles.answer}>{item.correctAnswer ? 'TRUE' : 'FALSE'}</Text>
      </View>
    )
  }

  const score = getScore()

  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcome}>Your scored</Text>
        <Text style={styles.welcome}>
          {score.length} / {quiz.results.length}
        </Text>
        <FlatList keyExtractor={(_, index) => `result__${index}`} data={quiz.results} renderItem={renderItem} />
      </View>
      <Button text='PLAY AGAIN' onPress={restartGame} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10
  },
  welcome: {
    ...Fonts.style.h1,
    color: Colors.textAccent,
    textAlign: 'center'
  },
  questionContainer: { backgroundColor: Colors.red, paddingVertical: 10, marginTop: 5, paddingHorizontal: 30 },
  question: {
    ...Fonts.style.normal,
    color: Colors.textAccent
  },
  answer: {
    ...Fonts.style.normal,
    marginTop: 10,
    fontWeight: 'bold',
    color: Colors.textAccent,
    textAlign: 'center'
  },
  questionContainerCorrect: {
    backgroundColor: Colors.green
  }
})

const mapStateToProps = (state) => ({ quiz: state.quiz })

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: () => dispatch(fetchQuestions()),
  clearQuestions: () => dispatch(clearQuestions())
})

export default connect(mapStateToProps, mapDispatchToProps)(Results)
