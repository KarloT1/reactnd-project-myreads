import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'

class MoveBook extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }

    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  handleSelectChange(event) {
    const objectId = {
      id: event.target.id
    } 

    BooksAPI.update(objectId, event.target.value).then(data => console.log(data))
  }

  render() {
    return (
      <div className="book-shelf-changer">
        <select 
          onChange={this.handleSelectChange}
          id={this.props.id}
          defaultValue={this.props.defaultValue}
        >
          <option disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default MoveBook