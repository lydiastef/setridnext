'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import './style.css';
import Navbar from '../../components/navbar/page';
import Footer from '../../components/footer/page';

export default function LoginPage(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('');
    const [resetPasswordClicked, setResetPasswordClicked] = useState(false);
    const [error, setError] = useState(null);
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

    const handleSignIn = async () => {
        try {
        const res = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (res.error) {
            // Handle authentication error (e.g., user not found)
            setError(res.error.message);
            // Perform actions such as displaying an error message to the user
            return;
        }

        setUser(res.data.user)
        setEmail('')
        setPassword('')
        setError(null); // Clear error if authentication succeeds
        } catch (error) {
        console.error('Error signing in:', error.message);
        setError('An unexpected error occurred. Please try again.'); // Handle other errors
        }
    };

    
    const handleResetPassword = async () => {
        try {
            const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: 'http://localhost:3000/updatepassword/page.tsx',
            });

            if (error) {
                setError(error.message);
                return;
            }

            console.log('Password reset email sent successfully.');
            setResetPasswordClicked(true); // Set reset password clicked to true after successful password reset request
        } catch (error) {
            console.error('Error resetting password:', error.message);
            setError('An unexpected error occurred. Please try again.');
        }
    };

    const handleUpdatePassword = async () => {
        try {
            const { data, error } = await supabase.auth.updateUser({
                password: newPassword
            });

            if (error) {
                setError(error.message);
                return;
            }

            console.log('Password updated successfully.');
        } catch (error) {
            console.error('Error updating password:', error.message);
            setError('An unexpected error occurred. Please try again.');
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.reload();
        setUser(null)
    }

    if (loading){
        return <h1>Loading..</h1>
    }

    if (user){
      if(user?.identities[0].identity_data.email) router.replace('/laeknar/admin');
        return  null;
}

return (
    <div>
    <Navbar/>
    <h1>Innskráning</h1>
    <main className="login-container">
        <div className="email-container">
            <input 
                type="email" 
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tölvupóstur"
                className="input"
            />
            <input 
                type="password" 
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Lykilorð"
                className="input"
            />
            <button 
                onClick={handleSignIn}
                className="login-btn"
            >
                Innskrá
            </button>
            <a 
                onClick={handleResetPassword}
                className="reset"
            >
                Breyta lykilorði
            </a>
            {/* Conditionally render input field and update password button only if reset password is clicked */}
            {resetPasswordClicked && (
                <>
                    <input 
                        type="password" 
                        name="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New Password"
                        className="input"
                    />
                    <button 
                        onClick={handleUpdatePassword}
                        className="login-btn"
                    >
                        Update Password
                    </button>
                </>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    </main>
    <Footer/>
</div>
);
}
