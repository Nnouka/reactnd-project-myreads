import React, {Component} from 'react';
import Book from "./Book";

class SearchBookResults extends Component {
    render() {
        return (
            <div className="search-books-results">
                <ol className="books-grid">
                    <Book />
                    <Book />
                    <Book />
                </ol>
            </div>
        );
    }
}

export default SearchBookResults;