//Cecilia Bruce, 4/12/24, IT 302 Section 002, Phase 4 Assignment, bb455@njit.edu
import React, { useState, useCallback } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AddComment from "./components/addComment";
import ComicsList from "./components/comicsList";
import Comic from "./components/comic";
import Login from "./components/login";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";


function App() {
	const [user, setUser] = useState(null);
	const loginSetter = useCallback(user => {
		setUser(user);
	}, [setUser]);
	async function logout() {
		setUser(null);
	}
	return (
		<div className="App">
		<Navbar bg="light" expand="lg">
		<Navbar.Brand> XKCD Comics</Navbar.Brand>
		<Navbar.Toggle aria-controls="basic-navbar-nav" />
		<Navbar.Collapse id="basic-navbar-nav">
		<Nav className="mr-auto">
		<Nav.Link as={NavLink} to={"bb455_comics"}>Comics</Nav.Link>
		<Nav.Link as ={NavLink} to={user ? "" : "/bb455_login"}>{user ? "Logout User" : "Login"}</Nav.Link>
		</Nav>
		</Navbar.Collapse>
		</Navbar>
		<Routes>
		<Route path="/" element={<ComicsList />}></Route>
		<Route path="/bb455_comics" element={<ComicsList />}></Route>

		<Route path="/bb455_comics/:id/" element={<Comic user={user} />}></Route>
		<Route
		path="/bb455_comics/:id/comment"
		element={<AddComment user={user} />}
		></Route>

		<Route path="/bb455_login" element={<Login user={user} loginSetter={loginSetter} />}></Route>
		</Routes>
		</div>
	);
}


export default App;
