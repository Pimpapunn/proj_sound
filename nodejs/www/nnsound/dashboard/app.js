// temp
var optionstemp = {
    series: [
        {
            name: '01',
            data: []
        },
        {
            name: '02',
            data: []
        },
        {
            name: '03',
            data: []
        },
        {
            name: '04',
            data: []
        },
        {
            name: '05',
            data: []
        },
        {
            name: '06',
            data: []
        }
    ],

    colors: ["#F4A460", "#FF6EB4", "#008B8B", "#EE4000", "#00B2EE", "#9932CC"],

    chart: {
        height: 350,
        type: 'line',
        zoom: {
            enabled: true
        }
    },
    dataLabels: {
        enabled: true
    },
    stroke: {
        curve: 'straight'
    },
    title: {
        text: 'อุณหภูมิ',
        align: 'left'
    },
    grid: {
        row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
        },
    },
    xaxis: {
        type: 'datetime',
        // range: XAXISRANGE,
    },

};

var charttemp = new ApexCharts(document.querySelector("#chartTemp"), optionstemp);
charttemp.render();


// sound
var optionsSound = {
    series: [
        {
            name: '01',
            data: []
        },
        {
            name: '02',
            data: []
        },
        {
            name: '03',
            data: []
        },
        {
            name: '04',
            data: []
        },
        {
            name: '05',
            data: []
        },
        {
            name: '06',
            data: []
        }
    ],

    colors: ["#F4A460", "#FF6EB4", "#008B8B", "#EE4000", "#00B2EE", "#9932CC"],

    chart: {
        height: 350,
        type: 'line',
        zoom: {
            enabled: false
        }
    },
    dataLabels: {
        enabled: true
    },
    stroke: {
        curve: 'straight'
    },
    title: {
        text: 'ระดับเสียง',
        align: 'left'
    },
    grid: {
        row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
        },
    },
    xaxis: {
        type: 'datetime',
        // range: XAXISRANGE,
    }
};

var chartsound = new ApexCharts(document.querySelector("#chartSound"), optionsSound);
chartsound.render();

// Rh
var optionsRh = {
    series: [
        {
            name: '01',
            data: []
        },
        {
            name: '02',
            data: []
        },
        {
            name: '03',
            data: []
        },
        {
            name: '04',
            data: []
        },
        {
            name: '05',
            data: []
        },
        {
            name: '06',
            data: []
        }
    ],

    colors: ["#F4A460", "#FF6EB4", "#008B8B", "#EE4000", "#00B2EE", "#9932CC"],
    chart: {
        height: 350,
        type: 'line',
        zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
        },
    },
    dataLabels: {
        enabled: true
    },
    stroke: {
        curve: 'straight'
    },
    title: {
        text: 'ความชื้นสัมพัทธ์',
        align: 'left'
    },
    grid: {
        row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
        },
    },
    xaxis: {
        type: 'datetime',
        // range: XAXISRANGE,
    }
};

var chartRh = new ApexCharts(document.querySelector("#chartRh"), optionsRh);
chartRh.render();



window.setInterval(function () {

    axios.get('/api/data').then(r => {
        //console.log(r)
        const temp = r.data.filter((a) => { return a.stationname == '01' }).map(a => ({ x: new Date(a.ts).getTime(), y: Number(a.temperature) }))
        const temp1 = r.data.filter((a) => { return a.stationname == '02' }).map(a => ({ x: new Date(a.ts).getTime(), y: Number(a.temperature) }))
        const temp2 = r.data.filter((a) => { return a.stationname == '03' }).map(a => ({ x: new Date(a.ts).getTime(), y: Number(a.temperature) }))
        const temp3 = r.data.filter((a) => { return a.stationname == '04' }).map(a => ({ x: new Date(a.ts).getTime(), y: Number(a.temperature) }))
        const temp4 = r.data.filter((a) => { return a.stationname == '05' }).map(a => ({ x: new Date(a.ts).getTime(), y: Number(a.temperature) }))
        const temp5 = r.data.filter((a) => { return a.stationname == '06' }).map(a => ({ x: new Date(a.ts).getTime(), y: Number(a.temperature) }))


        //const rh = r.data.map(a => ({ x: new Date(a.ts).getTime(), y: Number(a.humidty) }))
        const rh = r.data.filter((a) => { return a.stationname == '01' }).map(a => ({ x: new Date(a.ts).getTime(), y: Number(a.humidty) }))
        const rh1 = r.data.filter((a) => { return a.stationname == '02' }).map(a => ({ x: new Date(a.ts).getTime(), y: Number(a.humidty) }))
        const rh2 = r.data.filter((a) => { return a.stationname == '03' }).map(a => ({ x: new Date(a.ts).getTime(), y: Number(a.humidty) }))
        const rh3 = r.data.filter((a) => { return a.stationname == '04' }).map(a => ({ x: new Date(a.ts).getTime(), y: Number(a.humidty) }))
        const rh4 = r.data.filter((a) => { return a.stationname == '05' }).map(a => ({ x: new Date(a.ts).getTime(), y: Number(a.humidty) }))
        const rh5 = r.data.filter((a) => { return a.stationname == '06' }).map(a => ({ x: new Date(a.ts).getTime(), y: Number(a.humidty) }))


        const sound = r.data.filter((a) => { return a.stationname == '01' }).map(a => ({ x: new Date(a.ts).getTime(), y: Number(a.sound_level) }))
        const sound1 = r.data.filter((a) => { return a.stationname == '02' }).map(a => ({ x: new Date(a.ts).getTime(), y: Number(a.sound_level) }))
        const sound2 = r.data.filter((a) => { return a.stationname == '03' }).map(a => ({ x: new Date(a.ts).getTime(), y: Number(a.sound_level) }))
        const sound3 = r.data.filter((a) => { return a.stationname == '04' }).map(a => ({ x: new Date(a.ts).getTime(), y: Number(a.sound_level) }))
        const sound4 = r.data.filter((a) => { return a.stationname == '05' }).map(a => ({ x: new Date(a.ts).getTime(), y: Number(a.sound_level) }))
        const sound5 = r.data.filter((a) => { return a.stationname == '06' }).map(a => ({ x: new Date(a.ts).getTime(), y: Number(a.sound_level) }))


        //console.log(temp)
        console.log(charttemp)

        charttemp.updateSeries([{ data: temp }, { data: temp1 }, { data: temp2 }, { data: temp3 }, { data: temp4 }, { data: temp5 }])
        chartRh.updateSeries([{ data: rh }, { data: rh1 }, { data: rh2 }, { data: rh3 }, { data: rh4 }, { data: rh5 }])
        chartsound.updateSeries([{ data: sound }, { data: sound1 }, { data: sound2 }, { data: sound3 }, { data: sound4 }, { data: sound5 }])

    })
}, 3000)


