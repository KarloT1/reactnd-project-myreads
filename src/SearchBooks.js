import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './BooksAPI';

class SearchBooks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
      searched: []
    }
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(event) {
    await BooksAPI.search(event.target.value).then((searched) => {
      this.setState({
        searched: searched
      })
    })
  }

  render() {
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
              this.state.searched.map((book) => (
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