import { BrowserRouter, Switch, Route } from 'react-router-dom'

// page imports
import Home from '../Body/Home';
import About from '../Body/About'
import SoftwareProjects from '../Body/SoftwareProjects';
import Youtube from '../Body/Youtube'

const Main = () => {
  return (
    <BrowserRouter>
      <Switch> {/* The Switch decides which component to show based on the current URL.*/}
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/about' component={About}></Route>
        <Route exact path='/software' component={SoftwareProjects}></Route>
        <Route exact path='/youtube' component={Youtube}></Route>
      </Switch>
    </BrowserRouter> 
  );
}

export default Main;