'use client'
import {FaBars, FaTimes} from 'react-icons/fa';
import {useRef} from 'react';
import './style.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


function Navbar() {

    const navRef = useRef <HTMLElement | null>(null); 
    const showNavbar = () => {
        if (!navRef || !navRef.current) return;
        navRef.current.classList.toggle('responsive_nav');
    } // Switch between hamburger menu and nav items on screen after screen size
    
    const router = useRouter();      
    function handleClick() {
        router.push('/laeknar');
    } // Click logo to go back to landingpage

    return (
        <header>
            <Link href='../app/page.tsx' style={{ textDecoration: 'none' }}>
                <img className='logo-img' src='/logo.avif' alt='logo' />
            </Link>
            <nav ref={navRef}> 
                <div className='a-container'>
                    <a href='/rannsoknir'>Rannsóknir</a>
                    <a href='/laeknar'>Starfsfólk</a>
                    <a href='/covid'>Covid-19</a>
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