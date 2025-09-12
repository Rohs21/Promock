"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {
    const path = usePathname();
    
    useEffect(() => {
        console.log(path)
    }, [path])

    const navItems = [
        { href: "/dashboard", label: "Dashboard" },
        { href: "/dashboard/questions", label: "Questions" },
        { href: "/dashboard/upgrade", label: "Upgrade" },
        { href: "/dashboard/how", label: "How it Works?" }
    ]

    return (
        <header className='flex p-4 items-center justify-between bg-secondary shadow-sm border-b'>
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <Image 
                    src={'/logo.png'} 
                    width={50} 
                    height={50} 
                    alt='logo' 
                    className="object-contain"
                />
                <h1 className="text-2xl font-bold text-primary">Pro-Mock</h1>
            </Link>

            {/* Navigation */}
            <nav className='hidden md:block'>
                <ul className='flex gap-8 items-center'>
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link 
                                href={item.href}
                                className={`hover:text-primary hover:font-bold transition-all duration-200 cursor-pointer px-3 py-2 rounded-md hover:bg-primary/5 ${
                                    path === item.href ? 'text-primary font-bold bg-primary/10' : 'text-gray-700'
                                }`}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Mobile Menu Button - for future mobile implementation */}
            <div className='md:hidden'>
                {/* Add mobile menu button here if needed */}
            </div>

            {/* User Button with increased size */}
            <div className="flex items-center">
                <UserButton 
                    appearance={{
                        elements: {
                            avatarBox: "w-10 h-10", // Increased from default size
                            userButtonTrigger: "hover:opacity-80 transition-opacity"
                        }
                    }}
                    showName={false}
                />
            </div>
        </header>
    )
}

export default Header