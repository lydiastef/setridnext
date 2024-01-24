'use client'
import './style.css';
import Navbar from '../../components/navbar/page';
import Footer from '../../components/footer/page';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/actions';
//import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
//import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { SessionProvider } from 'next-auth/react';


//import { useRouter } from '/auth/callback/route';

/*export default function LoginPage() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);*/

    export default function LoginForm() {
      <SessionProvider>
      const test = useSession()
      </SessionProvider>      
        const [errorMessage, dispatch] = useFormState(authenticate, undefined);
       
        return (
          <form action={dispatch} className="space-y-3">
            <Navbar/>
            <div className="login-container">
              <h1>
                Please log in to continue.
              </h1>
                <div>
                  <label htmlFor="email">Email</label>
                  <div>
                    <input className='email'
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div>
                    <input className='password'
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Password"
                      required
                      minLength={6}
                    />
                  </div>
                </div>
            
              <LoginButton />
                {errorMessage && (
                  <>
                    <p>{errorMessage}</p>
                  </>
                )}
            </div>
            <Footer/>
          </form>
        );
      }
       
      function LoginButton() {
        const { pending } = useFormStatus();
       
        return (
          <button className="login-btn" aria-disabled={pending}>
            Log in
          </button>
        );
      }



/*
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
            <Navbar/>
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
            <Footer/>
        </main>
    )
}*/

/*
https://www.youtube.com/watch?v=dhXjHGklaZc&ab_channel=CodeRyan
*/ 