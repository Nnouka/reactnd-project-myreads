import React, {Component} from 'react';
import SearchBar from "./SearchBar";
import SearchBookResults from "./SearchBookResults";

class SearchUnit extends Component {
    render() {
        return (
            <div className="search-books">
                <SearchBar />
                <SearchBookResults />
            </div>
        );
    }
}

export default SearchUnit;