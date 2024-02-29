//Cecilia Bruce, 2/29/24, IT302 Section 002, Phase 2 Assignment, bb455@njit.edu
let comics

export default class ComicsDAO {
	static async injectDB(conn) {
		if (comics) {
			return
		} try {
			comics = await conn.db(process.env.COMICS_NS).collection('XKCD_bb455')
		} catch (e) {
			console.error(`Unable to connect in ComicsDAO: ${e}`)
		}
	}

	static async getComics({
		filters = null,
		page = 0,
		comicsPerPage = 10,
	} = {}) {
		let query
		if(filters){
			if("title" in filters) {
				query = {$text: {$search: filters['title']}}
			}	
		}

		let cursor
		try {
			cursor = await comics
				.find(query)
				.limit(comicsPerPage)
				.skip(comicsPerPage * page)
			const comicsList = await cursor.toArray()
			const totalNumComics = await comics.countDocuments(query)
			return {comicsList, totalNumComics}
		} catch (e) {
			console.error(`Unable to issue find command, ${e}`)
			console.error(e)
			return {comicsList: [], totalNumComics: 0 }
		}
	}
}
