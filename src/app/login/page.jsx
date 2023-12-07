'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState, useEffect } from 'react';
import './style.css';
//import { useRouter } from '/auth/callback/route';


export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    //const router = useRouter()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);

    const supabase = createClientComponentClient();

    useEffect(() => {
        async function getUser(){
            const {data: {user}} = await supabase.auth.getUser()
            setUser(user)
            setLoading(false)
        }
        getUser();
    }, [])

    const handleSignIn = async () => {
        const res = await supabase.auth.signInWithPassword({
            email, password
        })
        setUser(res.data.user)
        //router.refresh();
        setEmail('')
        setPassword('')
    }

    const handleLogout = async () => {
        await supabase.auth.signOut();
        //router.refresh();
        setUser(null)
    }

    if (loading){
        return <h1>Loading...</h1>
    }

    if (user){
        return (
            <div>
                <div>
                    <h1>Þú ert þegar innskráð</h1>
                    <button onClick={handleLogout}>
                        Útskrá
                    </button>
                </div>
            </div>
        )
    }

    return (
        <main>
            <div className='login-container'>
                <p>Admin Login</p>
                <input className='email'
                type='email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='email'
                />
                <input className='password'
                type='password'
                name='password'
                value={password}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='password'
                />
                <button className='login-btn' onClick={handleSignIn}>Sign In</button>
            </div>
        </main>
    )
}

/*
https://www.youtube.com/watch?v=dhXjHGklaZc&ab_channel=CodeRyan
*/ 