'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const footerLinks = [
  { href: '/privacy-policy', name: 'Privacy Policy' },
  { href: '/terms-of-service', name: 'Terms of Service' },
  { href: '/affiliate-disclosure', name: 'Affiliate Disclosure' },
];

const Footer = () => {
  const footerPathName = usePathname();
  return (
    <footer className='flex justify-between items-center p-4 bg-gray-100 text-sm md:flex-row flex-col'>
      <div className='text-left mb-4 md:mb-0'>
        <p>&copy; {new Date().getFullYear()} Pawpal. All rights reserved.</p>
        <p>
          For educational purposes only. Not a substitute for professional
          veterinary advice.
        </p>
        <p>
          <Link href='/disclaimer' className='hover:text-blue-600'>
            Full Disclaimer
          </Link>
        </p>
      </div>
      <div className='flex justify-end'>
        {footerLinks.map((link) => {
          const isActive = footerPathName.startsWith(link.href);
          return (
            <Link
              href={link.href}
              key={link.name}
              className={`p-2 ${
                isActive ? 'font-bold' : ''
              } hover:text-blue-600`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
