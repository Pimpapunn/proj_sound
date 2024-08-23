function toggleHam(x) {
    x.classList.toggle("change");

    let myMenu = document.getElementById('myMenu');
    if (myMenu.className === 'menu') {
        myMenu.className += ' menu-active'
    } else {
        myMenu.className = 'menu';
    }
}

// sound
var optionsSound = {
    series: [
        {
            name: 'Holidays',
            data: [49.53,
                49.58,
                49.71,
                49.60,
                49.54,
                49.53,
                49.37
            ]
        },
        {
            name: 'Workdays',
            data: [50.01,
                52.29,
                52.10,
                51.50,
                50.77,
                51.22,
                51.26,
                51.40,
                52.20
            ]
        }
    ],


    chart: {
        height: 350,
        type: 'line',
        dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
        },
        zoom: {
            enabled: false
        },
        toolbar: {
            show: false
        }
    },
    colors: ['#77B6EA', '#545454'],
    dataLabels: {
        enabled: true,
    },
    stroke: {
        curve: 'smooth'
    },
    title: {
        text: 'Average High & Low Temperature',
        align: 'left'
    },
    grid: {
        borderColor: '#e7e7e7',
        row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
        },
    },
    markers: {
        size: 1
    },
    xaxis: {
        categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        title: {
            text: 'Date'
        }
    },
    yaxis: {
        title: {
            text: 'Sound level dB(A)'
        },
        min: 30,
        max: 60
    },
    legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -2
    }
};

var chartsound = new ApexCharts(document.querySelector("#chartSound"), optionsSound);
chartsound.render();

// //graph2
// var options = {
//     series: [{
//         name: 'Flies',
//         data: data1
//     }, {
//         name: 'Spiders',
//         data: data2
//     }],
//     chart: {
//         id: 'chart2',
//         type: 'line',
//         height: 230,
//         dropShadow: {
//             enabled: true,
//             enabledOnSeries: [1]
//         },
//         toolbar: {
//             autoSelected: 'pan',
//             show: false
//         }
//     },
//     colors: ['#008FFB', '#00E396'],
//     stroke: {
//         width: 3
//     },
//     dataLabels: {
//         enabled: false
//     },
//     stroke: {
//         width: [2, 6],
//         curve: ['straight', 'monotoneCubic']
//     },
//     fill: {
//         opacity: [1, 0.75],
//     },
//     markers: {
//         size: 0
//     },
//     yaxis: [
//         {
//             seriesName: 'Flies',
//             axisTicks: {
//                 show: true,
//                 color: '#008FFB'
//             },
//             axisBorder: {
//                 show: true,
//                 color: '#008FFB'
//             },
//             labels: {
//                 style: {
//                     colors: '#008FFB',
//                 }
//             },
//             title: {
//                 text: "Flies",
//                 style: {
//                     color: '#008FFB'
//                 }
//             },
//         },
//         {
//             seriesName: 'Spiders',
//             opposite: true,
//             axisTicks: {
//                 show: true,
//                 color: '#00E396'
//             },
//             axisBorder: {
//                 show: true,
//                 color: '#00E396'
//             },
//             labels: {
//                 style: {
//                     colors: '#00E396'
//                 }
//             },
//             title: {
//                 text: "Spiders",
//                 style: {
//                     color: '#00E396'
//                 }
//             },
//         }
//     ],
//     xaxis: {
//         type: 'datetime'
//     }
// };

// var chart = new ApexCharts(document.querySelector("#chart-line2"), options);
// chart.render();


// var optionsLine = {
//     series: [{
//         name: 'Flies',
//         data: data1
//     }, {
//         name: 'Spiders',
//         data: data2
//     }],
//     chart: {
//         id: 'chart1',
//         height: 130,
//         type: 'area',
//         brush: {
//             target: 'chart2',
//             enabled: true
//         },
//         selection: {
//             enabled: true,
//             xaxis: {
//                 min: new Date('24 April 2017').getTime(),
//                 max: new Date('29 May 2017').getTime()
//             }
//         },
//     },
//     colors: ['#008FFB', '#00E396'],
//     stroke: {
//         width: [1, 3],
//         curve: ['straight', 'monotoneCubic']
//     },
//     fill: {
//         type: 'gradient',
//         gradient: {
//             opacityFrom: 0.91,
//             opacityTo: 0.1,
//         }
//     },
//     xaxis: {
//         type: 'datetime',
//         tooltip: {
//             enabled: false
//         }
//     },
//     yaxis: {
//         max: 100,
//         tickAmount: 2
//     }
// };

// var chartLine = new ApexCharts(document.querySelector("#chart-line"), optionsLine);
// chartLine.render();
