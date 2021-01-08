import React from 'react'
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import ImageList from './components/ImageList';

function App() {

  return (
    <div>
      <Switch>
        <Route exact path='/' render={(props)=> <Home {...props}/>} />
        <Route exact path='/:pk' render={(props)=> <ImageList {...props} />}/>
      </Switch>
    </div>
  )
}

export default App;
