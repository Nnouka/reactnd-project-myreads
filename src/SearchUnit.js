import React, {Component} from 'react';
import SearchBar from "./SearchBar";
import SearchBookResults from "./SearchBookResults";
import * as BooksAPI from './BooksAPI';

class SearchUnit extends Component {
    state = {
        books: [

        ],
        error: ''
    }
    handleQuery = (query) => {
        BooksAPI.search(query).then((res) => {
            if(res && res.error) this.setState(() => ({error: res.error}));
            else if(res && res.length > 0) {
               this.setState(() => ({error: '', 
                                        books: res.map((book) => {
                                            const {shelfIndexes} = this.props;
                                            for(const element in shelfIndexes){
                                                if(shelfIndexes[element].findIndex((s) => s === book.id) > -1) {
                                                    book['shelf'] = element;
                                                    console.log(book);
                                                }
                                            }
                                            return book;
                                        })
                                    }))
            }
        });
    }
    render() {
        const {books, error} = this.state;
        const {onShelfChanged} = this.props;
        // console.log(books);
        return (
            <div className="search-books">
                <SearchBar onQueryInput={this.handleQuery} />
                <SearchBookResults onShelfChanged={onShelfChanged} books={books} error={error}/>
            </div>
        );
    }
}

export default SearchUnit;