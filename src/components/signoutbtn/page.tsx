import React from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../../config/supabaseClient';

const SignOutButton = () => {
    const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  

  return (
    <button className='signout-btn' onClick={handleLogout}>Útskrá</button>
  );
}

export default SignOutButton;
