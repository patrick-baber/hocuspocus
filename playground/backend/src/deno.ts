import { Hocuspocus } from "@patrick-baber-test/server";
import { upgradeWebSocket } from "hono/deno";

const hocuspocus = new Hocuspocus({
	name: "collaboration",
});

// @ts-ignore
Deno.serve((req) => {
	if (req.headers.get("upgrade") !== "websocket") {
		return new Response(null, { status: 501 });
	}

	const { socket, response } = Deno.upgradeWebSocket(req);

	// @ts-ignore
	socket.addEventListener("open", (_event) => {
		hocuspocus.handleConnection(socket, req);
	});

	return response;
});
