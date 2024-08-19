const express = require('express');
const app = express();
const axios = require("axios");
const { Pool } = require('pg');

const pg = new Pool({
    host: 'postgis',
    port: 5432,
    database: 'geodb',
    user: 'postgres',
    password: '1234',
})


app.get('/sss/api/data', (req, res) => {
    let sql = `select *,datetime as ts 
                    from "154499".cmu_sound
                    order by datetime DESC LIMIT 30`;

    pg.query(sql).then((r) => {
        // console.log(r.rows)
        res.status(200).json(r.rows);
    })
})

app.get('/sss/api/senddata/:stationname/:sound', (req, res) => {
    const { stationname, sound } = req.params;

    const sql = `insert into "154499".cmu_sound(
        stationname,sound_level,DateTime)values(
            '${stationname}',${sound},now()  
        )`;
    console.log(sql)

    pg.query(sql).then((r) => {
        res.status(200).json({ status: "OK" })
    })

})

app.use("/sss/output", express.static('output'))
app.use("/sss", express.static('www'))

app.listen(3000, () => {
    console.log(`http://localhost:3000`);
});

