import axios from 'axios';
import React, { useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate, useParams } from 'react-router-dom';
import { serverUrl } from '../App';
import { ClipLoader } from 'react-spinners';


const ForgotPassword = () => {
    const [step, setstep] = useState(1)
    const [email, setemail] = useState("")
    const navigate = useNavigate()
    const [otp, setotp] = useState("")
    const [newpassword, setnewpassword] = useState("")
    const [confirmpassword, setconfirmpassword] = useState("")
    const [err, seterr] = useState("")
    const [loading, setloading] = useState(false)
    const handleSentOtp = async () => {
        setloading(true)
        try {
            const result = await axios.post(`${serverUrl}/api/auth/send-otp`, { email }, { withCredentials: true })
            console.log(result)
            seterr("")
            setstep(2)
            setloading(false)

        } catch (error) {
            seterr(error?.response?.data?.message)
            setloading(false)

        }
    }
    const handleVerifyOtp = async () => {
        setloading(true)
        try {
            const result = await axios.post(`${serverUrl}/api/auth/verify-otp`, { email, otp }, { withCredentials: true })
            console.log(result)
            seterr("")
            setstep(3)
            setloading(false)

        } catch (error) {
            seterr(error?.response?.data?.message)
            setloading(false)


        }
    }
    const handleResetPassword = async () => {
        if (newpassword != confirmpassword) {
            return null
        }
        setloading(true)
        try {
            const result = await axios.post(`${serverUrl}/api/auth/reset-password`, { email, newPassword: newpassword }, { withCredentials: true })
            seterr("")
            console.log(result)
            setloading(false)

            navigate("/signin")
        } catch (error) {
            seterr(error?.response?.data?.message)
            setloading(false)


        }
    }
    return (
        <div className='flex items-center w-full justify-center min-h-screen p-4 bg-[#fff9f6]'>
            <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8'>
                <div className='flex items-center gap-4 mb-4'>
                    <IoIosArrowRoundBack size={30} className='text-[#ff4d2d] cursor-pointer' onClick={() => navigate("/signin")} />
                    <h1 className='text-2xl font-bold text-center text-[#ff4d2d]'>Forgot Password</h1>
                </div>
                {step == 1 &&
                    <div>
                        {/*Email*/}

                        <div className='mb-6'>
                            <label htmlFor='Email' className='block text-gray-700 font-medium mb-1'>Your Email</label>
                            <input type='Email' className='w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none' placeholder='Enter Your Maild here...' onChange={(e) => setemail(e.target.value)} value={email} />
                        </div>
                        <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} onClick={handleSentOtp} disabled={loading}>{loading?<ClipLoader size={20} color='white'/>:"Send Otp"}</button>
                        {err && <p className='text-red-500 text-center my-[10px]'>{err}</p>}

                    </div>}

                {step == 2 &&
                    <div>
                        <div className='mb-6'>
                            <label htmlFor='Email' className='block text-gray-700 font-medium mb-1'>OTP</label>
                            <input type='email' className='w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none' placeholder='Enter New Password' onChange={(e) => setotp(e.target.value)} value={otp} required />
                        </div>
                        <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} onClick={handleVerifyOtp} disabled={loading}>{loading?<ClipLoader size={20} color='white'/>:"Verify Otp"}</button> 
                        {err && <p className='text-red-500 text-center my-[10px]'>{err}</p>}

                    </div>}

                {step == 3 &&
                    <div>
                        <div className='mb-6'>
                            <label htmlFor='newpassword' className='block text-gray-700 font-medium mb-1'>New Password</label>
                            <input type='password' className='w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none' placeholder='Enter Password' onChange={(e) => setnewpassword(e.target.value)} value={newpassword} />
                        </div>
                        <div className='mb-6'>
                            <label htmlFor='Confirmpassword' className='block text-gray-700 font-medium mb-1'>Confirm Password</label>
                            <input type='password' className='w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none' placeholder='Confirm Password' onChange={(e) => setconfirmpassword(e.target.value)} value={confirmpassword} required />
                        </div>
                        <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} onClick={handleResetPassword} disabled={loading}>{loading?<ClipLoader size={20} color='white'/>:"Reset Password"}</button>
                        {err && <p className='text-red-500 text-center my-[10px]'>{err}</p>}

                    </div>}
            </div>
        </div>
    )
}

export default ForgotPassword