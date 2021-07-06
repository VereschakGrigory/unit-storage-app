import { FC } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Units } from './components/Units';
import { Create } from './components/Create';
import { Edit } from './components/Edit';
import { NotFound } from './components/NotFound';
import './App.css';

const App: FC = () => {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/list" />
        <Route exact path="/list" component={Units} />
        <Route exact path="/create" component={Create} />
        <Route exact path="/edit/:unitId" component={Edit} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
