'use strict'

import http from 'http'
import autocannon from 'autocannon'

const server = http.createServer(handle)

server.listen(0, startBench)

function handle (req, res) {
    res.end('hello world')
}

function startBench () {
    const instance = autocannon({
        url: 'http://localhost:3000',
        connections: 100,
        pipelining: 10,
        duration: 40,
        headers: {
            Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6OTA5MFwvYXBpXC9sb2dpbiIsImlhdCI6MTU4OTg3OTQ2MCwiZXhwIjoxNTg5ODgzMDYwLCJuYmYiOjE1ODk4Nzk0NjAsImp0aSI6Ik9FZ2Vwa1hyS3lkc0VWYWciLCJzdWIiOiI1ZWI2OTc1YTY2NDhmMDNjYWQwYmFmZjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.AIdSDc-Mx9UmPd0bSnXuasFBnooYSXUNOuAw2BkaO08",
            "Content-Type": "application/json"
        },
        requests: [
            {
                method: 'POST',
                path: '/',
                body: JSON.stringify({
                    chat_id: '5ec2346461cf55127956fec2',
                    body: 'body'
                }),
            },
        ]
    }, finishedBench)

    autocannon.track(instance)

    process.once('SIGINT', () => {
        instance.stop()
    })

    function finishedBench (err, res) {
        console.log('finished bench', err, res)
    }
}


