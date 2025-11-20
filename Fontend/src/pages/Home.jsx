import React from 'react'
import { useSelector } from 'react-redux'
import UserDashboard from '../components/userDashboard';
import OwnerDashboard from '../components/ownerDashboard';
import DeliverBoyDashoard from '../components/DeliverBoyDashboard';
import DeliverBoyDashboard from '../components/DeliverBoyDashboard';

const Home = () => {
    const userData = useSelector((state) => state.user.userData);
    return (
        <div className='w-[100vw] min-h-[100vh] pt-[100px] flex flex-col items-center bg-[#fff9f6]'>
            {userData.role == "user" && <UserDashboard />}
            {userData.role == "owner" && <OwnerDashboard />}
            {userData.role == "deliveryBoy" && <DeliverBoyDashboard />}

        </div>
    )
}

export default Home