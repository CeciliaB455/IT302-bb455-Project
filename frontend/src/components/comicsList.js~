//Cecilia Bruce, 4/12/24, IT 302 Section 002, Phase 4 Assignment, bb455@njit.edu
import React, { useState, useEffect } from 'react'
import ComicDataService from "../service/comicsDataService"
import { Link } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

function ComicsList(){
	const [comics, setComics] = useState([]);
        const [searchTitle, setSearchTitle] = useState("");

        useEffect(() => {
    retrieveComics();
  }, []);


  const retrieveComics = () => {
    ComicDataService.getAll()
      .then((response) => {
        console.log(response.data);
        setComics(response.data.comics);
      })
      .catch((e) => {
        console.log(e);
      });
  };
const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value
    setSearchTitle(searchTitle);
  };

          const find = (query, by) => {
    ComicDataService.find(query, by)
      .then(response => {
        console.log(response.data)
        setComics(response.data.comics)
      })
      .catch(e => {
        console.log(e)
      })
  }
	const findByTitle =
    () => {
      find(searchTitle, "title")
    }

	return (
		<div className="App">
		<Container>
        <Form>
          <Row>
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Search by title"
                  value={searchTitle}
                  onChange={onChangeSearchTitle}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="button"
                onClick={findByTitle}
              >
                Search
              </Button>
            </Col>
          </Row>
        </Form>
	<Row>
          {comics.map((comic) => {
            return (
              <Col>
                <Card style={{ width: '18rem' }}>
                  <Card.Img src={comic.img} />
                  <Card.Body>
                    <Card.Title>{comic.title}</Card.Title>
                    <Link to={"/bb455_comics/" + comic._id} >View Comments</Link>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
      </Container>
    </div>
  );
}

export default ComicsList;
