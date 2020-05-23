import React, {Component} from 'react';
import SearchBar from "./SearchBar";
import SearchBookResults from './SearchBookResults';
import * as BooksAPI from './BooksAPI';

class SearchUnit extends Component {
    state = {
        books: [

        ],
        error: ''
    }
    handleQuery = (query) => {
        query.trim() === '' ? this.setState(() => ({error: '', books: []})) :
        BooksAPI.search(query.trim()).then((res) => {
            if(res) {
                if(res.error) this.setState(() => ({error: 
                    `Oops sorry, your search input "${query}" can't be handle at the monment - our server responded with: ${res.error}`,
                books: []}));
                else if(res.length > 0) {
                this.setState(() => ({error: '', 
                                            books: res.map((book) => {
                                                const {shelfIndexes} = this.props;
                                                for(const element in shelfIndexes){
                                                    if(shelfIndexes[element].findIndex((s) => s === book.id) > -1) {
                                                        book['shelf'] = element;
                                                    }
                                                }
                                                return book;
                                            })
                                        }))
                }
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