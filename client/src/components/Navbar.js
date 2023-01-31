import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import useAuth from "../hooks/useAuth";


const Navbar = () => {
	let { auth } = useAuth();

	return (
		<nav>
			<ul>
				<li>
					<Link to="/subjects">Subjects</Link>
				</li>
				<li>
					<Link to="/students">Students</Link>
				</li>
				{ (auth?.id) && 
				<li>
					<Link to="/logout">Logout</Link>
				</li> 
				}
			</ul>
			<Outlet />
		</nav>
	)
}

export default Navbar;