import React, { Component } from 'react';
import "./services.css"

class Programs extends Component {
    render() {
        return (
            <div id="programs_div">
                <h1 className="div_heading light">Our Services</h1>
                <p className="div_subheading light">We offer camper rentals in michigan and surrounding states, free delivery within 30miles and even light camper repair needs.</p>
                <div id="programs_list_div">

                    {this.props.programs.map((item, i) => {
                        return (
                            <div key={i} className="programs_item_div">
                                <img src={item.image} alt={item.heading} />
                                <h1 className="div_heading light">{item.heading}</h1>
                                <p className="div_subheading light left">{item.paragraph}</p>
                                <a className="button" href={item.href}>Learn more</a>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Programs;