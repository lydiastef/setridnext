
'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js"

export default function UpdatePasswordPage(){
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState<Error | null>(null);
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const supabase = createClientComponentClient();

    useEffect(() => {
        async function getUser(){
            try {
                const {data: {user}} = await supabase.auth.getUser();
                setUser(user);
            } catch (error) {
                console.error('Error getting user:', error);
                setError(error as Error); // Set error as Error object
            } finally {
                setLoading(false); // Ensure loading state is updated even if there's an error
            }
        }

        getUser();
    }, []);

    const handleUpdatePassword = async () => {
        try {
            const { data, error } = await supabase.auth.updateUser({
                password: newPassword
            });

            if (error) {
                setError(error);
                return;
            }

            console.log('Password updated successfully.');
            // Redirect the user to the login page after updating the password
            router.replace('/login');
        } catch (error) {
            console.error('Error updating password:', error instanceof Error ? error.message : 'An unexpected error occurred.');
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login'); // Redirect the user to the login page
        setUser(null);
    };

    if (loading){
        return <h1>Loading..</h1>;
    }


    return (
        <main>
            <div>
                <input 
                    type="password" 
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New Password"
                />
                <button 
                    onClick={handleUpdatePassword}>
                    Update Password
                </button>
                {error && <p style={{ color: 'red' }}>{error.message}</p>}
            </div>
        </main>
    );
}
