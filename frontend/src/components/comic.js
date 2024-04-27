//Cecilia Bruce, 4/26/24, IT 302 Section 002, Phase 5 Assignment, bb455@njit.edu
import React, {useState, useEffect} from 'react'
import ComicDataService from '../service/comicsDataService'
import { Link, useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'

const Comic = (props) => {

  const [comic, setComic] = useState({
    id: null,
    title: "",
//comparison line
    comments:[]
  })
 let { id } = useParams();
const getComic = id => {
  ComicDataService.get(id)
    .then(response => {
      setComic(response.data)
      console.log(response.data)
    })
    .catch(e => {
      console.log(e);
    })
}
useEffect( () => {
  getComic(id)
    },[id])
const deleteComment = (commentId, index) => {
  ComicDataService.deleteComment(commentId, props.user.id)
    .then(response => {
      setComic((prevState) => {
        prevState.comments.splice(index, 1)
        return ({
          ...prevState
        })
      })
    })
    .catch(e => {
      console.log(e)
    })
}

return (
<div>
<Container>
<Row>
<Col>
<Image src={comic.img} />
</Col>
<Col>
<Card>
<Card.Header as="h5">{comic.title}</Card.Header>
<Card.Body>
{props.user &&
<Link to={"/bb455_comics/" + id + "/comment"}>
Add Comment
</Link>}
</Card.Body>
</Card>
        <br></br>
<h2>Comments</h2><br></br>
{comic.comments.map((comment, index) => {
return (
<Card key={index}>
<Card.Body>
<h5>{comment.name + " commented on " + new Date(Date.parse(comment.date)).toDateString()}</h5>
<p>{comment.comment}</p>
{ props.user && props.user.id === comment.user_id &&
<Row>
<Col><Link
 to={"/bb455_comics/" + id + "/comment"}
 state={{ currentComment: comment }}
>Edit</Link>
</Col>
<Col><Button variant="link" onClick={() => deleteComment(comment._id, index)}>Delete</Button></Col>
</Row> }
</Card.Body>
</Card>
 )
 })}
</Col>
</Row>
</Container>

</div>
);
}

export default Comic;

