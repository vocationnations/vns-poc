import React, {useEffect, useState} from 'react';

import './jobseeker-onboarding-job-selection.css';
import AutoComplete
    from "../../../../../../components/autocomplete/autocomplete";
import OnBoardingService from "../../../onboarding.service";
import {useUser} from "../../../../../auth/context/user-provider";
import JobseekerOnboardingService from "../../jobseeker-onboarding.service";

const service   = new OnBoardingService();
const j_service = new JobseekerOnboardingService();


const JobseekerOnboardingJobSelectionComponent = ({advanceStep}) => {

    const {userId} = useUser();

    const [keyword, setKeyword]                 = useState('')
    const [listSuggestions, setListSuggestions] = useState([]);
    const [loading, setLoading]                 = useState(false);
    const [selectedJob, setSelectedJob]         = useState(null);

    useEffect(() => {
        console.log(selectedJob)
    }, [selectedJob])

    useEffect(() => {
        if (keyword !== '') {
            setLoading(true);
            service.getOccupationsByKeyword(
                keyword,
                (data) => {
                    // console.log(data);
                    setLoading(false);
                    let suggestions =
                            data.occupation.map(
                                ({code, title}) => ({
                                    "code" : code,
                                    "title": title
                                }));
                    console.log(suggestions);
                    setListSuggestions(suggestions)
                },
                (error) => {
                    setLoading(false);
                    console.log(error)
                }
            )

        }
    }, [keyword])

    const updateUserProfession = () => {
        j_service.createUserProfession(selectedJob.title, selectedJob.code, userId, (data) => {
            console.log(data)
            advanceStep()
        }, (error) => {
            console.log(error)
        })
    }

    return (<div className="container-fluid text-center">
        <h4>What type of work are you looking for?</h4>
        <div className="vspacer-20"/>
        {selectedJob && <button className="btn btn-success"
                                onClick={() => updateUserProfession()}>Next
                                                                       Step</button>}
        <div className="vspacer-20"/>
        <AutoComplete setKeyword={setKeyword} listSuggestions={listSuggestions}
                      loading={loading} setSelected={setSelectedJob}/>
    </div>);
};

export default JobseekerOnboardingJobSelectionComponent;
