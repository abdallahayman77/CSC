import './style.css';
import React, { useState, useEffect, useCallback  } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import { FaRegUserCircle } from 'react-icons/fa';
import { BsSearch } from 'react-icons/bs';

import Button from '../Button/Button';

const Header = () => {

    const [user = null, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [toggleUser, setToggleUser] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    
    const onClick = () => {
        setToggleUser(!toggleUser)
    }
    
    const search = () => {
        console.log("Search")
    }

    const logout = useCallback(() => {
        dispatch({ type: 'LOGOUT' });
        history.push('/');
        setUser(null);
        setToggleUser(false);
      }, [dispatch, history])

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location, user?.token, logout]);

    return (
        <header>            
            <div className="title"><Link to="/"><img src="/logo.png" alt="CSC" /></Link></div>

            <nav>
                <ul>
                    <li><Link to="/courses">Courses</Link></li>
                    <li><Link to="/jobs">Jobs</Link></li>
                    <li><Link to="#">News Feed</Link></li>
                    <li><Link to="/blog" id="btn-blog" className="btn btn-default">Blog</Link></li>
                </ul>
            </nav>

            <div className="search">
                <form action="">
                    <input type="search" name="search" id="search" placeholder="Search" autoComplete="off"/>
                    <Button icon={<BsSearch/>} onClick={search}/>
                </form>
            </div>

            <div className="user">
                {!user ? (
                    <Button onClick={onClick} icon={<FaRegUserCircle className="btn-user"/>} style={{backgroundColor: "transparent"}}/>
                ) : (
                    <>
                        <h5>{ user.result.name.split(" ")[0] + " " + user.result.name.split(" ")[1] }</h5>
                        {user.result.imageUrl ? (
                        <Button onClick={onClick} text={<img src={user.result.imageUrl} alt={user.result.email}/>} style={{backgroundColor: "transparent"}}/>
                        ) : (
                            <Button onClick={onClick} icon={<FaRegUserCircle className="btn-user"/>} style={{backgroundColor: "transparent"}}/>
                        )}
                    </>
                )}
                
                {toggleUser && <div className="dropdown">
                    <ul>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link to="/settings">Settings</Link></li>
                        <hr style={{display: "block", margin: "10px"}}/>
                        {!user ? (
                            <li id="btn-login"><Link to="/auth">Log in</Link></li>
                        ) : (
                            <li id="btn-logout"><Button text="Log out" onClick={logout}/></li>
                        )}
                    </ul>
                </div>}
            </div>
        </header>
    )
}

export default Header
