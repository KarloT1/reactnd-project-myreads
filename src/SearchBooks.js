import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './BooksAPI';

class SearchBooks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searched: [],
      query: ""
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      query: event.target.value
    })

    if (this.state.query === "") {
      this.setState({
        searched: []
      })
    } else {
      BooksAPI.search(this.state.query).then((searched) => {
        if (searched && searched.error) {
          this.setState({
            searched: []
          })
        } else {
          this.setShelves(searched);
        }
      })
    }
  }

  setShelves(searched) {
    const booksAdded = this.props.booksAdded;
    searched.forEach((searchedBook) => {
      booksAdded.forEach((bookAdded) => {
        if (searchedBook.id === bookAdded.id) { // matching homepage books and searched books
        searchedBook.shelf = bookAdded.shelf;
        }
      })
      this.setState({
        searched: searched
      })
    })
  }

  render() {
    const { searched, query } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.handleChange}
              value={query}
              name="query"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              searched.map((book) => (
                <Book
                  imageLinks={book.imageLinks}
                  title={book.title}
                  authors={book.authors}
                  id={book.id}
                  key={book.id}
                  shelf={book.shelf}
                />
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks