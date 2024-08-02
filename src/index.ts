const socket = new WebSocket("ws://localhost:6060");
let game = await import("./game.ts");

socket.addEventListener("message", async (event) => {
	if (event.data === "hot") {
		setTimeout(async () => {
			game = await import("./game.ts?date=" + new Date().getTime());
		}, 1000);
	}
});
