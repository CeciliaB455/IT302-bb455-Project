//Cecilia Bruce, 2/29/24, IT 302 Section 002, Phase 2 Assignment, bb455@njit.edu
import app from './server.js'
import mongodb from "mongodb"
import dotenv from "dotenv"
import ComicsDAO from './dao/comicsDAO.js'

async function main() {
	dotenv.config()

	const client = new mongodb.MongoClient(process.env.COMICS_DB_URI)

	const port = process.env.PORT || 8000

	try {
		await client.connect()
		await ComicsDAO.injectDB(client)

		app.listen(port, () => {
			console.log('Server is running on port:' + port)
		})
	} catch (e) {
		console.error(e);
		process.exit(1)
	}
}
main().catch(console.error);
