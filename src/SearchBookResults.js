import React, {Component} from 'react';
import Book from './Book';

class SearchBookResults extends Component {
    render() {
        const {books, onShelfChanged, error} = this.props;
        // console.log(books);
        return (
            <div className="search-books-results">
                {
                    error !== '' && (
                    <div className='alert-danger'>{error}</div>
                    )
                }
                <ol className="books-grid">
                {
                    books.map((book) => (
                        <li key={`search-${book.id}`}>
                            <Book onShelfChanged={onShelfChanged} book={book} smallThumbnail={true} />
                        </li>
                    ))
                }
                </ol>
            </div>
        );
    }
}

export default SearchBookResults;