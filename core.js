//Initially it will work with IP whitelisting
import WebSocket, { WebSocketServer } from 'ws';


const wss = new WebSocketServer({ port: 8080 });
const keepAlive = 500;
const keepAliveMsg =  JSON.stringify({"MESSAGE_TYPE":'KeepAlive',"INTERVAL":'10'});
const EXECUTIONREPORT =  JSON.stringify({"MESSAGE_TYPE":'EXECUTIONREPORT',"INF":{}});
const ORDER =  JSON.stringify({"MESSAGE_TYPE":'ORDER',"INF":{}});




wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
    broadcastKeepalive(ws);
    ws.on('message', function message(data) {
      console.log(data.toString());
        // let msg = JSON.parse(data);
        // msgHandler(msg, ws);
    });
    ws.on('spawn',()=>{
        console.log('New User S');
    });
});


function msgHandler(msg, ws) {
    switch (msg.MessageType) {
        case 'ExecutionReport': {
            console.log('I got the report');
            break;
        }
        case 'TokenInf': {
            console.log('Needs to send token Information');
            break;
        }
        case 'Order': {
            console.log('I got the order');
            break;
        }
    }
}



async function broadcastKeepalive(ws) {
    setTimeout(() => {broadcastKeepalive(ws);}, keepAlive);
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            ws.send(keepAliveMsg);
        }
    });
}




process.on('uncaughtException', function (err) {
    console.error(err);
    console.log("...");
  });

  process.on('TypeError', function (err) {
    console.error(err);
    console.log("...");
  });




