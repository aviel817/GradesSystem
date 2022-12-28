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
			<li>
<<<<<<< HEAD
				<Link to="/students">Students</Link>
=======
				<Link to="/login">Login</Link>
>>>>>>> c6b04424a82e80d0c8fc05a879fe3f60dbe98db2
			</li>
		</ul>
	</nav>
  )
}

export default Navbar;