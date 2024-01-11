'use client';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function LoginPage() {
  const { data: session } = useSession();

  const handleSubmit = (e: any) => {
    e.preventDefaut();
    const email = e.target[0].value;
    const password = e.target[1].value;

    console.log(email, password);
  };

  if (session) {
    return (
      <div className='w-full h-screen flex flex-col justify-center items-center bg-gray-100'>
        <div className='text-center p-10 bg-white shadow-lg rounded-lg'>
          <p className='text-xl mb-2'>
            Welcome,{' '}
            <span className='font-bold text-gray-800'>
              {session.user?.name}
            </span>
          </p>
          <p className='font-semibold text-gray-600 mb-4'>
            {session.user?.email}
          </p>
          <button
            className='bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-md transition duration-300'
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center bg-gray-100'>
      <div className='text-center p-10 bg-white shadow-lg rounded-lg'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            className='form-control w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:border-primary'
            placeholder='Email'
            required
          />

          <input
            type='password'
            className='form-control w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:border-primary'
            placeholder='Password'
            required
          />
          <button
            type='submit'
            className='py-2 px-6 rounded-md mb-2 transition signup-button'
          >
            Register
          </button>
        </form>
        <div className='text-gray-500 text-center my-2'>- OR -</div>
        <button
          className=' py-2 px-6 rounded-md mb-2 transition signup-button'
          onClick={() => signIn('google')}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
