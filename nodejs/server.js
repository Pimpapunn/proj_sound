const express = require('express');
const app = express();

const { Pool } = require('pg');

const pg = new Pool({
    host: 'postgis',
    port: 5432,
    database: 'geodb',
    user: 'postgres',
    password: '1234',
})


app.get('/api/data', (req, res) => {
    let sql = `select *,datetime as ts 
                    from "154499".parks_sound 
                    order by datetime DESC LIMIT 30`;

    pg.query(sql).then((r) => {
        // console.log(r.rows)
        res.status(200).json(r.rows);
    })
})

app.get('/api/senddata/:stationname/:temp/:sound/:RH', (req, res) => {
    const { stationname, temp, sound, RH } = req.params;

    const sql = `insert into "154499".parks_sound(
        stationname,temperature,humidty,sound_level,DateTime)values(
            '${stationname}',${temp},${RH},${sound},now()  
        )`;
    console.log(sql)

    pg.query(sql).then((r) => {
        res.status(200).json({ status: "OK" })
    })

})


app.use('/', express.static('www'))

app.listen(3000, () => {
    console.log(`http://localhost:3000`);
});