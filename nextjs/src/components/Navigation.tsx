import Link from 'next/link';
import React from 'react';

interface NavigationItem {
  name: string;
  link: string;
}

interface NavigationProps {
  navigationItems: NavigationItem[];
}

export default function Navigation({ navigationItems }: NavigationProps) {
  return (
    <nav className="flex items-center gap-2.5 text-md py-4">
      <Link href="/" className="border border-white font-medium p-4 mr-4">
        Hardik Vala
      </Link>
      <ul className="flex list-none">
        {navigationItems.map((item, index) => (
          <li key={index} className="mr-5">
            <Link href={item.link} className="no-underline">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
