import React from 'react'
import axios from 'axios';
import { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentAddress, setCurrentState, setCurrentCity, setUserData } from '../redux/userSlice'
import { setAddress, setLocation } from '../redux/mapSlice';

const useGetcity = () => {
    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.user)
    const apikey = import.meta.env.VITE_GEOAPIKEY
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (posistion) => {
            const latitude = posistion.coords.latitude
            const longitude = posistion.coords.longitude
            dispatch(setLocation({ lat: latitude, lon: longitude }))
            const result = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apikey}`)
           // console.log(result.data)
            dispatch(setCurrentCity(result?.data?.results[0].city ))
            dispatch(setCurrentState(result?.data?.results[0].state))
            dispatch(setCurrentAddress(result?.data?.results[0].address_line2 || address_line1))
            dispatch(setAddress(result?.data?.results[0].address_line2))
        })
    }, [userData])
}

export default useGetcity