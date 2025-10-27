import { watch } from "node:fs"
import { join, resolve } from "node:path"

// Store WebSocket clients for hot reload
const clients = new Set<any>()

// Watch for file changes in src and tools/test directories
const srcPath = resolve(import.meta.dir, "..", "..", "src")
const toolsTestPath = resolve(import.meta.dir)

const watchDirs = [srcPath, toolsTestPath]
let timeOut: NodeJS.Timeout | undefined

for (const dir of watchDirs) {
	watch(dir, { recursive: true }, (eventType, filename) => {
		if (filename && (filename.endsWith(".ts") || filename.endsWith(".js"))) {
			if (timeOut) clearTimeout(timeOut)
			timeOut = setTimeout(() => {
				console.log(`File changed: ${filename}`)
				// Notify all connected clients to reload
				for (const ws of clients) {
					ws.send("reload")
				}
			}, 500)
		}
	})
}

Bun.serve({
	port: 3000,
	async fetch(req, server) {
		const url = new URL(req.url)
		let path = url.pathname

		// WebSocket upgrade for hot reload
		if (path === "/__hot_reload") {
			const success = server.upgrade(req)
			return success ? undefined : new Response("WebSocket upgrade failed", { status: 500 })
		}

		if (path === "/") path = "/index.html"

		// Serve node_modules files
		if (path.startsWith("/node_modules/")) {
			return new Response(Bun.file(join(import.meta.dir, "..", "..", path)))
		}

		// Bundle TypeScript files on request
		if (path.endsWith(".ts")) {
			const result = await Bun.build({
				entrypoints: [`./tools/test${path}`],
				target: "browser",

				// external: ["monaco-editor"],
				minify: false,
				sourcemap: "inline",
			})

			if (result.success) {
				return new Response(result.outputs[0], {
					headers: { "Content-Type": "application/javascript" },
				})
			}
		}
		const file = Bun.file(`./tools/test${path}`)
		if (!(await file.exists())) return new Response("Not Found", { status: 404 })
		return new Response(file)
	},
	websocket: {
		open(ws) {
			clients.add(ws)
			console.log("Hot reload client connected")
		},
		message(ws, message) {
			// No need to handle messages from client
		},
		close(ws) {
			clients.delete(ws)
			console.log("Hot reload client disconnected")
		},
	},
})

console.log("Server running at http://localhost:3000")
