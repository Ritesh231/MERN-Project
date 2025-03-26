// ==== BACKEND (server.js) ====

const express = require('express');
const fs = require('fs');
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: "*" }));

const io = new Server(server, {
    cors: { origin: "*" },
    transports: ["websocket", "polling"]
});

const activeSessions = new Set();

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("create-session", (sessionId) => {
        activeSessions.add(sessionId);
        console.log(`Session created: ${sessionId}`);
    });

    socket.on("verify-session", (sessionId, callback) => {
        const isValid = activeSessions.has(sessionId);
        console.log("[Session] Verifying passkey:", sessionId);
        callback(isValid);
    });

    socket.on("join-session", (sessionId) => {
        console.log(`User joined session: ${sessionId}`);
        socket.join(sessionId);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

const videoFileMap = {
    'cdn': '/home/ritesh/Downloads/Archive/src/pages/UserHomePage/videos/sample.mp4',
};

app.get('/videos/:filename', (req, res) => {
    const fileName = req.params.filename;
    const filePath = videoFileMap[fileName];

    if (!filePath) return res.status(404).send('File not found');

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = end - start + 1;

        const file = fs.createReadStream(filePath, { start, end });
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(200, head);
        fs.createReadStream(filePath).pipe(res);
    }
});

server.listen(5000, () => console.log("WebSocket server on port 5000"));
app.listen(3000, () => console.log("HTTP video server on port 3000"));