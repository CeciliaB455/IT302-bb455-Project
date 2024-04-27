//Cecilia Bruce, 4/26/24, IT 302 Section 002, Phase 5 Assignment, bb455@njit.edu
import axios from "axios";

class ComicDataService {


  getAll(page = 0) {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/bb455/comics?page=${page}`
    );
  }
  get(id) {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/bb455/comics/id/${id}`
    );
  }
find(query, by = "title", page = 0) {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/bb455/comics?${by}=${query}&page=${page}`
    )
  }

  createComment(data) {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/bb455/comics/comment`, data)
  }

  updateComment(data) {
    return axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/bb455/comics/comment`, data)
  }
deleteComment(id, userId) {
    return axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/bb455/comics/comment`,
      { data: { comment_id: id, user_id: userId } }
    )
  }
}
export default new ComicDataService();
