import React from 'react'
import axios from 'axios';
import { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setMyShopData } from '../redux/ownerSlice';


const useGetMyShop = () => {
    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.user)
    useEffect(() => {
        const fetchShop = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/shop/get-my`, {
                    withCredentials: true, 
                })
                dispatch(setMyShopData(result.data));

            } catch (error) {
                console.error('status', error.response?.status);
                console.error('data', error.response?.data);
            }
        }
        fetchShop()
    }, [userData])
}

export default useGetMyShop