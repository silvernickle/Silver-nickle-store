import React, { useState, useRef } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const login = () => {

	const router = useRouter();

	const { data, status } = useSession();

	const [email, setEmail] = useState('');
  	const [password, setPassword] = useState('');

	const [errMsg, setErrMsg] = useState('');

	const emailRef = useRef(); //set's the focus of the screen on the email input field
	const errRef = useRef();

	const handleSubmitSignIn = async (e) => {
    e.preventDefault();

    await signIn('sanity-login', {
      redirect: false,
      email,
      password
    });
  };

  	if (status === 'loading') return <p>Loading...</p>;

//   if (data) {
//     return (
//       <div>
//         <p>User: {data.user.name}</p>
//         <button onClick={() => signOut({ redirect: false })}>Sign Out</button>
//       </div>
//     );
//   }

	if (data?.user) {			//status === 200
    	router.push('/');
  	}

	return (
			<div className='auth-wrapper'>
				<div className='auth-container'>
					<form onSubmit={handleSubmitSignIn}>
						{errMsg && <p ref={errRef} aria-live="assertive">{errMsg}</p>}
						<h1>Sign In</h1>
					<div className='input-field'>
						<label htmlFor='email'>EMAIL:</label>
						<input 
							type='email'
							name='email'
							autoComplete='off'
							ref={emailRef}
							className=''
							placeholder='name@example.com'
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							required
						/>
					</div>

					<div className='input-field'>
						<label htmlFor='password'>PASSWORD:</label>
						<input 
							type='password'
							name='password'
							className=''
							placeholder='Password'
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							required
						/>
					</div>

						<div>
							<button type='submit' className='auth-btn-1'>SIGN IN</button>
						</div>

						<Link href='/auth/signup'>
							<button className='auth-btn-2'>Need an account? Sign up</button>
						</Link>

					</form>

				</div>

				<div>
					<h3 className='auth-container'>OR</h3>
				</div>

				<div className='auth-container'>
					<button className='google-button' onClick={() => signIn('google')}>Sign in with Google</button>
				</div>
					
			</div>
		)
}

export default login