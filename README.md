## Clone APP
```
git clone https://github.com/id1945/angular-socket-io-nodejs-server.git
```

## Server APP
```
http://localhost:3000
cd angular-socket-io-nodejs-server
npm install
npm start
```

## Angular APP
```
cd admin
npm install
npm start
```

![Chatbot](https://raw.githubusercontent.com/id1945/angular-socket-io-nodejs-server/master/admin/src/assets/images/2020-01-05_204110.png "Chatbot")
![Chart](https://github.com/id1945/angular-socket-io-nodejs-server/blob/master/admin/src/assets/images/Video_2020-01-05_203438_(new).gif "Chart")
![Console](https://raw.githubusercontent.com/id1945/angular-socket-io-nodejs-server/master/admin/src/assets/images/2020-01-05_204256.png "Console")

## server.js
````javascript
// Express
const express = require('express');
// SocketIO
const socket = require('socket.io');
// Body parser
const bodyParser = require('body-parser');
// Cors
const cors = require('cors');

// Using express
const app = express();
app.use(cors({
    origin: '*'
}));
app.use(bodyParser);

// Start server port 3000
const server = app.listen(3000, () => {
    console.log('Started in 3000');
});

// Setup socket
const io = socket(server);

// New conection socket
io.sockets.on('connection', (socket) => {
    console.log(`New connection id: ${socket.id}`);
    listen1(socket);
    send1(socket);
    send2(socket);
})

function listen1(socket) {
    socket.on('data1', (res) => {
        console.log(res);
        send1(socket);
    })
}

function send1(socket) {
    // Dummy data chatbot
    socket.emit('data1', { user: 'Admin', message: 'Hello client'});
}

function send2(socket) {
    // Dummy data chart
    const data = Array.from({
        length: 10
    }, () => Math.floor(Math.random() * 590) + 10);
    socket.emit('data2', data);
    setTimeout(function() {
        send2(socket);
    }, 1000);
}
````

## import
````javascript
// Socket.io-client
import io from 'socket.io-client';
// URL server
const socket = io('http://localhost:3000');
````

## chatbot.component.ts
````javascript
  ngOnInit() {
    // Socket get data form server
    socket.on('data1', (res) => {
      this.messages.push(res);
    })
  }

  public onKeyup(value): void {
    const message = { user: 'User', message: value};
    this.messages.push(message); // save to array
    socket.emit('data1', message); // send to server
  }
````

## chart.component.ts
````javascript
ngOnInit() {
    ...
    // Socket get data form server
    socket.on('data2', (res) => {
      this.updateChartData(this.chart, res, 0);
      this.updateChartData(this.pie, res.slice(0, 5), 0);
    })
  }
````