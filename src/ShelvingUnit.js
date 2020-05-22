import React, {Component} from 'react';
import Bookshelf from "./Bookshelf";
import { Link } from 'react-router-dom';

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
                    <Link className="open-search" to='/search'>Add book</Link>
                </div>
            </div>
        );
    }
}

export default ShelvingUnit;