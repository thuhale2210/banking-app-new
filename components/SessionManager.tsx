/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useRouter } from 'next/navigation';
import WarningModal from './WarningModal';
import React, { useState, useEffect, ReactNode } from 'react';
import { signOut } from '@/lib/actions/user.actions';

const SessionManager = ({ children }: { children: ReactNode }) => {
    const [warningOpen, setWarningOpen] = useState(false);
    const [timeoutId, setTimeoutId] = useState<number | null>(null);
    const [warningTimeoutId, setWarningTimeoutId] = useState<number | null>(null);
    const router = useRouter();

    const resetTimeouts = () => {
        if (timeoutId !== null) clearTimeout(timeoutId);
        if (warningTimeoutId !== null) clearTimeout(warningTimeoutId);

        const newWarningTimeoutId = window.setTimeout(() => {
            setWarningOpen(true);
        }, 1 * 60 * 1000); // 5 minutes

        const newTimeoutId = window.setTimeout(() => {
            setWarningOpen(false);
            signOut();
            router.push('/sign-in');
            console.log('Logged out due to inactivity');
        }, 10 * 60 * 1000); // 10 minutes

        setWarningTimeoutId(newWarningTimeoutId);
        setTimeoutId(newTimeoutId);
    };

    const handleActivity = () => {
        resetTimeouts();
    };

    const handleContinueSession = () => {
        setWarningOpen(false);
        resetTimeouts();
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleActivity);
        document.addEventListener('keydown', handleActivity);

        resetTimeouts();

        return () => {
            document.removeEventListener('mousemove', handleActivity);
            document.removeEventListener('keydown', handleActivity);
            if (timeoutId !== null) clearTimeout(timeoutId);
            if (warningTimeoutId !== null) clearTimeout(warningTimeoutId);
        };
    }, []);

    return (
        <>
            <WarningModal
                open={warningOpen}
                onClose={handleContinueSession}
                onContinue={handleContinueSession}
                onSignOut={() => {
                    signOut();
                    router.push('/sign-in');
                }}
            />
            {children}
        </>
    );
};

export default SessionManager;
