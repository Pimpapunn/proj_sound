function toggleHam(x) {
    x.classList.toggle("change");

    let myMenu = document.getElementById('myMenu');
    if (myMenu.className === 'menu') {
        myMenu.className += ' menu-active'
    } else {
        myMenu.className = 'menu';
    }
}

var options = {
    series: [{
        name: 'Monday',
        data: [50.204, 53.125, 51.899, 50.180, 50.133, 50.355, 50.390, 50.901, 51.254]
    }, {
        name: 'Tuesday',
        data: [49.541, 55.710, 55.855, 55.124, 52.964, 52.258, 52.084, 53.318, 55.232]
    }, {
        name: 'Wednesday',
        data: [49.745, 49.918, 49.735, 49.839, 49.818, 51.913, 52.309, 50.265, 50.590]
    }, {
        name: 'Thursday',
        data: [50.574, 50.406, 50.911, 50.865, 50.168, 50.367, 50.263, 51.128, 51.725]
    }, {
        name: 'Friday',
        data: [49.259, 49.308, 49.279, 49.297, 49.820, 49.683, 49.538, 49.538, 49.344]
    }, {
        name: 'Saturday',
        data: [, , 49.789, 49.868, 49.607, 49.533, 49.560, 49.525, 49.401]
    },
    {
        name: 'Sunday',
        data: [, , 50.402, 50.194, 49.676, 49.252, 49.243, 49.247, 49.246]
    }],
    chart: {
        type: 'bar',
        height: 350
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: 1,
        colors: ['transparent']
    },
    xaxis: {
        categories: ['8.00-9.00', '9:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00'],
    },
    yaxis: {
        title: {
            text: 'Sound Level dB(A)'
        },
        min: 44, // ค่าต่ำสุดของแกน y
        max: 58, // ค่าสูงสุดของแกน y
        tickAmount: 8, // จำนวนบรรทัดของแกน y
    },
    fill: {
        opacity: 1
    },
    colors: ['#FFFF00', '#FF1493', '#00FF7F', '#FF8C00', '#00BFFF', '#FF00FF', '#FF0000'],
    tooltip: {
        y: {
            formatter: function (val) {
                return val + " dB(A)"
            }
        }
    }
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();



//chart-line
var options = {
    series: [
        {
            name: "Workday",
            data: [50.016, 52.290, 52.101, 51.502, 50.771, 51.223, 51.260, 51.403, 52.200]
        },
        {
            name: "Holiday",
            data: [, , 49.534, 49.583, 49.714, 49.608, 49.549, 49.532, 49.372]
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
        text: ' Workday & Holiday',
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
        categories: ['8.00-9.00', '9:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00'],
        title: {
            text: 'Time'
        }
    },
    yaxis: {
        title: {
            text: 'Sound Level dB(A)'
        },
        min: 47.5, // ค่าต่ำสุดของแกน y
        max: 53, // ค่าสูงสุดของแกน y
        tickAmount: 8, // จำนวนบรรทัดของแกน y
    },
    legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
    }
};

var chart = new ApexCharts(document.querySelector("#chart-line"), options);
chart.render();



