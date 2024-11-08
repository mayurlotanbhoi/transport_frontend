import React from 'react'
import TripCardSkeleton from '../../../../components/Skeletons/TripCardSkeleton';
import { useGetPlanHistoriesQuery } from '../../../../services/planHistory.services';
import { FaCalendarAlt, FaIdCard, FaHourglassEnd, FaHourglassStart } from 'react-icons/fa';


export default function PlanHistory() {
    const { data: plans, isLoading, error, refetch } = useGetPlanHistoriesQuery();

    // Retry fetching on mount if there is an error
    // useEffect(() => {
    //     if (error) {
    //         const retryInterval = setInterval(() => {
    //             refetch();
    //         }, 5000); // Retry every 5 seconds

    //         return () => clearInterval(retryInterval); // Clean up the interval on unmount
    //     }
    // }, [error, refetch]);


    if (isLoading) {
        return (
            <div className=' w-full flex justify-start flex-wrap'>
                {new Array(10).fill(null).map((_, index) => (
                    <TripCardSkeleton key={index} />
                ))}
            </div>
        );
    }
    if (error) return <p>Error fetching plan: {error.message}</p>;

    console.log('plans', plans)
    return (
        <div>
            {/* PlanHistory */}
            {plans?.data?.map((plan, index) =>
                <div key={index}>
                    <PlanDetails plan={plan} />
                </div>
            )}

        </div>
    )
}


const PlanDetails = ({ plan }) => {
    return (
        <>
            <div className="max-w-md mx-auto flex bg-white shadow-lg rounded-lg overflow-hidden mt-8 ">
                {/* Left Accent Bar */}
                <div className="w-2 bg-gradient-to-b from-yellow-400 to-yellow-600"></div>

                {/* Main Content */}
                <div className="w-full p-6">
                    {/* Plan Header */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-center">
                            <h1 className="text-blue-600 text-3xl font-bold">
                                {plan.amount === 0 ? 'Free' : `₹${plan.amount}`}
                            </h1>
                            <p className="text-gray-500 font-medium">15 days</p>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <FaIdCard className="mr-2 text-blue-500" />
                            <span className="font-medium">Plan ID:</span>
                            <p className="ml-2 text-gray-800">{plan.plan_id}</p>
                        </div>
                    </div>

                    {/* Activation Dates */}
                    <div className="space-y-4 text-gray-600 mb-4">
                        <div className="flex items-center">
                            <FaHourglassStart className="mr-2 text-green-500" />
                            <span className="font-medium">Activation Start Date:</span>
                            <p className="ml-2 text-gray-800">{new Date(plan.activation_start_date).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center">
                            <FaHourglassEnd className="mr-2 text-red-500" />
                            <span className="font-medium">Activation End Date:</span>
                            <p className="ml-2 text-gray-800">{new Date(plan.activation_end_date).toLocaleDateString()}</p>
                        </div>
                    </div>

                    {/* Plan Type */}
                    <div className="flex justify-center">
                        <div className="flex items-center px-4 py-2 bg-green-100 rounded-lg shadow-inner">
                            <FaCalendarAlt className="mr-2 text-purple-500" />
                            <span className="font-medium text-gray-700">Plan Type:</span>
                            <p className="ml-2 text-gray-800 font-semibold">{plan.activation_Plan}</p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};
