import React, { Component } from 'react';
import './App.css';
import {  Route } from 'react-router-dom';
import SearchBooks from './SearchBooks';
import HomePage from './HomePage';

class BooksApp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      booksAdded: []
    }

    this.booksAdded = this.booksAdded.bind(this);
  }

  booksAdded(booksAdded) {
    this.setState({
      booksAdded: booksAdded
    })
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => <SearchBooks booksAdded={this.state.booksAdded} /> } />
        <Route exact path="/" render={() => <HomePage booksAdded={this.booksAdded} />} />
      </div>
    )
  }
}

export default BooksApp
