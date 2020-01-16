import React from 'react';

class NumberResults extends React.Component{
    render () {
        return (
            <div>
                There are <span className="text-blue-600">{this.props.nResults}</span> results.
            </div>
        )
    }
}
export default NumberResults;