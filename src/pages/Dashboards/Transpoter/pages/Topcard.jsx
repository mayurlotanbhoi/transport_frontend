import React from 'react'
import { FaTruck, FaTruckMoving } from 'react-icons/fa'
import { FaPersonRunning } from "react-icons/fa6";
import { MdEmojiTransportation } from 'react-icons/md';

const Topcard = () => {
    return (
        <div className='col-span-12 xl:col-span-8 primary-color rounded-t-xl p-5    shadow-md overflow-hidden'>
            <div className=' w-full flex justify-between items-center'>
                <FaTruck size={30} />
                <figure>TRA7845</figure>
            </div>

            <div className='mt-2 w-full flex justify-between items-center'>
                <div className=' flex items-center flex-col'>
                    <figure className=' font-extrabold text-2xl'>
                        100
                    </figure>
                    <div className='flex justify-between items-center'>
                        <FaPersonRunning />
                        <small className='text-[15px]'>Runing..</small>
                    </div>

                </div>

                <div className=' flex items-center flex-col'>
                    <figure className=' font-extrabold text-2xl'>
                        100
                    </figure>
                    <div className='flex justify-between items-center'>
                        <FaTruckMoving />
                        <small className='text-[15px]'>Vehicals..</small>
                    </div>

                </div>
                <div className=' flex items-center flex-col'>
                    <figure className=' font-extrabold text-2xl'>
                        100
                    </figure>
                    <div className='flex justify-between items-center'>
                        <MdEmojiTransportation />
                        <small className='text-[15px]'>Transport..</small>
                    </div>

                </div>

            </div>


        </div>
    )
}

export default Topcard
