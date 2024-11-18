'use client';

import Link from 'next/link';
import React from 'react';
import { AiFillBug } from 'react-icons/ai';
import { usePathname } from 'next/navigation';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import { Box, Container, Flex } from '@radix-ui/themes';

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const navLinks = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' },
  ];

  console.log(status);

  return (
    <nav className="border-b mb-5 py-3 px-5">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="5">
            <Link href="/">
              <AiFillBug />
            </Link>
            <ul className="flex space-x-6 ">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={classnames({
                      'text-zinc-500': link.href !== currentPath,
                      'text-zinc-900': link.href === currentPath,
                      'hover:text-zinc-800 transition-colors': true,
                    })}
                  >
                    {' '}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            <Box>
              {status === 'authenticated' && (
                <Link href="/api/auth/signout">Log out</Link>
              )}
              {status === 'unauthenticated' && (
                <Link href="/api/auth/signin">Login</Link>
              )}
            </Box>
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
