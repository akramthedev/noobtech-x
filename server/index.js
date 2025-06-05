require('dotenv').config();
const express      = require('express');
const http         = require('http');
const WebSocket    = require('ws');
const cors = require('cors');
const connectDb       = require('./config/db');


const bureauRoute = require('./routes/bureauRoute');
const authRoute = require('./routes/authRoute');
const serviceRoute = require('./routes/serviceRoute');
const establishmentRoute = require('./routes/establishment');
const userRoute = require('./routes/userRoute');
const Establishment = require('./models/Establishment');

const app  = express();
const PORT = process.env.PORT || 3001;



// Middlewares
app.use(express.json());
app.use(cors());


// REST API Routes 
app.use('/auth', authRoute );
app.use('/establishment', establishmentRoute);
app.use('/service', serviceRoute);
app.use('/user', userRoute);
app.use('/bureau', bureauRoute);

// HTTP Server & WebSocket 
const server = http.createServer(app);
 

const wss = new WebSocket.Server({
  server,
  perMessageDeflate: false,
  clientTracking: true,
  maxPayload: Number.MAX_SAFE_INTEGER,
});


const activeUsers = new Map();

wss.on('connection', (ws, req) => {
  ws.on('message', async (data) => {
    try {
      const message = JSON.parse(data);

      if (message.action === 'register') {
        const { userId, establishmentId } = message.payload;

        ws.userId = userId;
        ws.establishmentId = establishmentId;

        if (!activeUsers.has(userId)) {
          activeUsers.set(userId, new Set());
        }

        activeUsers.get(userId).add(ws);

        console.log("-------------------------");
        console.warn(`Utilisateur connecté : ${userId}`);
        console.warn(`Etablissement : ${establishmentId}`);
        console.warn(`Utilisateurs en ligne : ${activeUsers.size}`);
        console.log("-------------------------");
      }
 

      else if (message.action === "hello_world") {
        console.warn("WS hello_world executed...");
        ws.send(JSON.stringify({
          action: 'hello_world',
          payload: "Hello World",
        }));
      }

      else {
        ws.send(JSON.stringify({ error: 'Unknown action' }));
      }

    } catch (err) {
      console.error('Error handling WS message:', err);
      ws.send(JSON.stringify({ error: 'Invalid message format' }));
    }
  });

  ws.on('close', () => {
    const userId = ws.userId;
    if (!userId) return;

    const sockets = activeUsers.get(userId);
    if (sockets) {
      sockets.delete(ws);
      if (sockets.size === 0) {
        activeUsers.delete(userId);
        console.log("-------------------------");
        console.error(`Utilisateur ${userId} déconnecté`);
        console.error(`Utilisateurs en ligne : ${activeUsers.size}`);
        console.log("-------------------------");
      }
    }
  });
  ws.on('error', (err) => console.error('WS Error:', err));
});








Establishment.watch([], { fullDocument: 'updateLookup' })
  .on('change', async (change) => {
    const updatedEstablishment = change.fullDocument;
    if (!updatedEstablishment) return;
    const changedEstId = updatedEstablishment._id.toString();
    for (const [userId, socketsSet] of activeUsers.entries()) {
      for (const socket of socketsSet) {
        if (socket.establishmentId === changedEstId) {
          if (socket.readyState === WebSocket.OPEN) {
            socket.send(
              JSON.stringify({
                action: 'establishment_updated',
                payload: updatedEstablishment,
              })
            );
          }
          console.log(`Notification envoyée à userId=${userId} ayant le establishmentId=${changedEstId}`);
        }
      }
    }
  });






// Server &  DataBase Connection 
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDb();
});