//Cecilia Bruce, 4/12/24, IT 302 Section 002, Phase 4 Assignment, bb455@njit.edu
import React, {useState, useEffect} from 'react'
import ComicDataService from '../service/comicsDataService'
import { Link, useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Comic = (user) => {

  const [comic, setComic] = useState({
    id: null,
    title: "",
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
{user &&
<Link to={"/bb455_comics/" + id + "/comment"}>
Add Comment
</Link>}
</Card.Body>
</Card>
</Col>
</Row>
</Container>
</div>
);
}
export default Comic;

