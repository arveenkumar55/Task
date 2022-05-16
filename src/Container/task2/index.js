import React, { useState, useEffect } from "react";
import DataAzuki from  '../../Data/azukiMintAnalysis'
import kongxData from '../../Data/kongzMintAnalysis'
import Graph from '../../Component/Graph/MultiAxesGraph'

import MomentumGraph from '../../Component/Graph/simpleLineGraph'


import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


function App() {

  const [value, setValue] = useState(DataAzuki())

  const [ValueChecked, setValueChecked] = useState('DataAzuki')


  const seTcheckedvalue = (isChecked, col) => {

    setValueChecked(col)


    if(col === 'DataAzuki') {
      setValue(DataAzuki())
    } else {
      setValue(kongxData())
    }
  }



  let MultiAxespayload = {
    yAxisLeftData: [],
    yAxisRightData: [],
    title : 'Analysis'
  }

  let momentumPayload = {
    DataAzukiGraph: [],
    kongxDataGraph: [],
    title : 'Momentum'
  }

  for (let i = 0; i < value.length; i++) {


    MultiAxespayload.yAxisLeftData.push([new Date(value[i].mintTime).getTime(), value[i].mintsCount])

    MultiAxespayload.yAxisRightData.push([new Date(value[i].mintTime).getTime(), value[i].totalMints])

  }


  for (let i = 0; i < DataAzuki().length; i++) {

    momentumPayload.DataAzukiGraph.push([new Date(DataAzuki()[i].mintTime).getTime(), DataAzuki()[i].mintsMomentum])

    momentumPayload.kongxDataGraph.push([new Date(DataAzuki()[i].mintTime).getTime(), kongxData()[i].mintsMomentum])

  }

  return (
    <div className="App">

      <FormControlLabel
        control={<Checkbox
          checked={ValueChecked === 'DataAzuki' ? true : false}
          onChange={(event) => { seTcheckedvalue(event.target.checked, 'DataAzuki') }}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />}
        label="DataAzuki"
        labelPlacement="start"
      />
      <FormControlLabel
        control={<Checkbox
          checked={ValueChecked === 'kongxData' ? true : false}
          onChange={(event) => { seTcheckedvalue(event.target.checked, 'kongxData') }}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />}
        label="DataKongx"
        labelPlacement="start"
      />

      <Graph payload={MultiAxespayload} />

      <MomentumGraph payload= {momentumPayload} />
    </div>
  );
}

export default App;
