import React, {Component} from 'react';
import ShelfChanger from "./ShelfChanger";

class Book extends Component {
    handleShelfChanged = (shelfName) => {
        const {book} = this.props;
        this.props.onShelfChanged(book, shelfName);
    }
    render() {
        const {book, smallThumbnail} = this.props;
        /**
         * @description when used in the search unit, return small thumbnails, however if small thumnails
         * @description don't exist, use normal thumbnails - this is the default behavior
         */
        const getThumbnail = () => {
            return book.imageLinks ? 
            (smallThumbnail ? book.imageLinks.smallThumbnail || book.imageLinks.thumbnail
                : book.imageLinks.thumbnail || book.imageLinks.smallThumbnail) : '';
        }
        const getAppropriateStyle = () => {
            const imgeUrl = getThumbnail();
            return {width: 128, height: 193, backgroundImage: `url(${imgeUrl})`}
        }
        const style = getAppropriateStyle();

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={style} alt='book cover'></div>
                    <ShelfChanger onShelfChanged={this.handleShelfChanged} currentShelf={book.shelf}/>
                </div>
                <div className="book-title">{book.title}</div>
                {
                    book.authors === undefined ? <div className="book-authors">Anonymous</div> : book.authors.map((author, index) => (
                        <div key={`${book.id}-author-${index}`} className="book-authors">{author}</div>
                    ))
                }
            </div>
        );
    }
}

export default Book;