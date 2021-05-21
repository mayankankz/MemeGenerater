import React from 'react';
import { Route, Switch } from 'react-router';
import{Meme} from './Component/Meme'
import { MemeGenerate } from './Component/MemeGenerate';
export const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <Meme />
        </Route>
        <Route path='/generated'>
          <MemeGenerate />
        </Route>
      </Switch>
    </div>
  );
}
