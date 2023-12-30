import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import ThemeContext from './context/ThemeContext'

import Login from './Login'
import ProtectedRoute from './ProtectedRoute'
import Home from './Home'
import Trending from './Trending'
import Gaming from './Gaming'
import SavedVideos from './SavedVideos'
import VideoItemDetail from './VideoItemDetail'
import NotFound from './NotFound'
import './App.css'

// Replace your code here
class App extends Component {
  state = {isDark: false, savedVideosList: []}

  changeTheme = () => {
    this.setState(prevState => ({isDark: !prevState.isDark}))
  }

  addToSaveVideos = videoDetail => {
    const {savedVideosList} = this.state
    const isIncluded =
      savedVideosList.filter(eachVideo => eachVideo.id === videoDetail.id)
        .length !== 0
    if (isIncluded) {
      this.setState(prevState => ({
        savedVideosList: prevState.savedVideosList.filter(
          eachSavedVideo => eachSavedVideo.id !== videoDetail.id,
        ),
      }))
    } else {
      this.setState(prevState => ({
        savedVideosList: [...prevState.savedVideosList, videoDetail],
      }))
    }
  }

  render() {
    const {isDark, savedVideosList} = this.state
    console.log(savedVideosList)

    return (
      <ThemeContext.Provider
        value={{
          isDark,
          changeTheme: this.changeTheme,
          savedVideosList,
          addToSaveVideos: this.addToSaveVideos,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetail}
          />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
