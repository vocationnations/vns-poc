import React, {useEffect, useState} from 'react';

import './jobseeker-onboarding-job-selection.css';
import AutoComplete from "../../../../../../components/autocomplete/autocomplete";
import OnBoardingService from "../../../onboarding.service";

const service = new OnBoardingService();

const JobseekerOnboardingJobSelectionComponent = () => {

    const [keyword, setKeyword]                 = useState('')
    const [listSuggestions, setListSuggestions] = useState([]);
    const [loading, setLoading]                 = useState(false);

    useEffect(() => {
        if (keyword !== '') {
            setLoading(true);
            service.getOccupationsByKeyword(
                keyword,
                (data) => {
                    setLoading(false);
                    let suggestions = data.occupation.map(({title}) => title)
                    setListSuggestions(suggestions)
                },
                (error) => {
                    setLoading(false);
                    console.log(error)
                }
            )

        }
    }, [keyword])

    return (<div className="container-fluid text-center">
        <h4>What type of work are you looking for?</h4>
        <div className="vspacer-20"/>
        <AutoComplete setKeyword={setKeyword} listSuggestions={listSuggestions}
                      loading={loading}/>
    </div>);
};

export default JobseekerOnboardingJobSelectionComponent;
