import React, {Component} from 'react';
import { Link } from 'react-router-dom';
class SearchBar extends Component {
    state = {
        query: ''
    }
    handleQuery = (e) => {
        e.preventDefault();
        if(this.props.onQueryInput) {
            this.props.onQueryInput(e.target.value);
        }
    }
    render() {
        return (
            <div className="search-books-bar">
                <Link className="close-search" to='/'>Close</Link>
                <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" onChange={this.handleQuery} />
                </div>
            </div>
        );
    }
}

export default SearchBar;