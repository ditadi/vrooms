import "./reload.ts";

Bun.serve({
	port: 8080,
	fetch(req) {
		const url = new URL(req.url);

		if (
			url.pathname.endsWith(".js") ||
			url.pathname.endsWith(".css") ||
			url.pathname.endsWith(".ts")
		) {
			return new Response(Bun.file(import.meta.dir + "/" + url.pathname));
		}

		if (url.pathname.endsWith("/") || url.pathname.endsWith("/index.html"))
			return new Response(Bun.file(import.meta.dir + "/index.html"));

		return new Response();
	},
});
