import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";

function App() {
  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/about' component={About} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </Switch>
    </div>
  );
}

function Header() {
  return (
    <nav>
      <div className='nav-wrapper'>
        <a href='/' className='brand-logo'>
          Logo
        </a>
        <ul id='nav-mobile' className='right hide-on-med-and-down'>
          <li>
            <a href='/login'>Login</a>
          </li>
          <li>
            <a href='/about'>About</a>
          </li>
          <li>
            <a href='/register'>Register</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function Home() {
  return <div className='home'>This is home.</div>;
}
function About() {
  return <div className='about'>This is About page</div>;
}
export default App;
