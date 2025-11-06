'use client';

import "@/app/navigation.css";
import Link from "@/node_modules/next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Shield } from 'lucide-react';


export default function MainNavBar({ activeItem } : { activeItem: string}) {
    return (
        <nav className="mainNav">
            <ul>
                <li className="mainNavLi">
                    <Link className={activeItem === 'home' ? 'mainNavAPress' : 'mainNavA'} href="/">Home</Link>
                    <SignedIn><Link className={activeItem === 'children' ? 'mainNavAPress' : 'mainNavA'} href="/dashboard/children">Children</Link></SignedIn>
                    <Link className={activeItem === 'faqs' ? 'mainNavAPress' : 'mainNavA'} href="/faqs">FAQs</Link>
                    <Link className={activeItem === 'links' ? 'mainNavAPress' : 'mainNavA'} href="/links">Important Links</Link>
                    <Link className={activeItem === 'about' ? 'mainNavAPress' : 'mainNavA'} href="/about">About Us</Link>
                    <a className={activeItem === 'contact' ? 'mainNavAPress' : 'mainNavA'}>Contact Us</a>
                    <SignedOut><Link className={activeItem === 'law' ? 'mainNavAPress lawEnforcementTab' : 'mainNavA lawEnforcementTab'} href="/law-enforcement"><Shield /> Law Enforcement</Link></SignedOut>
                </li>
            </ul>
        </nav>
    )
}