'use client';

import "@/app/navigation.css";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Shield } from 'lucide-react';


export default function MainNavBar({ activeItem }) {
    return (
        <nav className="mainNav">
            <ul>
                <li className="mainNavLi">
                    <a className={activeItem === 'home' ? 'mainNavAPress' : 'mainNavA'} href="/">Home</a>
                    <SignedIn><a className={activeItem === 'children' ? 'mainNavAPress' : 'mainNavA'} href="/dashboard/children">Children</a></SignedIn>
                    <a className={activeItem === 'faqs' ? 'mainNavAPress' : 'mainNavA'} href="/faqs">FAQs</a>
                    <a className={activeItem === 'links' ? 'mainNavAPress' : 'mainNavA'} href="/links">Important Links</a>
                    <a className={activeItem === 'about' ? 'mainNavAPress' : 'mainNavA'} href="/about">About Us</a>
                    <a className={activeItem === 'contact' ? 'mainNavAPress' : 'mainNavA'}>Contact Us</a>
                    <SignedOut><a className={activeItem === 'law' ? 'mainNavAPress lawEnforcementTab' : 'mainNavA lawEnforcementTab'} href="/law-enforcement"><Shield /> Law Enforcement</a></SignedOut>
                </li>
            </ul>
        </nav>
    )
}