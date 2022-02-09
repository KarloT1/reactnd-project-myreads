import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {  Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import HomePage from './HomePage'

class BooksApp extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       booksArray: []
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.booksArray !== this.state.booksArray) {
      this.fetchBooks()
    }
  }

  componentDidMount() {
    this.fetchBooks()
  }

  fetchBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        booksArray: books
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => <SearchBooks booksArray={this.state.booksArray} /> } />
        <Route exact path="/" render={() => <HomePage booksArray={this.state.booksArray} />} />
      </div>
    )
  }
}

export default BooksApp
