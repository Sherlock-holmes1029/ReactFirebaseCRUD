import React, { useState } from 'react';
import { auth, googleAuth } from '../config/firebase';
import { createUserWithEmailAndPassword, signOut, signInWithPopup} from 'firebase/auth';

function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    //signin/up function
    const signIn = async () => {
        setLoading(true);
        setError(''); // Clear any previous errors
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // Handle successful registration, e.g., redirect or show success message
        } catch (err) {
            setError(err.message); // Display the error to the user
        } finally {
            setLoading(false);
        }
    };

    //sign in with google
    const signInWithGoogle = async () => {
        setLoading(true);
        setError('');
        try {
            await signInWithPopup(auth, googleAuth);
        } catch (err) {
            setError(err.message); 
        } finally {
            setLoading(false);
        }
    };

    //log out function
    const logOut = async () => {
        setLoading(true);
        setError(''); 
        try {
            await signOut(auth);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            <input 
                placeholder='Email' 
                onChange={(e) => setEmail(e.target.value)} 
                value={email}
            />
            <input 
                type='password' 
                placeholder='Password' 
                onChange={(e) => setPassword(e.target.value)} 
                value={password}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={signIn} disabled={loading}>
                {loading ? 'Signing In...' : 'Sign In'}
            </button>
            <button onClick={signInWithGoogle}>
                Log In with Google
            </button>
            <button onClick={logOut}>
                Log Out
                </button>
        </div>
    );
}

export default Auth;
