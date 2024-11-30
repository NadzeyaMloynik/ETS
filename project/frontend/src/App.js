import React from 'react';
import { BrowserRouter } from "react-router-dom";
import NavBar from './components/common/NavBar';
import FooterComponent from './components/common/Footer';
import AppRouter from './components/common/AppRouter';
import { UserProvider } from './components/common/UserContext';




function App() {

  return (
    <BrowserRouter>
    <UserProvider>
      <div className="App">
        <NavBar />
        <AppRouter/>
        <FooterComponent />
      </div>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
