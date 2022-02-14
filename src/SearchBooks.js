import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './BooksAPI';

class SearchBooks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searched: []
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (event.target.value === "") {
      this.setState({
        searched: []
      })
    } else {
      BooksAPI.search(event.target.value).then((searched) => {
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
    const { searched } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.handleChange}
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