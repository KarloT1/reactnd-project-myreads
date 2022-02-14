import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

class Book extends Component {
  constructor(props) {
    super(props)

    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(event) {
    const objectId = {
      id: this.props.id
    }

    BooksAPI.update(objectId, event.target.value);
  }

  render() {
    return (
      <React.Fragment>
        <li>
          <div className="book">
            <div className="book-top">
              <div className="book-cover">
                <img src={`${this.props.imageLinks && this.props.imageLinks.thumbnail}`} alt="Book cover"/>
              </div>
              <div className="book-shelf-changer">
                <select
                  value={this.props.shelf ? this.props.shelf : "move"}
                  onChange={this.handleSelectChange}
                >
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{this.props.title}</div>
              <div className="book-authors">
                {
                  this.props.authors && this.props.authors.map((author, authorIndex) => (
                    <p key={authorIndex}>{author}</p>
                  ))
                }
              </div>
          </div>
        </li>
      </React.Fragment>
    )
  }
}

export default Book