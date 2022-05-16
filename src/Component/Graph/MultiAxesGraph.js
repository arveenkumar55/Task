import React  from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'



function getOption (payload) {

  
const option =  {
  chart: {
    zoomType: 'xy'
},
title: {
    text: payload.title
},
xAxis: {
    type: 'datetime',
    labels: {
      format: "{value:%H:%M %p}",
      rotation: -50,
      align: 'right'
    }
    // categories: payload.categories,
    // crosshair: true
},
yAxis: [{ // Primary yAxis
    labels: {
        format: '{value}',
        style: {
            color: Highcharts.getOptions().colors[1]
        }
    },
    title: {
        text: 'totalMints',
        style: {
            color: Highcharts.getOptions().colors[1]
        }
    }
}, { // Secondary yAxis
    title: {
        text: 'mintsCount',
        style: {
            color: Highcharts.getOptions().colors[0]
        }
    },
    labels: {
        format: '{value}',
        style: {
            color: Highcharts.getOptions().colors[0]
        }
    },
    opposite: true
}],
tooltip: {
    shared: true
},
legend: {
    layout: 'vertical',
    align: 'left',
    x: 120,
    verticalAlign: 'top',
    y: 100,
    floating: true,
    backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || // theme
        'rgba(255,255,255,0.25)'
},
series: [{
    name: 'mintsCount',
    type: 'spline',
    yAxis: 1,
    data: payload.yAxisLeftData,
    marker: {
      enabled: false
    },
    tooltip: {
    }

}, {
    name: 'totalMints',
    type: 'spline',
    data: payload.yAxisRightData,
    marker: {
      enabled: false
    },
    tooltip: {
    }
}]
}
 return option
}
const  Graph = ({payload}) => {



    let option = getOption(payload)

    return (
    <HighchartsReact highcharts={Highcharts} options={option} />
    )
}

export default Graph