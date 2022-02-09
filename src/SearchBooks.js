import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import MoveBook from './moveBook';

class SearchBooks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: "",
      searched: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.value !== this.state.value) {
      this.fetchSearch()
    }
  }

  fetchSearch() {
    BooksAPI.search(this.state.value).then((searched) => {
      this.setState({
        searched: searched
      })
    })
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    })
  }

  handleSelectChange(event) {
    const objectId = {
      id: event.target.id
    }
    BooksAPI.update(objectId, event.target.value).then(data => console.log(data))
  }

  render() {
    console.log(this.state.searched)
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              placeholder="Search by title or author"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              this.state.searched.map((book, index) => (
                <li key={index}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover">
                        <img src={`${book.imageLinks && book.imageLinks.thumbnail}`} alt="Book cover"/>
                      </div>
                      <MoveBook id={book.id} defaultValue={book.shelf} />
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">
                      {
                        book.authors && book.authors.map((author, authorIndex) => (
                          <p key={authorIndex}>{author}</p>
                        ))
                      }
                    </div>
                  </div>
                </li>
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks