import React, { useState, useEffect } from "react";
import DataAzuki from '../../Data/azukiVolAvgCount'
import kongxData from '../../Data/kongzVolAvgCount'
import Graph from '../../Component/Graph/lineChartGraph'

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';



function transformData(data, daysCriteria, ValueChecked) {


    let graphData = []

    for (let i = 0; i < data.length; i++) {

        if (daysCriteria === 'all') {

            graphData.push([new Date(data[i].day).getTime(), data[i][ValueChecked]])
        } else {
            let date1 = new Date(data[i].day);
            let date2 = new Date();
            let diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24), 10);
            if (diffDays <= 31) {
                graphData.push([new Date(data[i].day).getTime(), data[i][ValueChecked]])
            }
        }
    }

    return graphData
}
function App() {

    const [daysCriteria, setDaysCriteria] = useState('all')

    const [ValueChecked, setValueChecked] = useState('volume')


    const setDays = (value) => {

        setDaysCriteria(value)
    }

    const seTcheckedvalue = (isChecked, col) => {

        setValueChecked(col)
    }

    let DataAzukiGraph = transformData(DataAzuki(), daysCriteria, ValueChecked)

    let kongxDataGraph = transformData(kongxData(), daysCriteria, ValueChecked)

    return (
        <div className="App">

            <ButtonGroup aria-label="outlined primary button group">
                <Button variant={daysCriteria === 'all' ? "contained" : 'outlined'} onClick={() => { setDays('all') }}>All time</Button>
                <Button variant={daysCriteria === '31Days' ? "contained" : 'outlined'} onClick={() => { setDays('31Days') }}>31 Days</Button>
            </ButtonGroup>

            <FormControlLabel
                control={<Checkbox
                    checked={ValueChecked === 'txCount' ? true : false}
                    onChange={(event) => { seTcheckedvalue(event.target.checked, 'txCount') }}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />}
                label="txCount"
                labelPlacement="start"
            />
            <FormControlLabel
                control={<Checkbox
                    checked={ValueChecked === 'averageValue' ? true : false}
                    onChange={(event) => { seTcheckedvalue(event.target.checked, 'averageValue') }}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />}
                label="Average Value"
                labelPlacement="start"
            />
            <FormControlLabel
                control={<Checkbox
                    checked={ValueChecked === 'volume' ? true : false}
                    onChange={(event) => { seTcheckedvalue(event.target.checked, 'volume') }}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />}
                label="Volume"
                labelPlacement="start"
            />
            <Graph DataAzukiGraph={DataAzukiGraph} kongxDataGraph={kongxDataGraph} />
        </div>
    );
}

export default App;