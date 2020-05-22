import React, {Component} from 'react';
import Bookshelf from "./Bookshelf";

class ShelvingUnit extends Component {
    render() {
        const {shelves, onShelfChanged} = this.props;
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    {
                        shelves.map((shelf, index) => (
                            <Bookshelf key={index} shelfName={shelf.name} books={shelf.books} onShelfChanged={onShelfChanged} />
                        ))
                    }
                </div>
                <div className="open-search">
                    <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
                </div>
            </div>
        );
    }
}

export default ShelvingUnit;