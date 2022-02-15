import { BrowserRouter, Switch, Route } from 'react-router-dom'

// page imports
import Home from '../Body/Home';
import About from '../Body/About'
import SoftwareProjects from '../Body/SoftwareProjects';
import Youtube from '../Body/Youtube'
import Project_Pathfinding from '../Body/Project_Pathfinding'
import Project_Chess from '../Body/Project_Chess'

const Main = () => {
  return (
    <BrowserRouter>
      <Switch> {/* The Switch decides which component to show based on the current URL.*/}

        {/* Tab pages */}
        {/* <Route exact path='/' component={Project_Chess}></Route> */}
        <Route exact path='/' component={Home}></Route>

        {/* TODO: remove these links, as they should be part of the projects/ subfolder */}
        <Route exact path='/pathfinding' component={Project_Pathfinding}></Route>
        <Route exact path='/chess' component={Project_Chess}></Route>

        <Route exact path='/about' component={About}></Route>
        <Route exact path='/projects' component={SoftwareProjects}></Route>
        <Route exact path='/youtube' component={Youtube}></Route>

        {/* Projects  */}
        <Route exact path='/projects/pathfinding' component={Project_Pathfinding}></Route>
        <Route exact path='/projects/chess' component={Project_Chess}></Route>

      </Switch>
    </BrowserRouter> 
  );
}

export default Main;