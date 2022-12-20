import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<div>
			<nav className="navbar mb-3">
				<img id="local-nav-logo-mobile" className="sm-w50 md-w30" src="https://lumiere-a.akamaihd.net/v1/images/sw_logo_horiz_2x-f98247cb30aa_c622cfa9.png?region=0,0,732,75" alt="Portal Nav - Bottom"/>
				<div className="dropdown">
					<button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
						Favorites
					</button>
					<ul className="dropdown-menu">
						<li><a className="dropdown-item" href="#">Test 1</a></li>
						<li><a className="dropdown-item" href="#">Test 2</a></li>
						<li><a className="dropdown-item" href="#">Test 3</a></li>
					</ul>
				</div>
			</nav>

		</div>
		
	);
};
