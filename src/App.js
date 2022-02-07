import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {  Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import HomePage from './HomePage'

class BooksApp extends React.Component {
  state = {
  }

  componentDidMount() {
    this.fetchBooks()
  }

  fetchBooks() {
    BooksAPI.getAll().then((books) => console.log(books))
  }

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
