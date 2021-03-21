import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import style from './Component/css/app.module.css'
import Header from './Component/Header'
import Section from './Component/Section'
import { DataProvider } from './ContextApi/Context';


class App extends Component {

  render() {
    return (
      <DataProvider>
        <div className={style.app}>
          <Router>
            <Header />
            <Section />
          </Router>
        </div>
      </DataProvider>
    );
  }
}

export default App;
