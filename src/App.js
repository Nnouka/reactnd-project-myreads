import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css';
import ShelvingUnit from './ShelvingUnit';
import SearchUnit from './SearchUnit';
import { Route, Switch } from 'react-router-dom';
import ErrorPage404 from './ErrorPage404';

class BooksApp extends React.Component {
  state = {
    shelves: [

    ],
    books: [

    ],
    shelfIndexes: {
      
    }
  }
  placeBookOnShelf(book, shelves, shelfIndexes) {
    const index = shelves.findIndex((s) => s.name === book.shelf);
    if (index > -1) {
        shelves[index].books.push(book);
        shelfIndexes[shelves[index].name].push(book.id);
    } else {
        shelves.push({name: book.shelf, books: [book]});
        shelfIndexes[book.shelf] = [book.id];
    }
  }
  componentDidMount() {
    BooksAPI.getAll()
        .then((books) => {
            const shelves = [];
            const shelfIndexes = {};
            // sort and push books to their various shelves
            for (let book of books) {
                this.placeBookOnShelf(book, shelves, shelfIndexes);
            }
            // `url(${book.imageLinks.thumbnail})`
            // set the state
          this.setState(() => ({shelves, books, shelfIndexes}));
        });
  }
  handleShelfChanged = (book, toShelf) => {
    const {shelves, books, shelfIndexes} = this.state;
      // change book shelf
      const index = books.findIndex((f) => f.id === book.id);
      if(index > -1) {
        books[index].shelf = toShelf;
      } else {
        // add the book to shelf
        book['shelf'] = toShelf; // since this comes from the search result, we assume book has no shelf
        books.push(book);
        this.placeBookOnShelf(book, shelves, shelfIndexes);
      }
      // persist change to api
      BooksAPI.update(book, toShelf).then((updates) => {
       const rearranged = shelves.map((shelf) => (
        {name: shelf.name, books: books.filter((b) => updates[shelf.name].findIndex((id) => id === b.id) > -1)}
       ));
        this.setState(() => ({shelves: rearranged, books: books, shelfIndexes: updates}));
      });
  }
  render() {
    const {shelves, shelfIndexes} = this.state;
    return (
      <div className="app">
        <Switch>
            <Route exact path='/' render={() => (
              <ShelvingUnit onShelfChanged={this.handleShelfChanged} shelves={shelves} />
            )} />
            <Route exact path='/search' render={({history}) => (
              <SearchUnit onShelfChanged={(book, toShelf) => {
                this.handleShelfChanged(book, toShelf);
                history.push('/');
              }} 
                shelfIndexes={shelfIndexes} />
            )} />
            <Route component={ErrorPage404} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
