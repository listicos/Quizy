import { StackNavigator } from 'react-navigation'
import Intro from '../Containers/Intro'
import Quiz from '../Containers/Quiz'
import QuizResults from '../Containers/Quiz/Results'

const AppNavigation = StackNavigator(
  {
    Intro: { screen: Intro },
    Quiz: { screen: Quiz },
    QuizResults: { screen: QuizResults }
  },
  {
    headerMode: 'none'
  }
)

export default AppNavigation
