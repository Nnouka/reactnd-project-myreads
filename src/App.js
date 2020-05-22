import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css';
import ShelvingUnit from './ShelvingUnit';
import SearchUnit from './SearchUnit';
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    shelves: [

    ],
    books: [

    ]
  }
  
  componentDidMount() {
    BooksAPI.getAll()
        .then((books) => {
            const shelves = [];
            // sort and push books to their various shelves
            for (let book of books) {
                const index = shelves.findIndex((s) => s.name === book.shelf);
                if (index > -1) {
                    shelves[index].books.push(book);
                } else {
                    shelves.push({name: book.shelf, books: [book]});
                }
            }
            // `url(${book.imageLinks.thumbnail})`
            // set the state
          this.setState(() => ({shelves, books}));
        });
  }
  handleShelfChanged = (book, toShelf) => {
    const {shelves, books} = this.state;
      // change book shelf
      const index = books.findIndex((f) => f.id === book.id);
      if(index > -1) {
        books[index].shelf = toShelf;
      }
      // persist change to api
      BooksAPI.update(book, toShelf).then((updates) => {
       const rearranged = shelves.map((shelf) => (
        {name: shelf.name, books: books.filter((b) => updates[shelf.name].findIndex((id) => id === b.id) > -1)}
       ));
        this.setState(() => ({shelves: rearranged, books: books}));
      });
  }
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ShelvingUnit onShelfChanged={this.handleShelfChanged} shelves={this.state.shelves} />
        )} />
        <Route exact path='/search' render={() => (
          <SearchUnit onShelfChanged={this.handleShelfChanged} />
        )} />
      </div>
    )
  }
}

export default BooksApp
