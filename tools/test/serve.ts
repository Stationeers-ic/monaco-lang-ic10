import { join } from "path"


Bun.serve({
	port: 3000,
	async fetch(req) {
		const url = new URL(req.url)
		let path = url.pathname

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
			})

			if (result.success) {
				return new Response(result.outputs[0], {
					headers: { "Content-Type": "application/javascript" },
				})
			}
		}
		const file = Bun.file(`./tools/test${path}`)
		if (!await file.exists())
			return new Response("Not Found", { status: 404 })
		return new Response(file)
	},
})

console.log("Server running at http://localhost:3000");


