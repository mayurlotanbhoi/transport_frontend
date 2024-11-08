import React from 'react'
import Topcard from './Topcard.jsx'
import MenuCard from './MenuCard.jsx'
import RunningSatatus from './RunningSatatus.jsx'
import { useGetVehiclesQuery } from '../../../../services/vehicle.services.js';
import ImageCarousel from '../../../../components/ads/adsSlider.jsx';

export default function Menu() {
    const { isLoading, error } = useGetVehiclesQuery();
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
            <ImageCarousel />
            <Topcard />
            <MenuCard />
            <RunningSatatus />


        </div>
    )
}
