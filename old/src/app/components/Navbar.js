'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';

const navLinks = [
  { href: '/pricing', name: 'Pricing' },
  { href: '/demo', name: 'Try Now' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const pathName = usePathname();
  const loginIsActive = pathName.startsWith('/login');
  return (
    <header>
      <nav className='flex items-center justify-between p-4'>
        <span className='text-xl font-bold'>
          <Link href='/'>Pawpal</Link>
        </span>
        <div className='hidden md:block'>
          {navLinks.map((link) => {
            const isActive = pathName.startsWith(link.href);

            return (
              <Link
                className={isActive ? 'py-2 px-4 font-bold' : 'py-2 px-4'}
                href={link.href}
                key={link.name}
              >
                {link.name}
              </Link>
            );
          })}
          {session ? (
            <>
              <Link className='py-2 px-4' href='/dashboard'>
                Dashboard
              </Link>
              <button className='cta py-2 px-4' onClick={() => signOut()}>
                Sign out
              </button>
            </>
          ) : (
            <Link
              className={
                loginIsActive ? 'font-bold cta py-2 px-4' : 'cta py-2 px-4'
              }
              href='/login'
            >
              Get Started
            </Link>
          )}
        </div>
        <button className='md:hidden' onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='16'
              width='12'
              viewBox='0 0 384 512'
            >
              <path d='M326.6 166.6L349.3 144 304 98.7l-22.6 22.6L192 210.7l-89.4-89.4L80 98.7 34.7 144l22.6 22.6L146.7 256 57.4 345.4 34.7 368 80 413.3l22.6-22.6L192 301.3l89.4 89.4L304 413.3 349.3 368l-22.6-22.6L237.3 256l89.4-89.4z' />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='16'
              width='14'
              viewBox='0 0 448 512'
            >
              <path d='M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z' />
            </svg>
          )}
        </button>
        {isMobileMenuOpen && (
          <div className='mobile-menu absolute w-full top-full left-0 bg-white shadow-md md:hidden'>
            {navLinks.map((link) => {
              const isActive = pathName.startsWith(link.href);
              return (
                <Link
                  className={isActive ? 'block p-4 font-bold' : 'block p-4'}
                  href={link.href}
                  key={link.name}
                  onClick={toggleMobileMenu}
                >
                  {link.name}
                </Link>
              );
            })}

            {session ? (
              <button className='block p-4' onClick={() => signOut()}>
                Sign out
              </button>
            ) : (
              <Link
                onClick={toggleMobileMenu}
                className={loginIsActive ? 'font-bold block p-4' : 'block p-4'}
                href='/login'
              >
                Get Started
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
