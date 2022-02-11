import React, { Component } from 'react'
import './App.css'
import {  Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import HomePage from './HomePage'

class BooksApp extends Component {
  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => <SearchBooks /> } />
        <Route exact path="/" render={() => <HomePage />} />
      </div>
    )
  }
}

export default BooksApp
