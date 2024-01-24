import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import supabase from './src/config/supabaseClient';

type User = {
    email: string;
    password: string;
    id: string;
    name: string;
}

async function getUser(email: string): Promise<User | undefined> {
  try {
    // Query the user data based on the email
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    // Handle any errors here
    console.error('Error fetching user:', error);
    return undefined;
  }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                .object({ email: z.string().email(), password: z.string().min(6) })
                .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;
                    const hashedPassword = await bcrypt.hash('123456', 10);
                    const passwordsMatch = await bcrypt.compare(password, hashedPassword);

                    if (passwordsMatch) return user;
                }

                console.log('Invalid Credentials');
                return null;
            },
        }),
    ],
});

/*It's good practice to hash passwords before storing them in a database. 
Hashing converts a password into a fixed-length string of characters, which appears random, 
providing a layer of security even if the user's data is exposed.

In your seed.js file, you used a package called bcrypt to hash the user's password before storing 
it in the database. You will use it again later in this chapter to compare that the password entered 
by the user matches the one in the database. However, you will need to create a separate file for 
the bcrypt package. This is because bcrypt relies on Node.js APIs not available in Next.js Middleware.

The Credentials provider allows users to log in with a username and a password.

I'm using the authorize function to handle the authentication logic. 
I'm using zod to validate the email and password before checking if the user exists in the database:

The getUser function queries the user from the database.*/