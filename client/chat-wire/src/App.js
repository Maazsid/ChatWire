import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home/Home';
import Header from './pages/home/Header';
import Chat from './pages/chat/Chat';
import ErrorPage from './pages/error-page/ErrorPage';
import Contact from './pages/contact/Contact';
import About from './pages/about/About';
import UserProvider from './contexts/UserProvider';
import CommunitiesProvider from './contexts/CommunitiesProvider';
import SocketProvider from './contexts/SocketProvider';
import AuthProvider from './contexts/AuthProvider';

function App() {
  return (
    <Router>
      <Header />
      <AuthProvider>
        <SocketProvider>
          <UserProvider>
            <CommunitiesProvider>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/chat' component={Chat} />
                <Route path='/contact' component={Contact} />
                <Route path='/about' component={About} />
                <Route component={ErrorPage} />
              </Switch>
            </CommunitiesProvider>
          </UserProvider>
        </SocketProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
