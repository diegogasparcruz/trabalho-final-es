import React from 'react'
import { Navbar, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './index.css'

export default function MenuItem(props) {

    const markItem = () => {
        let menuContainer = document.getElementById("menu-container");

        let items = menuContainer.getElementsByClassName("row");

        for (var i = 0; i < items.length; i++) {
            items[i].addEventListener("click", function () {
                var current = menuContainer.getElementsByClassName("active");

                if (current.length > 0) {
                    current[0].className = current[0].className.replace(" active", " text-secondary");
                }

                this.classList.add("active")
                this.classList.remove("text-secondary")
            });
        }
    }

    const f = () => {
        if (props.callback)
            props.callback();
        markItem();
    }

    return (
        <div className={'item-container w-100' + props.className} onClick={f}>

            <Row className={'w-100 d-flex align-items-center ' + (props.active ? 'active' : 'text-secondary')}>

                <FontAwesomeIcon
                    id='icon'
                    className='mx-3' icon={props.icon}
                />

                <Navbar.Text id='text'>
                    {props.text}
                </Navbar.Text>
            </Row>
        </div >
    )
}