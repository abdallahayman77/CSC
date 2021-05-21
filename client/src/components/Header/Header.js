import './style.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';
import { BsSearch } from 'react-icons/bs';
import Button from '../Button/Button';

const Header = () => {

    const user = null;

    const [toggleUser, setToggleUser] = useState(false)

    const onClick = () => {
        setToggleUser(!toggleUser)
    }
    
    const search = () => {
        console.log("Search")
    }

    return (
        <header>

            <div className="title"><Link to="/"><img src="logo.png" alt="CSC" /></Link></div>

            <nav>
                <ul>
                    <li><Link to="/courses">Courses</Link></li>
                    <li><Link to="/jobs">Jobs</Link></li>
                    <li><Link to="#">News</Link></li>
                    <li><Link to="/blog" id="btn-blog" className="btn btn-default" style={{display: "inline", width: "70px", padding: "3px 15px"}}>Blog</Link></li>
                </ul>
            </nav>

            <div className="search">
                <form action="">
                    <input type="text" name="search" id="search" placeholder="Search" autoComplete="off"/>
                    <Button icon={<BsSearch/>} onClick={search}/>
                </form>
            </div>

            <div className="user">
                <Button onClick={onClick} icon={<FaRegUser/>}/>
                {toggleUser && <div class="dropdown">
                    <ul>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link to="/settings">Settings</Link></li>
                        <hr style={{display: "block", margin: "10px"}}/>
                        {!user ? (
                            <li id="btn-login"><Link to="/login">Log in</Link></li>
                        ) : (
                            <li id="btn-logout"><Button text="Log out"/></li>
                        )}
                    </ul>
                </div>}
            </div>

        </header>
    )
}

export default Header
