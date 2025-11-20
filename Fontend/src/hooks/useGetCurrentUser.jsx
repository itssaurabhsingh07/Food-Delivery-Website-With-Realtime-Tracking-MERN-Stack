import React from 'react'
import axios from 'axios';
import { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'


const useGetCurrentUser = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/user/current`, {
                    withCredentials: true, 
                })
                dispatch(setUserData(result.data));

            } catch (error) {
                console.error('status', error.response?.status);
                console.error('data', error.response?.data);
            }
        }
        fetchUser()
    }, [dispatch])
}

export default useGetCurrentUser