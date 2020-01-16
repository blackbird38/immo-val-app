import React from 'react';

class SearchInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchTerm: ''
        }
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    search(e){
        this.props.onSearch(this.state.searchTerm);
       e.preventDefault();
    }

    handleTermChange(e){
        this.setState({searchTerm: e.target.value});
      //  console.log(this.state.searchTerm);
    }
    render () {
        return (
            <form className="w-full max-w-sm p-4"
                   onSubmit={this.search}//executing the function in the parent with the value in the state
            >
                <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
                    <input
                        onChange={this.handleTermChange}  //each time there is something written in the input field
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text" placeholder="Type a code" aria-label="Code"/>
                    <button
                        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                        type="submit">
                        Search
                    </button>
                </div>
            </form>
        );
    }
}

export default SearchInput;