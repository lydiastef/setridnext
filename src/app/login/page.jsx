'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const [user, setUser] = useState(null);
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


    const handleSignUp = async () => {
        const res = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/login`
            }
        })
        setUser(res.data.user)
        router.refresh();
        setEmail('')
        setPassword('')
    }

    const handleSignIn = async () => {
        const res = await supabase.auth.signInWithPassword({
            email,
            password
        })
        setUser(res.data.user)
        router.refresh();
        setEmail('')
        setPassword('')
    }

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.refresh();
        setUser(null)
    }

    console.log({loading, user})

    if (loading){
        return <h1>loading..</h1>
    }

    if (user){
        return (
            <div>
            <div>
                <h1>
                    You're already logged in
                </h1>
                <button 
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
        )
    }

    return (
        <main>
        <div>
        <input 
            type="email" 
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
        />
        <input 
            type="password" 
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
        />
        <button 
            onClick={handleSignUp}
        >
            Sign Up
        </button>
        <button 
            onClick={handleSignIn}
        >
            Sign In
        </button>
        </div>
        </main>
    )

}


  /*
  return (
    <>
    <Navbar/>
    <form action="/auth/login" method="post">
      <div className="login-container">
        <h1>Innskráning</h1>
          <div>
            <div className='email-container'>
              <label htmlFor="email">Email</label>
              <input className="input" name="email" placeholder="Email" />
            </div>
            <div className='email-container'>
              <label htmlFor="password">Lykilorð</label>
              <input className="input" type="password" name="password" placeholder="Lykilorð" />
            </div>
          </div>
        <button className="login-btn">Skrá inn</button>
        <button formAction="/auth/sign-up">Sign Up</button>
        <button formAction="/auth/logout">Sign Out</button>
      </div>
    </form>
    <Footer/>
    </>
  )
}*/


/*
https://www.youtube.com/watch?v=dhXjHGklaZc&ab_channel=CodeRyan
*/ 