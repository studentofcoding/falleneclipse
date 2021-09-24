import "./App.css";

import { Route } from 'react-router-dom';
import Home from './pages/home';
import Header from './components/Header';
import Roadmap from "./pages/roadmap";
import FAQ from "./pages/faq";

/**
 * * This is where all the path of apps placed
 * * Home - all the functionality of the wallet
 * * Header - the navigation of the web
 * * Roadmap - roadmap page
 * * FAQ - faq page
 * * We use React Route for routing
 */

const App = () => {
  return (
    <div>
      <Header />
      
      <div>
        <Route exact path='/' component={Home} />
        <Route path='/faq' component={FAQ} />
        <Route path='/roadmap' component={Roadmap} />
        {/* <Link to="/">Home</Link> */}
      </div>
    </div>
  );
};

export default App;