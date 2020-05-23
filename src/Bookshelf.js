import React, {Component} from 'react';
import Book from "./Book";
import * as Str from "./utils/Str";
class Bookshelf extends Component {
    render() {
        const {shelfName, books, onShelfChanged} = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title badge" data-badge={books.length} style={{textTransform: 'capitalize'}}>
                    {Str.camelCaseToWords(shelfName)}
                 </h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            books.map((book) => (
                                <li key={book.id}>
                                    <Book onShelfChanged={onShelfChanged} book={book}/>
                                </li>
                            ))
                        }
                    </ol>
                </div>
            </div>
        );
    }
}

export default Bookshelf;