//Cecilia Bruce, 4/26/24, IT 302 Section 002, Phase 5 Assignment, bb455@njit.edu
import React, { useState } from 'react'
import ComicDataService from "../service/comicsDataService"
import { Link, useParams, useLocation } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AddComment = (props) => {
	let editing = false
        let initialCommentState = ""
        const location = useLocation();
        if (location.state && location.state.currentComment) {
                editing = true
                initialCommentState = location.state.currentComment.comment
        }

        const [comment, setComment] = useState(initialCommentState)
        // keeps track if comment is submitted
        const [submitted, setSubmitted] = useState(false)
        let { id } = useParams();

        const onChangeComment = e => {
                const comment = e.target.value
                setComment(comment);
        }

        const saveComment = () => {
                var data = {
                        comment: comment,
                        name: props.user.name,
                        user_id: props.user.id,
                        comic_id: id
                }
                if (editing) {
                        // get existing comment id
                        data.comment_id = location.state.currentComment._id
                        ComicDataService.updateComment(data)
                                .then(response => {
                                        setSubmitted(true);
                                        console.log(response.data)
                                })
                                .catch(e => {
                                        console.log(e);
                                })
                } else {
                        ComicDataService.createComment(data)
                                .then(response => {
                                        setSubmitted(true)
                                }).catch(e => { })
                }
	}

  return (
    		<div>
                        {submitted ? (
                                <div>
                                <h5>Comment submitted successfully</h5>
                                <Link to={"/bb455_comics/" + id}>
                                Back to Comic
                                </Link>
                                </div>
                        ) : (
                                <Form>
                                <Form.Group>
                                <Form.Label>{editing ? "Edit" : "Create"} Comment</Form.Label>
                                <Form.Control
                                type="text"
                                required
                                value={comment}
                                onChange={onChangeComment}
                                />
                                </Form.Group>
                                <Button variant="primary" onClick={saveComment}>
                                Submit
                                </Button>
                                </Form>
                        )}
    </div>
  )
}

export default AddComment;
