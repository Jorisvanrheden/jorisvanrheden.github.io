import { BrowserRouter, Switch, Route } from 'react-router-dom'

// page imports
import SoftwareProjects from '../Body/SoftwareProjects';
import Youtube from '../Body/Youtube'
import Project_Pathfinding from '../Body/Project_Pathfinding'
import Project_Chess from '../Body/Project_Chess'

const Main = () => {
  return (
    <BrowserRouter>
      <Switch> {/* The Switch decides which component to show based on the current URL.*/}
        {/* Home */}
        <Route exact path='/' component={Youtube}></Route>

        {/* Pages  */}
        <Route exact path='/projects' component={SoftwareProjects}></Route>
        <Route exact path='/youtube' component={Youtube}></Route>

        {/* Projects  */}
        <Route exact path='/pathfinding' component={Project_Pathfinding}></Route>
        <Route exact path='/chess' component={Project_Chess}></Route>
      </Switch>
    </BrowserRouter> 
  );
}

export default Main;