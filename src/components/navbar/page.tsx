'use client'
import {FaBars, FaTimes} from 'react-icons/fa';
import {useRef} from 'react';
import './style.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SearchBar from '../searchbar/page';

function Navbar() {

    const navRef = useRef <HTMLElement | null>(null); 
    const showNavbar = () => {
        if (!navRef || !navRef.current) return;
        navRef.current.classList.toggle('responsive_nav');
    } // Switch between hamburger menu and nav items on screen after screen size
    
    //Access the router for navigation
    const router = useRouter();  
    
    function handleClick() {
        router.push('/laeknar');
    } // Click logo to go back to landingpage

    return (
        <header>
            <div className='logo-container'>
                <Link href='/'>
                    <img className='logo-ball' src='../../../images/TAMRA (27).png' />
                    <img className='logo-img' src='../../../images/logosetrid.svg' alt='Logo' />
                </Link>
            </div>

            <nav ref={navRef}> 
                <div className='a-container'>
                    <a href='/rannsoknir'>Rannsóknir</a>
                    <a href='/laeknar'>Starfsfólk</a>
                    <div className="tenglar">
                        <a href='/tenglar'>Tenglar</a>
                        <div className="tenglar-content">
                            <a href="https://www.rannsoknasetrid.is">rannsoknasetrid.is</a>
                            <a href="/link2">Link 2</a>
                        </div>
                    </div>
                    <a href='/enska'>English</a>
                    <div className='search-container'>
                        <SearchBar />
                    </div>
                    <button className='nav-btn nav-close-btn' onClick={showNavbar}>
                        <FaTimes/>
                    </button>
                </div>
            </nav>
            <button className='nav-btn' onClick={showNavbar}>
                <FaBars/>
            </button>
        </header>
    );
}

export default Navbar;