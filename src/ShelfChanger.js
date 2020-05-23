import React, {Component} from 'react';

class ShelfChanger extends Component {
    handleShelfChange = (e) => {
        e.preventDefault();
        this.props.onShelfChanged(e.target.value);
    }
    render() {
        const shelfNames = [
            {name: 'currentlyReading', displayName: 'Currently Reading'},
            {name: 'wantToRead', displayName: 'Want to Read'},
            {name: 'read', displayName: 'Read'}
        ];
        const {currentShelf} = this.props;
        return (
            <div className="book-shelf-changer">
                <form>
                    <select defaultValue={currentShelf || 'none'} onChange={this.handleShelfChange}>
                        <option value="move" disabled>Move to...</option>
                        {
                            shelfNames.map((shelfName) => (
                                <option key={`${currentShelf}-${shelfName.name}`} value={shelfName.name}>
                                    {shelfName.displayName}
                                </option>
                            ))
                        }
                        <option value="none">None</option>
                    </select>
                </form>
            </div>
        );
    }
}

export default ShelfChanger;