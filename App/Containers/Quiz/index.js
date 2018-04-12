// @flow

import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import PropTypes from 'prop-types'
import entities from 'entities'
import { fetchQuestions, answerQuestion } from './actions'
import { Colors, Fonts } from '../../Themes'

class Quiz extends Component {
  componentDidMount () {
    this.props.fetchQuestions()
  }

  finish = () => {
    this.props.navigation.navigate('QuizResults')
  }

  getCurrentResult = () => this.props.quiz.results[this.props.quiz.currentQuestionIndex]

  answerQuestion = (answer) => {
    this.props.answerQuestion(answer)
    if (this.props.quiz.results.length === this.props.quiz.currentQuestionIndex + 1) {
      this.finish()
    }
  }

  renderContent () {
    if (this.props.quiz.isFetching || this.props.quiz.results.length === 0) {
      return (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator color={Colors.primary} />
        </View>
      )
    }

    const result = this.getCurrentResult()

    return (
      <View style={styles.content}>
        <View style={styles.categoryContainer}>
          <Text style={styles.category}>{result.category}</Text>
        </View>
        <View style={styles.questionContainer}>
          <Text style={styles.question}>{entities.decodeHTML(result.question)}</Text>
        </View>
        <Text style={styles.currentIndex}>
          {this.props.quiz.currentQuestionIndex + 1} of {this.props.quiz.results.length}
        </Text>
        <View style={styles.actionsSection}>
          <TouchableOpacity
            style={[styles.button, styles.buttonFalse]}
            onPress={() => {
              this.answerQuestion(false)
            }}
          >
            <Icon name='times' size={40} color='white' />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonTrue]}
            onPress={() => {
              this.answerQuestion(true)
            }}
          >
            <Icon name='check' size={40} color='white' />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render () {
    return <View style={styles.container}>{this.renderContent()}</View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  categoryContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
    minHeight: 120
  },
  category: {
    ...Fonts.style.h2,
    color: Colors.textAccent,
    textAlign: 'center'
  },
  questionContainer: {
    width: 250,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.primary,
    borderWidth: 1,
    padding: 15,
    borderRadius: 5
  },
  question: {
    ...Fonts.style.normal,
    maxWidth: 250,
    textAlign: 'center',
    color: Colors.textAccent
  },
  actionsSection: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between'
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 45
  },
  buttonFalse: {
    backgroundColor: Colors.black
  },
  buttonTrue: {
    backgroundColor: Colors.button
  },
  currentIndex: {
    ...Fonts.style.normal,
    textAlign: 'center',
    color: Colors.textAccent,
    marginTop: 20
  }
})

Quiz.propTypes = {
  fetchQuestions: PropTypes.func.isRequired,
  answerQuestion: PropTypes.func.isRequired,
  quiz: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({ quiz: state.quiz })

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: () => dispatch(fetchQuestions()),
  answerQuestion: (answer) => dispatch(answerQuestion(answer))
})

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
