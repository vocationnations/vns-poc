import React from 'react';

const ShowSuggestions = ({returnedList, loading}) => {
    if (loading) {
        return <div>Loading...</div>
    }

    return returnedList.length > 0 && (
        <div className="list-group">
            {
                returnedList.map((suggestion) => (
                    <a href="#"
                       className="list-group-item list-group-item-action">
                        {suggestion}
                    </a>
                ))
            }
        </div>
    );
}

const AutoComplete = ({setKeyword, listSuggestions, loading}) => {

    return (
        <div className="container w-50">
            <input className="form-control form-control-lg" type="text"
                   placeholder="e.g., Software Engineer, Designer, etc."
                   autoComplete="off"
                   onChange={(e) => setKeyword(e.target.value)}
            />
            <div className="vspacer-20"/>
            <p className="lead">suggestions:</p>
            <ShowSuggestions returnedList={listSuggestions} loading={loading}/>

        </div>
    );
}
export default AutoComplete;
