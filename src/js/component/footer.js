import React, { Component } from "react";

export const Footer = () => (
  <footer className="footer mt-auto py-3 text-center">
	<div className="titleDiv">
		<h3 className="hrTitle footerTitle">Explore more</h3>
	</div>

    <h6>More from Star Wars:</h6>
	<ul id="footerUl">
		<li><i className="fa-brands fa-facebook"></i></li>
		<li><i className="fa-brands fa-twitter"></i></li>
		<li><i className="fa-brands fa-instagram"></i></li>
		<li><i className="fa-brands fa-youtube"></i></li>
	</ul>
	<p>TM & © Jossvo. All Rights Reserved</p>
  </footer>
);
