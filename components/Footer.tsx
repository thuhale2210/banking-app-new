import React from 'react'
import Image from 'next/image'
import { signOut } from '@/lib/actions/user.actions'
import { useRouter } from 'next/navigation'

const Footer = ({ user, type = 'desktop' }: FooterProps) => {
    const router = useRouter()

    const handleSignOut = async () => {
        const signedOut = await signOut()

        if (signedOut) router.push('/sign-in')
    }
    console.log('user', user.firstName, user.lastName)

    return (
        <footer className="flex flex-col justify-center items-center rounded-2xl bg-[#1E1E26] bg-opacity-60 py-4">
            <div className={type === 'mobile' ? 'footer_name-mobile' : 'footer_name'}>
                <p className="text-4xl font-bold text-white">
                    {user?.firstName[0]}
                </p>
            </div>
            <div className="text-white/80 font-semibold text-lg mt-2">
                {user?.firstName} {user?.lastName}
            </div>
            <div className="text-white/80 text-base mt-1">
                {user?.email}
            </div>
            <div onClick={handleSignOut} className='footer_image'>
                <Image src='/icons/logout.svg' fill alt='log out' />
            </div>
        </footer>

    )
}

export default Footer