//responsive buttons
$(window).resize(function() {
  if ($(window).width() < 1000) {
    $('#btn-container-1').removeClass('btn-container');
    $('#btn-container-1').addClass('btn-container-horizontal');
  } else {
    $('#btn-container-1').addClass('btn-container');
    $('#btn-container-1').removeClass('btn-container-horizontal');
  }
});

$(window).resize(function() {
  if ($(window).width() < 1000) {
    $('#btn-container-2').removeClass('btn-container');
    $('#btn-container-2').addClass('btn-container-horizontal');
  } else {
    $('#btn-container-2').addClass('btn-container');
    $('#btn-container-2').removeClass('btn-container-horizontal');
  }
});


//number format
const f = d3.format(",.2f")

//Global chart options
Highcharts.setOptions({
  chart: {
      style: {
          fontFamily: 'Work Sans',
      }
  }
});

// *** CHART 1 ***
document.addEventListener('DOMContentLoaded', (event) => {

  d3.csv('01_intro/data/chart1-data.csv', d3.autoType)
  .then(function(data) {

    //load first chart and style settings
    const chart = Highcharts.chart('chart-container1', {
      chart: {
          type: 'line'
      },
      title: {
          text: 'Number of floods 1985-2021',
          align: 'left',
          margin: 35,
          style: {
            fontSize: '25px',
            fontWeight: 700
          }
      },
      subtitle: {
        align: 'left',
          margin: 35,
          style: {
            fontSize: '14px',
          }
      },
      xAxis: {
          labels: {
            style: {
              fontSize: '14px'
            },
            y: 25
          }
      },
      yAxis: {
          title: {
              text: 'Count',
              margin: 20,
              style: {
                fontSize: '18px',
              }
          },
          labels: {
            style: {
              fontSize: '12px'
            }
          }
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointStart: 1985
        }
      },
      tooltip: {
        borderWidth: 0
      },
      annotations: [],
      series: [{
          name: 'trendline',
          data: data.map(x => x.floods_trendline),
          marker: {
            enabled: false
          },
          dashStyle: 'Dot',
          color: 'black',
          opacity: 0.4,
          tooltip: {
            pointFormatter: function() {
              return '<b>Coefficient: </b>0 (not significant)'
            }
          }
        },{
        name: 'count',
        data: data.map(x => x.floods),
        color: '#2a3580',
        lineWidth: 2.5,
        marker: {
          radius: 5,
          symbol: 'circle'
        },
        tooltip: {
          pointFormatter: function() {
            return '<b>Count: </b>' + this.y
          }
        }
      }
      ]
    });
  
    // number of floods
    document.getElementById('chart1-btn-floods').addEventListener('click', (event) => {

      //trendline
      chart.series[0].setData(data.map(x => x.floods_trendline))
      chart.series[0].update({
        tooltip: {
              pointFormatter: function() {
                return '<b>Coefficient: </b>0 (not significant)'
              }
            }
      })
      
      //values
      chart.series[1].setData(data.map(x => x.floods))
      chart.series[1].update({
        tooltip: {
          pointFormatter: function() {
            return '<b>Count: </b>' + this.y
          }
        }
      })

      //labels
      chart.update({
        title: {
          text: 'Number of floods 1985-2021',
        },
        subtitle: {
          text: ''
        },
        yAxis: {
          title: {
            text: 'Count'
          }
        }
      })

      chart.removeAnnotation('anno-1')
    });

  
    //average severity
    document.getElementById('chart1-btn-severity').addEventListener('click', (event) => {

      //trendline
      chart.series[0].setData(data.map(x => x.severity_trendline))
      chart.series[0].update({
        tooltip: {
              pointFormatter: function() {
                return '<b>Coefficient: </b>0.008'
              }
            }
      })

      //values
      chart.series[1].setData(data.map(x => x.severity))
      chart.series[1].update({
        tooltip: {
              pointFormatter: function() {
                return '<b>Average: </b>' + f(this.y)
              }
            }
      })
      
      //labels
      chart.update({
        title: {
          text: 'Average severity of floods 1985-2021',
        },
        subtitle: {
          text: '*severity is measured on a 3-point scale, where 1=large event, 1.5=very large event and 2=extreme event'
        },
        yAxis: {
          title: {
            text: 'Average'
          }
        }
      })

      chart.removeAnnotation('anno-1')
    });

    //average deaths per flood
    document.getElementById('chart1-btn-deaths').addEventListener('click', (event) => {

      //trendline
        chart.series[0].setData(data.map(x => x.deaths_trendline))
        chart.series[0].update({
          tooltip: {
                pointFormatter: function() {
                  return '<b>Coefficient: </b>0 (not significant)'
                }
              }
        })
        
        //values
        chart.series[1].setData(data.map(x => x.deaths))
        chart.series[1].update({
          tooltip: {
            pointFormatter: function() {
              return '<b>Average: </b>' + f(this.y)
            }
          }
        })
        
        //labels
        chart.update({
          title: {
            text: 'Average number of deaths per flood 1985-2021',
          },
          subtitle: {
            text: ''
          },
          yAxis: {
            title: {
              text: 'Average'
            }
          }
        })

        chart.addAnnotation({
          draggable: '',
          labelOptions: {
              shape: 'connector',
              align: 'left',
              justify: false,
              crop: true,
              style: {
                  fontSize: '1.2em',
                  textOutline: '1px white'
              }
          },
          id: 'anno-1',
          labels: [{
            point: { x: 1991, y: 1230, xAxis:0, yAxis:0 },
            text: '1991 Bangladesh cyclone'
          },
          {
            point: { x: 2004, y: 892, xAxis:0, yAxis:0 },
            text: 'Boxing Day tsunami'
          },
          {
            point: { x: 2008, y: 597, xAxis:0, yAxis:0 },
            text: 'Myanmar Cyclone Nargis'
          }
        ]
        })
    });

  
    //average displaced per flood
    document.getElementById('chart1-btn-displaced').addEventListener('click', (event) => {

        //trendline
        chart.series[0].setData(data.map(x => x.displaced_trendline))
        chart.series[0].update({
          tooltip: {
                pointFormatter: function() {
                  return '<b>Coefficient: </b>-4,781'
                }
              }
        })
        
        //values
        chart.series[1].setData(data.map(x => x.displaced))
        chart.series[1].update({
          tooltip: {
            pointFormatter: function() {
              return '<b>Average: </b>' + f(this.y)
            }
          }
        })
        
        //labels
        chart.update({
          title: {
            text: 'Average number of displaced people per flood 1985-2021',
          },
          subtitle: {
            text: ''
          },
          yAxis: {
            title: {
              text: 'Average'
            }
          }
        })

        chart.removeAnnotation('anno-1')
    });
  
  })
    
    

});

// *** CHART 2 ***
function createDataChart2 (data, variable, filter) {

  //sort data
  let chartData = data.sort((a, b) => b[variable] - a[variable])

  //filter data
  if(filter) {
    chartData = chartData.filter(x => x.oecd == 1)
  }

  //assign different color to UK
  let values = chartData.map(function(x) {
    return {y: x[variable], color: (x.country == 'United Kingdom') ? '#57bcd8' : '#2a3580'}
  });

  let categories = chartData.map(x => x.country);

  return {variable: variable, categories: categories, values: values}
}

function updateChart2 (chart, chartData, title) {

  chart.update({
    title: {
      text: title
    },
    xAxis: {
      categories:  chartData.categories.slice(0, 10)
    },
    series: [{
      data: chartData.values.slice(0, 10)
    }]
      
  });
}

document.addEventListener('DOMContentLoaded', (event) => {

  d3.csv('01_intro/data/chart2-data.csv', d3.autoType)
  .then(function(data) {

    let filter = false;
    let activeButton = 'chart2-btn-exposed';

    let chartData = createDataChart2(data, 'exposed_per_flood', filter)

    //load first chart and chart settings
    const chart2 = Highcharts.chart('chart-container2', {
      chart: {
          type: 'column'
      },
      title: {
          text: 'Average number of people exposed per flood 2000-2018',
          align: 'left',
          margin: 35,
          style: {
            fontSize: '25px',
            fontWeight: 700
          }
      },
      xAxis: {
          categories: chartData.categories.slice(0, 10),
          labels: {
            style: {
              fontSize: '14px'
            },
            y: 25
          }
      },
      yAxis: {
          min: 0,
          title: {
            text: 'Average',
            margin: 20,
            style: {
              fontSize: '18px',
            }
        },
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      legend: {
        enabled: false
      },
      tooltip: {
        pointFormatter: function() {
          return '<b>Average: </b>' + f(this.y)
        }
      },
      series: [{
          data: chartData.values.slice(0, 10),
      }]
  
    });
  
    //number of exposed per flood
    document.getElementById('chart2-btn-exposed').addEventListener('click', (event) => {

      chartData = createDataChart2(data, 'exposed_per_flood', filter);
      activeButton = 'chart2-btn-exposed';
      let title = 'Average number of people exposed per flood 2000-2018';

      updateChart2(chart2, chartData, title);
        
    });
  
    //deaths per flood
    document.getElementById('chart2-btn-deaths').addEventListener('click', (event) => {

      chartData = createDataChart2(data, 'dead_per_flood', filter);
      activeButton = 'chart2-btn-deaths';
      let title = 'Average number of deaths per flood 2000-2018';

      updateChart2(chart2, chartData, title);

      });

    //displaced per flood
    document.getElementById('chart2-btn-displaced').addEventListener('click', (event) => {

      chartData = createDataChart2(data, 'displaced_per_flood', filter);
      activeButton = 'chart2-btn-displaced';
      let title = 'Average number of displaced people per flood 2000-2018';
  
      updateChart2(chart2, chartData, title);
  
      });

      //OECD checkbox
      var oecdCheckbox = document.getElementById('chart2-cbx-oecd');

      oecdCheckbox.addEventListener('change', function() {
        if (this.checked) {

          //change filter status
          filter = true

          document.getElementById(activeButton).click()
          document.getElementById(activeButton).focus()

        } else {

          //change filter status
          filter = false

          document.getElementById(activeButton).click()
          document.getElementById(activeButton).focus()
        }
      });

  })



});

