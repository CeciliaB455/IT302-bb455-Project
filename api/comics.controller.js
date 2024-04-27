//Cecilia Bruce, 2/29/24, IT302 Section 002, Phase 2 Assignment, bb455@njit.edu
import ComicsDAO from '../dao/comicsDAO.js'

export default class ComicsController {
	static async apiGetComics(req, res, next){
		const comicsPerPage = req.query.comicsPerPage ? parseInt(req.query.comicsPerPage) : 10
		const page = req.query.page ? parseInt(req.query.page) : 0
		let filters = {}
		if (req.query.title){
			filters.title = req.query.title
		}

		const {comicsList, totalNumComics} = await ComicsDAO.getComics({filters, page, comicsPerPage})

		let response = {
			comics: comicsList,
			page: page,
			filters: filters,
			entries_per_page: comicsPerPage,
			total_results: totalNumComics,
		}
		res.json(response)
	}
     	static async apiGetComicById(req, res, next) {
                try {
                        let id = req.params.id || {}
                        let comic = await ComicsDAO.getComicById(id)
                        if(!comic) {
                                res.status(404).json({ error: "not found"})
                                return
                        }
                        res.json(comic)
                } catch(e) {
                        console.log(`api, ${e}`)
                        res.status(500).json({error: e})
                }
        }
}
