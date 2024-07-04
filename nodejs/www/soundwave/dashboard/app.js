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
        },
        {
            name: '07',
            data: []
        },
        {
            name: '08',
            data: []
        },
        {
            name: '09',
            data: []
        },
        {
            name: '10',
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


window.setInterval(function () {
    axios.get('/api/data').then(r => {
        const sound = r.data.filter((a) => { return a.stationname == '01' }).map(a => ({ x: new Date(a.ts).getTime(), y: Number(a.sound_level) }))
        const sound1 = r.data.filter((a) => { return a.stationname == '02' }).map(a => ({ x: new Date(a.ts).getTime(), y: Number(a.sound_level) }))
        const sound2 = r.data.filter((a) => { return a.stationname == '03' }).map(a => ({ x: new Date(a.ts).getTime(), y: Number(a.sound_level) }))
        const sound3 = r.data.filter((a) => { return a.stationname == '04' }).map(a => ({ x: new Date(a.ts).getTime(), y: Number(a.sound_level) }))
        const sound4 = r.data.filter((a) => { return a.stationname == '05' }).map(a => ({ x: new Date(a.ts).getTime(), y: Number(a.sound_level) }))
        const sound5 = r.data.filter((a) => { return a.stationname == '06' }).map(a => ({ x: new Date(a.ts).getTime(), y: Number(a.sound_level) }))
        const sound6 = r.data.filter((a) => { return a.stationname == '07' }).map(a => ({ x: new Date(a.ts).getTime(), y: Number(a.sound_level) }))
        const sound7 = r.data.filter((a) => { return a.stationname == '08' }).map(a => ({ x: new Date(a.ts).getTime(), y: Number(a.sound_level) }))
        const sound8 = r.data.filter((a) => { return a.stationname == '09' }).map(a => ({ x: new Date(a.ts).getTime(), y: Number(a.sound_level) }))
        const sound9 = r.data.filter((a) => { return a.stationname == '10' }).map(a => ({ x: new Date(a.ts).getTime(), y: Number(a.sound_level) }))


        chartsound.updateSeries([{ data: sound }, { data: sound1 }, { data: sound2 }, { data: sound3 }, { data: sound4 }, { data: sound5 }, { data: sound6 }, { data: sound7 }, { data: sound8 }, { data: sound9 }])
    })
}, 3000)


