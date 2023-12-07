'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';
import './style.css';

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const supabase = createClientComponentClient();

    const handleSignIn = async () => {
        await supabase.auth.signInWithPassword({
            email, password
        })
        Router.refresh();
    }

    return (
        <main>
            <p>Admin Login</p>
            <div className='login-container'>
                <input className='email'
                type='email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <input className='password'
                type='password'
                name='password'
                value={password}
                onChange={(e) => setEmail(e.target.value)}
                />
                <button className='login-btn' onClick={handleSignIn}>Sign In</button>
            </div>
        </main>
    )
}