import React, {useEffect, useState} from "react";
import Chart from 'react-apexcharts'
import {ICultureRadialProps} from "./culture-radial.interfaces";

const state = {
    options: {
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories: ["Adhocracy", "Hierarchy", "Clan", "Market"]
        }
    }
};

const initialSeries = [
    {
        name: "VocationNations",
        data: [44, 76, 78, 13]
    },
    {
        name: "POP_THIS!",
        data: [0, 0, 0, 0]
    }
];

const CultureRadialComponent: React.FunctionComponent<ICultureRadialProps> = ({userSeries}) => {

    const [series, setSeries] = useState(initialSeries);

    useEffect(() => {
        setSeries(prev => {
            let newSeries = [...prev]
            newSeries.pop();
            newSeries.push({name: "You", data: userSeries})
            return newSeries
        })
    }, [userSeries]);

    return (
        <div className="container">
            <h4 className="text-center">Culture Radial</h4>
            <Chart
                options={state.options}
                series={series}
                type="radar"
                width="500"
            />
        </div>
    );
};

export default CultureRadialComponent;
