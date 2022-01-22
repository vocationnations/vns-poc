import React from 'react';

const ShowSuggestions = ({returnedList, loading, setSelected}) => {

    const [active, setActive] = React.useState(null);

    if (loading) {
        return <div>Loading...</div>
    }

    const handleSelected = (job) => {
        setSelected(job)
        setActive(job.code)
    }

    return returnedList.length > 0 && (
        <div className="list-group">
            {
                returnedList.map((job, idx) => {


                    let _cls = active === job.code ? 'list-group-item' +
                        '  active list-group-item-action' : 'list-group-item list-group-item-action'

                    return (
                        <a href="#" key={idx}
                           onClick={() => handleSelected(job)}
                           className={_cls}>
                            {job.title}
                        </a>
                    )
                })
            }
        </div>
    );
}

const AutoComplete = ({setKeyword, listSuggestions, loading, setSelected}) => {

    return (
        <div className="container w-50">
            <input className="form-control form-control-lg" type="text"
                   placeholder="e.g., Software Engineer, Designer, etc."
                   autoComplete="off"
                   onChange={(e) => setKeyword(e.target.value)}
            />
            <div className="vspacer-20"/>
            <p className="lead">suggestions:</p>
            <ShowSuggestions returnedList={listSuggestions} loading={loading}
                             setSelected={setSelected}/>

        </div>
    );
}
export default AutoComplete;
