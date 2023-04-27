'use client';

import Link from 'next/link';
import { useState } from 'react'

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className='flex items-center justify-between flex-wrap p-6 bg-black'>
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
        <Link href="/" className="font-semibold text-xl tracking-tight">Tailwind CSS</Link>
      </div>
      <div className="block lg:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="flex items-center px-3 py-2 rounded text-white hover:text-white hover:border-white" >
          <svg className={`fill-current h-5 w-5 ${isOpen ? "hidden" : "block"}`} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          <svg className={`fill-current h-5 w-5 ${isOpen ? "block" : "hidden"}`} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>
      <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? "block" : "hidden"}`}>
        <div className="text-sm lg:flex-grow">
          <Link href="/map" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-orange-300">
            Map
          </Link>
          <Link href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-orange-300">
            Examples
          </Link>
          <Link href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-orange-300">
            Blog
          </Link>
        </div>
        <div>
          <a href="https://docs.google.com/spreadsheets/d/1Y_yiT-_7IimioBvcqiCPwLzTLazfdRyzZ4k3cpQXiAw/edit#gid=681415175" target='_blank' className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-orange-300 hover:bg-white mt-4 lg:mt-0">Climate Risk Rating dataset</a>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;