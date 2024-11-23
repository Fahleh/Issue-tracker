'use client';

import Link from 'next/link';
import React from 'react';
import { AiFillBug } from 'react-icons/ai';
import { usePathname } from 'next/navigation';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import { Skeleton } from '@/app/components';
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from '@radix-ui/themes';

const NavBar = () => {
  return (
    <nav className="border-b mb-5 py-3 px-5">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="5">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' },
  ];

  return (
    <ul className="flex space-x-6 ">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={classnames({
              'nav-link': true,
              '!text-zinc-900': link.href === currentPath,
            })}
          >
            {' '}
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === 'loading') return <Skeleton width="3rem" />;

  if (status === 'unauthenticated')
    return (
      <Flex gap='3'>
         <Link className="nav-link" href="/register">
          Register
        </Link>
        <Link className="nav-link" href="/api/auth/signin">
          Login
        </Link>
       
      </Flex>
    );

  return (
    <Box>
      <Box>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            {session?.user?.image ? (
              <Avatar
                src={session.user.image}
                fallback="?"
                size="2"
                radius="full"
                className="cursor-pointer"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 cursor-pointer">
                ?
              </div>
            )}
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size="2">{session!.user!.email}</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href="/api/auth/signout">Log out</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Box>
    </Box>
  );
};

export default NavBar;
