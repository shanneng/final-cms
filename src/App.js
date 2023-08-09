import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Create from "./Components/Create";
import Update from './Components/Update';
import View from './Components/View';
import PageError from './Components/PageError';

function App () { 
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element= {<Home/>}></Route>
          <Route path='/create' element= {<Create/>}></Route>
          <Route path='/update/:id' element= {<Update/>}></Route>
          <Route path='/view/:id' element= {<View/>}></Route>
          <Route path="*" element={<PageError/>}></Route>
        </Routes>
      </BrowserRouter>
    )
}

export default App;
