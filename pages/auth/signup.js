import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signOut, signIn } from 'next-auth/react';
import { signUp } from 'next-auth-sanity/client';
import { FaInfoCircle } from 'react-icons/fa';

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%_]).{8,24}$/;

const signup = () => {

  const { data, status } = useSession();

  //const [email, setEmail] = useState('');
  //const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const router = useRouter();
  const errRef = useRef();
  const emailRef = useRef();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [password2, setPassword2] = useState('');

  const [validMatch, setValidMatch] = useState(false); //to confirm if the 2 passwords match
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false); //this state reps a successfull signup

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    // console.log(result);
    // console.log(email);
    setValidEmail(result);
  }, [email]); //validates the email whenever an email has been inputed

  useEffect(() => {
      const result = PWD_REGEX.test(password);
      // console.log(result);
      // console.log(password);
      setValidPassword(result);
      const match = password === password2;
      setValidMatch(match);
  }, [password, password2]);

  useEffect(() => {
      setErrMsg('');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await signUp({
      email,
      password,
      name
    });

    await signIn('sanity-login', {
      redirect: false,
      email,
      password
    });
  };

  if (status === 'loading') return <p>Loading...</p>;

  if (data) {
    router.push('/');
  }

  return (
    <div className='auth-wrapper'>
      {/* {data && (
        <div>
          <p>User: {data?.user.name}</p>
          <button onClick={() => signOut({ redirect: false })}>Sign Out</button>
        </div>
      )} */}
       <div className='auth-container'>
         <form onSubmit={handleSubmit}>
 					{errMsg && <p ref={errRef} aria-live="assertive">{errMsg}</p>}
           <h1>SIGN UP</h1>
           <div className='input-field'>
             <label htmlFor='email'>EMAIL:</label>
             <input 
               type='email'
               name='email'
               autoComplete='off'
               ref={emailRef}
 							className=''
 							placeholder='name@example.com'
               aria-invalid={validEmail ? "false" : "true"} //helps with form validation. if the email is valid set the aria-invalid to false else it's true
 							onChange={(e) => setEmail(e.target.value)}
 							value={email}
 							required
             />
             {/* <p className='email-warning'>Please provide a valid email address!</p> */}
           </div>

 					<div className='input-field'>
 						<label htmlFor='password'>PASSWORD:</label>
             <input 
               type='password'
               name='password'
               id='password'
 							className=''
 							placeholder='Password'
 							onChange={(e) => setPassword(e.target.value)}
               aria-invalid={validPassword ? "false" : "true"}
               aria-describedby="pwdnote"
               onFocus={() => setPasswordFocus(true)}
               onBlur={() => setPasswordFocus(false)}
 							required
             />
             {/* {passwordFocus && !validPassword && (
               <p id="pwdnote" className=''>
                   <FaInfoCircle />
                     8 to 24 characters.<br />
                   Must include uppercase and lowercase letters,<br /> a number and a special character.<br />
                   Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
               </p>
             ) } */}
 					</div>

           <div className='input-field'>
 						<label htmlFor='password2'>CONFIRM PASSWORD:</label>
             <input 
               type='password'
               id='password2'
 							className=''
 							placeholder='Password2'
 							onChange={(e) => setPassword2(e.target.value)}
               aria-invalid={validMatch ? "false" : "true"}
               aria-describedby="matchnote"
               onFocus={() => setMatchFocus(true)}
               onBlur={() => setMatchFocus(false)}
 							required
             />
             {matchFocus && !validMatch && (
               <p id="matchnote" className=''>
                   <FaInfoCircle />
                     Must match the first password input field.
               </p>
             ) }
 					</div>

 					<div>
 						<button className='auth-btn-1'>SIGN UP</button>
 					</div>

 					<Link href='/auth/login'>
 						<button className='auth-btn-2'>Already have an account?  <br/> Sign in</button>
 					</Link>
         </form>
       </div>

 			<div>
 				<h3 className='auth-container'>OR</h3>
 			</div>

      <div className='auth-container'>
				<button className='google-button' onClick={() => signIn('google')}>Sign in with Google</button>
        {/* <button className='google-button' onClick={() => signIn('google')} disabled>G Sign In</button> */}
			</div>

    </div>
  )
}

export default signup