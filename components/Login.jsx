import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AiOutlineLogout } from 'react-icons/ai';
import { useSession, signOut } from 'next-auth/react';

const Login = () => {

    const { data } = useSession();

    return (
        <>
            {data ? (
                <div>
                    {data.user && (
                        <div className='dropdown'>
                            <Image
                                className='profile-image'  //'rounded-full cursor-pointer'
                                src='/assets/avatar-red.png'
                                alt='user'
                                width={40}
                                height={40}
                            />
                            <div className="dropdown-content">
                                <button
                                    type='button'
                                    className=' border-2 p-2 rounded-full cursor-pointer outline-none shadow-md'
                                    onClick={() => signOut({ redirect: false })}
                                >
                                    <AiOutlineLogout color='red' fontSize={21} />
                                    <br />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <>
                    <Link className='link' href='/auth/login'>
                        <p>Login</p>
                    </Link>
                </>
            )}
        </>
    )
}

export default Login

