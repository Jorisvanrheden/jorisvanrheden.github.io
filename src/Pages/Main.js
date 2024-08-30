import { BrowserRouter, Switch, Route } from 'react-router-dom'

// page imports
import Project_Overview from './Project_Overview';
import Project_Youtube from './Project_Youtube'
import Project_Pathfinding from './Project_Pathfinding'
import Project_Chess from './Project_Chess'

const Main = () => {
  return (
    <BrowserRouter>
      <Switch> {/* The Switch decides which component to show based on the current URL.*/}
        {/* Home */}
        <Route exact path='/' component={Project_Youtube}></Route>

        {/* Pages  */}
        <Route exact path='/projects' component={Project_Overview}></Route>
        <Route exact path='/youtube' component={Project_Youtube}></Route>

        {/* Projects  */}
        <Route exact path='/pathfinding' component={Project_Pathfinding}></Route>
        <Route exact path='/chess' component={Project_Chess}></Route>
      </Switch>
    </BrowserRouter> 
  );
}

export default Main;