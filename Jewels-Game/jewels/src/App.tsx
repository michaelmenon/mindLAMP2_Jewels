/**
 * @file   App.tsx
 * @brief  Intial component for the jewels game
 * @date   Feb , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Jewels from './games/jewels/Jewels';
import './index.css';

 
class App extends React.Component<{}> {
  
  constructor(props: {}) {
    super(props);
  }
 
  render() {    
    return (
    <Router>
      <div>
        {/* <nav>
               <Link to="/jewels">Jewels</Link>
        </nav> */}
        <Switch>
          <Route exact={true} path="/jewels" component={Jewels} />
        </Switch>
      </div>
    </Router>
    );    
  }
}
export default App;
