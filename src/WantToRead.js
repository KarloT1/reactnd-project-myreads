import React, { Component } from 'react'
import MoveBook from './moveBook'

class WantToRead extends Component {
  constructor(props) {
    super(props)
    this.state = {
      booksArray: [],
      wantToRead: []
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.booksArray !== this.props.booksArray) {
      this.setState({
        booksArray: this.props.booksArray
      }, () => this.getWantToRead())
    }
  }

  getWantToRead() {
    const wantToReadArray = []
    this.state.booksArray.map((books) => {
      if (books.shelf === "wantToRead") {
        wantToReadArray.push(books)
      }
    })
    this.setState({
      wantToReadArray: wantToReadArray
    })
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Want To Read</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.state.wantToReadArray && this.state.wantToReadArray.map((book, index) => (
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

export default WantToRead