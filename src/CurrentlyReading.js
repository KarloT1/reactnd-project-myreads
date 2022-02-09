import React, { Component } from 'react'
import MoveBook from './moveBook'

class CurrentlyReading extends Component {
  constructor(props) {
    super(props)
    this.state = {
      booksArray: [],
      currentlyReading: []
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.booksArray !== this.props.booksArray) {
      this.setState({
        booksArray: this.props.booksArray
      }, () => this.getCurrentlyReading())
    }
  }

  getCurrentlyReading() {
    const currentlyReadingArray = []
    this.state.booksArray.map((books) => {
      if (books.shelf === "currentlyReading") {
        currentlyReadingArray.push(books)
      }
    })
    this.setState({
      currentlyReadingArray: currentlyReadingArray
    })
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Currently Reading</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.state.currentlyReadingArray && this.state.currentlyReadingArray.map((book, index) => (
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

export default CurrentlyReading