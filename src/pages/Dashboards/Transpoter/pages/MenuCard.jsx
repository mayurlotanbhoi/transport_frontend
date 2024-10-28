import React from 'react'
import { FaCalculator, FaHistory, FaRegBuilding, FaTruckMoving, } from 'react-icons/fa'
import { FaPersonRunning } from 'react-icons/fa6'
import { CiUser } from "react-icons/ci";
import { MdHistory, MdOutlineEmojiTransportation } from 'react-icons/md'
import { LiaRunningSolid, LiaTruckMovingSolid } from "react-icons/lia";
import { Link } from 'react-router-dom'

export default function MenuCard() {

    const menuLinks = [{
        icon: <CiUser size={25} style={{ strokeWidth: 1 }} />,
        path: "/profile",
        name: "user",

    },

    {
        icon: <LiaTruckMovingSolid size={25} style={{ strokeWidth: 1 }} />,
        path: "/Lorrys",
        name: "lorry",

    },
    {
        icon: <FaRegBuilding size={25} style={{ strokeWidth: 1 }} />,
        path: "/profile",
        name: "transport",

    },
    {
        icon: <FaHistory size={25} style={{ strokeWidth: 1 }} />,
        path: "/Plan",
        name: "Plan",

    },
    {
        icon: <LiaRunningSolid size={25} style={{ strokeWidth: 1 }} />,
        path: "/trips",
        name: "Trips",

    },
    {
        icon: <FaCalculator size={25} style={{ strokeWidth: 1 }} />,
        path: "/trips-cost",
        name: "Cost",
    },



    ]
    return (
        <div className='col-span-12 xl:col-span-8 bg-white dark:bg-black dark:text-white rounded-xl p-5    shadow-md overflow-hidden'>
            <div className=' w-full flex-wrap gap-6 flex justify-between items-center'>
                {menuLinks.map((item, index) => (

                    <Link key={index} to={'/dashboard' + item.path} className=' w-10 flex flex-col items-center'>
                        <span className='primary-color rounded-lg p-2 font-semibold ' >{item.icon}</span>
                        <text className=" text-black capitalize dark:text-white">{item.name}</text>

                    </Link>

                ))}

            </div>

            {/* <div className='mt-2 w-full flex justify-between items-center'>
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

    </div> */}


        </div>
    )
}
