import { WebSocketServer } from "ws";
import path from "path";
import { watchFile } from "fs";

const sockets: any = [];

const webSocketServer = new WebSocketServer({
	port: 6060,
});

webSocketServer.on("connection", (socket) => sockets.push(socket));
webSocketServer.on("close", (socket: any) =>
	sockets.splice(sockets.indexOf(socket), 1),
);

const WATCHED_FILES = ["./src/game.ts"];

WATCHED_FILES.forEach((file) => {
	console.log("Watching file: " + path.join(__dirname, file));
	watchFile(path.join(__dirname, file), { interval: 60 }, () => {
		console.log("Hot reloading...");
		sockets.forEach((socket: any) => socket.send("hot"));
	});
});
