import React from "react"
import { HashRouter, Route } from "react-router-dom"
import Home from "./routes/Home"
import About from "./routes/About"
import Detail from "./routes/Detail"
import Navigation from "./components/Navigation"
import "./App.css"


function App() {
  return (
    // HashRouter : # 이거 있는 요상한 칭구~ BrowerRouter라는 것도 있음!
    <HashRouter>
      {/* <Route path="/home">
        <h1>Home</h1>
      </Route>
      <Route path="/home/introduction">
        <h1>Introduction</h1>
      </Route>
      <Route path="/about">
        <h1>About</h1>
      </Route> */}
      {/* Navigation은 props가 없고, Route는 있음 for sharing information */}
      <Navigation />
      <Route path="/" exact={ true } component={ Home } />
      <Route path="/about" component={ About } />
      <Route path="/movie/:id" component={Detail} />
    </HashRouter>
  )
}

export default App