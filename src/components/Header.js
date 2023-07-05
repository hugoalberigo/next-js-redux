import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router'
import { logOut } from '../action/auth';
import { useSelector } from 'react-redux';
import { getDoc, doc } from 'firebase/firestore';
import { database } from '@/services/firebase';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';

const Header = () => {
    const user = useSelector((state) => state.username);
    const [isOpen, setIsOpen] = useState(false);
    const [sticky, setSticky] = useState(false);
    const [data, setData] = useState({
        username: '',
        score: '',
        rpsPlayed: null,
        latoPlayed: null,
        punchPlayed: null
    })
    const toggle = () => setIsOpen(!isOpen);
    let router = useRouter()
    function redirect() {
        router.push('/landingpage')
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll); 
        const uid = localStorage.getItem('uid');
        if (uid === "") {
            document.getElementById('home').style.display = 'none';
            document.getElementById('profile').style.display = 'none';
            document.getElementById('listuser').style.display = 'none';
            document.getElementById('gamelist').style.display = 'none';
            document.getElementById('login').style.display = 'block';
            document.getElementById('logout').style.display = 'none';
            document.getElementById('user').style.display = 'none';
        } else {
            document.getElementById('home').style.display = 'block';
            document.getElementById('profile').style.display = 'block';
            document.getElementById('listuser').style.display = 'block';
            document.getElementById('gamelist').style.display = 'block';
            document.getElementById('login').style.display = 'none';
            document.getElementById('logout').style.display = 'block';
            document.getElementById('user').style.display = 'block';
            getDoc(doc(database, "users", uid))
            .then
            (docSnap => {
            if(docSnap.exists()) {
                setData({
                ...data, ...docSnap.data() 
                })
            } else {
                console.log("No such document!");
            }
            })
        }
    }, []);

    const handleScroll = () => {
        if (window.scrollY > 180) {
            setSticky(true);
        } else if (window.scrollY < 180) {
            setSticky(false);
        }
    }

    const handleClick = () => {
        logOut();
        router.push('/login');
    }

    return (
        <Navbar color="dark" light container="md" expand="md" sticky={sticky ? "top" : ""}>
            <Image src="/images/R-P-S.png" width="120" height="60" quality="70" />
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ms-auto" navbar>
                    <Nav className="m-auto" navbar>
                        <NavItem>
                            <NavLink color="light" href="/home" id='home'>Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink color="light" href="/profile" id='profile'>Profile</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink color="light" href="/listuser" id='listuser'>List User</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink color="light" href="/gamelist" id='gamelist'>Game List</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink color="light" href="/login" id='login'>Login</NavLink>
                        </NavItem>
                        <p style={{color: 'white'}} id='user'>Hi, {data.username}. Score: {data.score}</p>
                        <NavItem>
                            <NavLink color="light" onClick={handleClick} id='logout'>Log Out</NavLink>
                        </NavItem>
                    </Nav>
                </Nav>
            </Collapse>
        </Navbar>
    )
}

export default Header;