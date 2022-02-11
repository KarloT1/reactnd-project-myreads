import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class HomePage extends Component {
  constructor(props) {
    super(props)

    this._isMounted = false;

    this.state = {
      booksAdded: [] 
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.booksAdded !== this.state.booksAdded) {
      this.fetchAddedBooks()
    }
  }
  
  componentDidMount() {
    this._isMounted = true;

    this.fetchAddedBooks()
  }

  fetchAddedBooks() {
    BooksAPI.getAll().then(books => {
      if (this._isMounted) {
        this.setState({ 
          booksAdded: books.filter((book) => book.shelf !== "none")
        })
      }
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }


  render() {
    return (
      <div className="list-books">

        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">

          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {this.state.booksAdded
                  .filter((book) => book.shelf === "currentlyReading")
                  .map((book) => (
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

          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {this.state.booksAdded
                  .filter((book) => book.shelf === "wantToRead")
                  .map((book, bookIndex) => (
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

          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {this.state.booksAdded
                  .filter((book) => book.shelf === "read")
                  .map((book) => (
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

        </div>

        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>

      </div>
    )
  }
}

export default HomePage