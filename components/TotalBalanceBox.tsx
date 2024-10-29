import React from 'react'
import AnimatedCounter from './AnimatedCounter'
import DoughnutChart from './DoughnutChart'

const TotalBalanceBox = ({ accounts = [], totalBanks, totalCurrentBalance }: TotlaBalanceBoxProps) => {
    return (
        <section className='total-balance h-full'>
            <div className='flex flex-col ml-2 gap-6'>
                <div className='flex flex-col gap-2 header-2'>
                    <h2>
                        Current Balance
                    </h2>
                    <div className='total-balance-amount flex-center gap-2'>
                        <AnimatedCounter amount={totalCurrentBalance} />
                    </div>
                </div>
                {/* <div className='total-banks-label'>
                    Bank Account: {totalBanks}
                </div> */}
            </div>
            <div className='total-balance-chart'>
                <DoughnutChart accounts={accounts} />
            </div>
        </section>
    )
}

export default TotalBalanceBox