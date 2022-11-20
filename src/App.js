import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import Board from './components/Board';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Table from './components/Table';
import About from './components/About';

export default class App extends Component {
  
  pageSizeList=[6, 12, 30]
  constructor(){
    super()
    this.state = {
      pageSize: this.pageSizeList[0]
    }
  }
  switchPageSize = (e)=>{
    e.preventDefault();
    if(Number(e.target.text) > 0){
      this.setState({
        pageSize: e.target.text
      })
    }
  }
  render() {
    return (
      <BrowserRouter basename='react-class-component' >
        <NavBar />
        <Routes>
          <Route />
          <Route path="/" element={<Board pageSizeList={this.pageSizeList} pageSize={this.state.pageSize} switchPageSize={this.switchPageSize}/>} />
          <Route path="colors" element={<Table pageSizeList={this.pageSizeList} pageSize={this.state.pageSize} switchPageSize={this.switchPageSize}/>} />
          <Route path="about" element={<About />} />
          
      
        </Routes>
      </BrowserRouter>
    )
  }
}
