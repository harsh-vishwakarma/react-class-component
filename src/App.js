import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import Board from './components/Board';

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
      <div>
        <NavBar />
        <Board pageSizeList={this.pageSizeList} pageSize={this.state.pageSize} switchPageSize={this.switchPageSize}/>
      </div>
    )
  }
}
