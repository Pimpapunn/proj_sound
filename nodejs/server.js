const express = require('express');
const app = express();
const axios = require("axios");
const { Pool } = require('pg');
// const line = require("@line/bot-sdk");
const pg = new Pool({
    host: 'postgis',
    port: 5432,
    database: 'geodb',
    user: 'postgres',
    password: '1234',
})


require('dotenv').config()

// console.log(process.env.channelAccessToken);
const config = {
    channelAccessToken: process.env.channelAccessToken,
    channelSecret: process.env.channelSecret,
}

const bodyParser = require('body-parser')
const request = require('request')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/sss/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    console.log(req.body.events[0]);

    reply(reply_token)
    res.sendStatus(200)
})

function reply(reply_token) {
    console.log(reply_token);

    let headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.channelAccessToken}`
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: 'Hello'
        },
        {
            type: 'text',
            text: 'How are you?'
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}

function pushMessage(userId, messageText) {
    console.log(process.env.channelAccessToken);

    const options = {
        url: 'https://api.line.me/v2/bot/message/push',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.channelAccessToken}`  // แทนที่ด้วย Channel Access Token ของคุณ
        },
        json: {
            to: userId,  // userId ที่ต้องการส่งข้อความไป
            messages: [
                {
                    type: 'text',
                    text: messageText  // ข้อความที่จะส่ง
                }
            ]
        }
    };

    // ส่ง request ไปยัง LINE API
    request.post(options, (error, response, body) => {
        if (error) {
            console.error('Error pushing message:', error);
        } else if (response.statusCode !== 200) {
            console.error('Failed to push message:', response.statusCode, body);
        } else {
            console.log('Message pushed successfully:', body);
        }
    });
}

// ตัวอย่างการเรียกใช้ฟังก์ชัน pushMessage

app.get('/sss/api/sendmessage/:msg', (req, res) => {
    const { msg } = req.params
    pushMessage('U68ce358be4a90e1aa42dab9fd74a20e8', msg);
    res.json({ status: "success" })
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

