'use client'

import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const Sidebar = ({ user }: SiderbarProps) => {
    const pathName = usePathname()

    return (
        <section className='sidebar'>
            <nav className='flex flex-col gap-4'>
                <Link href='/' className='mb-12 cursor-pointer items-center gap-2'>
                    <Image src='/icons/logo.svg' width={24} height={24} alt='Logo' className='size-[24px] max-xl:size-14' />
                    <h1 className='sidebar-logo'>Golden Pig</h1>
                </Link>

                {sidebarLinks.map((item) => {
                    const isActive = item.route === pathName || pathName.startsWith(`${item.route}/`)
                    return (
                        <Link key={item.label} href={item.route} className={cn('sidebar-link', { 'bg-bank-gradient': isActive })}>
                            <div className='relative size-6'>
                                <Image src={item.imgURL} alt={item.label} fill className={cn({ 'brightness-[3] invert-0': isActive })} />
                            </div>
                            <p className={cn("sidebar-label", { "!text-white": isActive })}>
                                {item.label}
                            </p>
                        </Link>
                    )
                })}

                USER
            </nav>
            FOOTER
        </section>
    )
}

export default Sidebar