import { Switch, Route } from 'react-router-dom';
import Schedule from './pages/Schedule';
import Leaderboard from './pages/Leaderboard';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import style from "./App.module.css";

function App() {
  return (
    <div className={style.wrapper}>
      <Navbar />
      <main>
        <Switch>
          <Route exact path="/" component={Schedule} />
          <Route path="/schedule" component={Schedule} />
          <Route path="/leaderboard" component={Leaderboard} />
          <Route path="*" component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
