import React from "react";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className='App'>
      <h1>app</h1>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/about' component={About} />
      </Switch>
    </div>
  );
}

function Header() {
  return (
    <div className='header'>
      <ul>
        <li>
          <a href='/'>Home</a>
        </li>
        <li>
          <a href='/about'>About</a>
        </li>
      </ul>
    </div>
  );
}

function Home() {
  return <div className='home'>This is home.</div>;
}
function About() {
  return <div className='about'>This is About page</div>;
}
export default App;
