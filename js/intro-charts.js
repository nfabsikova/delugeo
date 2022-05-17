Highcharts.setOptions({
  chart: {
      style: {
          fontFamily: 'Work Sans',
      }
  }
});

document.addEventListener('DOMContentLoaded', (event) => {

  const chart = Highcharts.chart('chart-container1', {
      chart: {
          type: 'line'
      },
      title: {
          text: 'Number of floods between 1985 and 2021',
          align: 'left',
          margin: 35,
          style: {
            fontSize: '25px',
            fontWeight: 700
          }
      },
      xAxis: {
          accessibility: {
            rangeDescription: 'Range: 1985 to 2017'
          },
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
              margin: 10,
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
      series: [{
          name: 'trendline',
          data: [138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65],
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
        data: [69,	47,	45,	111,	112,	105,	122,	109,	99,	107,	115,	100,	159,	183,	97,	102,	172,	260,	297,	194,	171,	232,	242,	180,	156,	177,	124,	124,	102,	102,	102,	113,	123,	159,	142,	153,	123],
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

  document.getElementById('chart1-btn-floods').addEventListener('click', (event) => {
    chart.series[0].setData([138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65,	138.65])
    chart.series[0].update({
      tooltip: {
            pointFormatter: function() {
              return '<b>Coefficient: </b>0 (not significant)'
            }
          }
    })
    
    chart.series[1].setData([69,	47,	45,	111,	112,	105,	122,	109,	99,	107,	115,	100,	159,	183,	97,	102,	172,	260,	297,	194,	171,	232,	242,	180,	156,	177,	124,	124,	102,	102,	102,	113,	123,	159,	142,	153,	123])
    chart.update({
      title: {
        text: 'Number of floods between 1985 and 2021',
      },
      yAxis: {
        title: {
          text: 'Count'
        }
      }
    })
});

  document.getElementById('chart1-btn-severity').addEventListener('click', (event) => {
    chart.series[0].setData([1.113, 1.121, 1.128, 1.136, 1.144, 1.152, 1.159, 1.167, 1.175, 1.183, 1.190, 1.198, 1.206, 1.213, 1.221, 1.229, 1.237, 1.244, 1.252, 1.260, 1.268, 1.275, 1.283, 1.291, 1.299, 1.306, 1.314, 1.322, 1.330, 1.337, 1.345, 1.353, 1.361, 1.368, 1.376, 1.384, 1.392])
    chart.series[0].update({
      tooltip: {
            pointFormatter: function() {
              return '<b>Coefficient: </b>0.008'
            }
          }
    })
    chart.series[1].setData([1.29,	1.23,	1.22,	1.16,	1.05,	1.14,	1.11,	1.24,	1.17,	1.13,	1.19,	1.18,	1.14,	1.22,	1.28,	1.18,	1.18,	1.16,	1.10,	1.17,	1.20,	1.17,	1.07,	1.39,	1.27,	1.37,	1.42,	1.38,	1.42,	1.42,	1.43,	1.35,	1.34,	1.35,	1.38,	1.43,	1.43])
    chart.series[1].update({
      tooltip: {
            pointFormatter: function() {
              return '<b>Average: </b>' + this.y
            }
          }
    })
    
    chart.update({
      title: {
        text: 'Average severity of floods between 1985 and 2021',
      },
      yAxis: {
        title: {
          text: 'Average'
        }
      }
    })
});

document.getElementById('chart1-btn-deaths').addEventListener('click', (event) => {
    chart.series[0].setData([129.64, 129.64, 129.64, 129.64, 129.64, 129.64, 129.64, 129.64, 129.64, 129.64, 129.64, 129.64, 129.64, 129.64, 129.64, 129.64, 129.64, 129.64, 129.64, 129.64, 129.64, 129.64, 129.64, 129.64, 129.64, 129.64, 129.64, 129.64, 129.64, 129.64, 129.64, 129.64, 129.64, 129.64, 129.64, 129.64, 129.64, ])
    chart.series[0].update({
      tooltip: {
            pointFormatter: function() {
              return '<b>Coefficient: </b>0 (not significant)'
            }
          }
    })
    
    chart.series[1].setData([43.97,	33.06,	71.51,	56.12,	87.84,	39.71,	1230.89,	80.00,	75.28,	59.82,	65.09,	58.63,	65.16,	116.56,	348.25,	104.88,	32.70,	17.10,	15.36,	892.39,	59.30,	34.45,	51.36,	597.88,	24.39,	46.01,	125.83,	21.43,	93.74,	17.56,	25.59,	58.14,	20.64,	15.53,	14.44,	86.43,	9.57])
    chart.update({
      title: {
        text: 'Average number of deaths between 1985 and 2021',
      },
      yAxis: {
        title: {
          text: 'Average'
        }
      }
    })
});

document.getElementById('chart1-btn-displaced').addEventListener('click', (event) => {
    chart.series[0].setData([221184, 216403, 211622, 206841, 202060, 197279, 192498, 187717, 182936, 178155, 173374, 168593, 163812, 159031, 154250, 149469, 144688, 139907, 135126, 130345, 125564, 120783, 116002, 111221, 106440, 101659,  96878,  92097, 87316, 82535, 77754, 72973, 68192, 63411, 58630, 53849, 49068])
    chart.series[0].update({
      tooltip: {
            pointFormatter: function() {
              return '<b>Coefficient: </b>-4,781'
            }
          }
    })
    
    chart.series[1].setData([84517.52,	188574.09,	32267.02,	183041.97,	78062.66,	142214.15,	145939.61,	119986.47,	354565.72,	80136.19,	422431.57,	128147.53,	40726.67,	234193.99,	588651.76,	492728.05,	220889.94,	78909.38,	72990.15,	262979.65,	113262.94,	80648.26,	147113.52,	123925.71,	54516.95,	119664.85,	63975.52,	49280.25,	68811.02,	38972.11,	27064.52,	28946.28,	21196.08,	34632.57,	37751.43,	19502.18,	28832.67])
    chart.update({
      title: {
        text: 'Average number of displaced people between 1985 and 2021',
      },
      yAxis: {
        title: {
          text: 'Average'
        }
      }
    })
});


});

document.addEventListener('DOMContentLoaded', (event) => {

  const chart2 = Highcharts.chart('chart-container2', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Number of people exposed per flood between 2000 and 2018',
        align: 'left',
        margin: 35,
        style: {
          fontSize: '25px',
          fontWeight: 700
        }
    },
    xAxis: {
        categories: [
          'United Kingdom',
          'India',
          'Bangladesh',
          'Vietnam',
          'Philippines',
          'Pakistan',
          'China',
          'Netherlands',
          'Cambodia',
          'Thailand'
        ]
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Average'
        }
    },
    legend: {
      enabled: false
    },
    series: [{
        data: [{y: 2476304, color: '#57bcd8'}, 1971478, 1514705, 888419, 434556, 424366, 420029, 388823, 273531, 193639],
        color: "#2a3580"

    }]

  });

  document.getElementById('chart2-btn-exposed').addEventListener('click', (event) => {

    chart2.update({
      title: {
        text: 'Number of people exposed per flood between 2000 and 2018'
      },
      xAxis: {
        categories: [
          'United Kingdom',
          'India',
          'Bangladesh',
          'Vietnam',
          'Philippines',
          'Pakistan',
          'China',
          'Netherlands',
          'Cambodia',
          'Thailand'
        ]
      },
      series: [{
        data: [{y: 2476304, color: '#57bcd8'}, 1971478, 1514705, 888419, 434556, 424366, 420029, 388823, 273531, 193639]
      }]
        
    });
      
  });

  document.getElementById('chart2-btn-deaths').addEventListener('click', (event) => {


    chart2.update({
      title: {
        text: 'Number of deaths per flood between 2000 and 2018'
      }, 
      xAxis: {
        categories: [
          'Myanmar',
          'Thailand',
          'El Salvador',
          'Japan',
          'Costa Rica',
          'Cambodia',
          'Dominican Republic',
          'Haiti',
          'Tanzania',
          'Bangladesh',
          'United Kingdom'
        ]
        },

        series: [{
          data: [ 5896,
            3119,
            374,
            307,
            291,
            224,
            177,
            166,
            165,
            162,
            2],
          color: "#2a3580"
  
      }]
      })



    });

});

