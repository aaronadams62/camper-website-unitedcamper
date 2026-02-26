import React, { Component } from 'react';
import Nav from '../Nav'
import './Hero.css'

class Hero extends Component {
    render() {
        return (
            <div id="hero_div">
                <Nav navItems={this.props.navItems}/>
                <div id="hero_text_div">
                    <h1>United Camper</h1>
                    <p>One Stop Camper Rental And Repair </p>
                </div>
                <div id="buttons_div">
                    <a href="#programs_div" className="button button_main">Check Out Our Services</a>
                    <a href="#footer_div" className="button">Contact Us</a>
                </div>
            </div>
        )
    }
}

export default Hero;
