import React, { useEffect, useState }from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import './App.scss';

import Menu from './Menu/Menu';
import Hero from './Hero/Hero';
import HomePage from './HomePage/HomePage';
import Footer from './Footer/Footer';
import AboutPage from './AboutPage/AboutPage';
import LoginPage from './LoginPage/LoginPage';

function App() {

  const [budgetData, setBudgetData] = useState([]);
  useEffect(()=>{
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3005/budget');
        const data = response.data.myBudget;
        // Set the data in the state
        setBudgetData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
    }
  }
    fetchData();
  },[]);
  return (
    <Router>
      <Menu/>
      <Hero/>
      <div className='mainContainer'>
        <Switch>
          <Route path='/about'>
            <AboutPage/>
          </Route>
          <Route path='/login'>
            <LoginPage/>
          </Route>
          <Route path='/'>
            <HomePage budgetData={budgetData}/>
          </Route>
        </Switch>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
