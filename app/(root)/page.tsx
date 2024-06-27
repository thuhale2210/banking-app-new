import HeaderBox from '@/components/Header'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import React from 'react'

const Home = async () => {
    const loggedIn = await getLoggedInUser()

    return (
        <section className='home'>
            <div className='home-content'>
                <header className='home-header'>
                    <HeaderBox
                        type='greeting'
                        title='Welcome'
                        user={loggedIn?.firstName || 'Guest'}
                        subtext='Access and manage your finances with ease'
                    />

                    <TotalBalanceBox
                        accounts={[]}
                        totalBanks={1}
                        totalCurrentBalance={1250000.35} />
                </header>

                RECENT TRANSACTIONS
            </div>

            <RightSidebar user={loggedIn} transactions={[]} banks={[{ currentBalance: 123.50 }, { currentBalance: 123.50 }]} />
        </section> 
    )
}

export default Home