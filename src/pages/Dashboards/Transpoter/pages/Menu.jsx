import React from 'react'
import Topcard from './Topcard.jsx'
import MenuCard from './MenuCard.jsx'
import RunningSatatus from './RunningSatatus.jsx'
import { useGetVehiclesQuery } from '../../../../services/vehicle.services.js';
import ImageCarousel from '../../../../components/ads/adsSlider.jsx';
import { useGetPartyQuery } from '../../../../services/party.services.js';
import { useSelector } from 'react-redux';

export default function Menu() {
    const { isLoading, error } = useGetVehiclesQuery();
    const { isLoading: partyLoading, error: partyError } = useGetPartyQuery();

    const { error: vehicleError, loading, vehicles } = useSelector(vehicle => vehicle.vehicle)
    const { error: partieError, loading: partieLading, partiess } = useSelector(party => party.party)

    // console.log("loading, vehicles", vehicles?.length)

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
            <ImageCarousel />
            <Topcard vehicles={vehicles} partiess={partiess?.length} />
            <MenuCard />
            <RunningSatatus />


        </div>
    )
}
