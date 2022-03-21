import React, {useEffect, useState} from "react";
import Chart from 'react-apexcharts'
import {ICultureRadialProps} from "./culture-radial.interfaces";

const state = {
    options: {
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories: ["Clan", "Adhocracy", "Market", "Hierarchy"]
        }
    }
};

const initialSeries = [
    {
        name: "Tesla Inc.",
        data: [100, 30, 40, 100]
    },
    {
        name: "Activision Inc.",
        data: [30, 100, 50, 20]
    },
    {
        name: "Zappios Inc.",
        data: [90, 20, 100, 20]
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
            <h6 className="text-center">Culture Radial</h6>
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
