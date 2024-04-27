//Cecilia Bruce, 4/26/24, IT302 Section 002, Phase 5 Assignment, bb455@njit.edu
let comics
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

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
	        static async getComicById(id) {
                 try {
                         return await comics.aggregate([
                                 {
                                         $match: {
                                                 _id: new ObjectId(id),
                                         }
                                 },
                                 { $lookup:
                                         {
                                                 from: 'comments',
                                                 localField: '_id',
                                                 foreignField: 'comic_id',
                                                 as: 'comments'
                                         }
                                 }
                         ]).next()
                 }
                 catch(e) {
                         console.error(`something went wrong in getComicById: ${e}`)
                         throw e
                 }
	}
}
