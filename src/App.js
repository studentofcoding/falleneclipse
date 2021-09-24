import "./App.css";

import { Route } from 'react-router-dom';
import Home from './pages/home';
import Header from './components/Header';
import Roadmap from "./pages/roadmap";
import FAQ from "./pages/faq";

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