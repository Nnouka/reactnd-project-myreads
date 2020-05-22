import React, {Component} from 'react';
import ShelfChanger from "./ShelfChanger";

class Book extends Component {
    handleShelfChanged = (shelfName) => {
        const {book} = this.props;
        this.props.onShelfChanged(book, shelfName);
    }
    render() {
        const {book} = this.props;
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <ShelfChanger onShelfChanged={this.handleShelfChanged} currentShelf={book.shelf}/>
                </div>
                <div className="book-title">{book.title}</div>
                {
                    book.authors.map((author, index) => (
                        <div key={`${book.id}-author-${index}`} className="book-authors">{author}</div>
                    ))
                }
            </div>
        );
    }
}

export default Book;