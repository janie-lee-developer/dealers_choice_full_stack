import React from 'react'

// react router dom
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {

    // iterate the nav nodes and listen to click event then add or remove ' active' class name.
    const handleClick = (e) => {
        e.persist();
        e.target.parentNode.parentNode.childNodes.forEach( node => {
            if (node.childNodes[0] === e.target) {
                e.target.className += ' active'
            } else {
                node.childNodes[0].className = 'navLink'
            }
        })
    }

    return (
        <nav id='navbar' className='row'>
            <Link to='/stories' className='logo'>Blog Me 2.0</Link>
            <ul className='nav-links'>
                <li className='nav-item' ><Link to='/stories/create' className='navLink' onClick={(e)=> handleClick(e) }>Post</Link></li>
                <li className='nav-item' ><Link to='/stories' className='navLink' onClick={(e) => handleClick(e)}>Stories</Link></li>
                <li className='nav-item' ><Link to='/authors' className='navLink' onClick={(e) => handleClick(e)}>Authors</Link></li>
            </ul>           
        </nav>
    )
}

export default Navbar
