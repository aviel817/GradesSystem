import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
	<nav>
		<ul>
			<li>
				<Link to="/studentsgrades">Students Grades</Link>
			</li>
			<li>
				<Link to="/subjects">Subjects</Link>
			</li>
		</ul>
	</nav>
  )
}

export default Navbar;