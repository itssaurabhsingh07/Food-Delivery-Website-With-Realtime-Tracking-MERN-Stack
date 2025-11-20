import React from 'react'
import { useState } from 'react';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { serverUrl } from '../App';
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { auth } from '../../firebase';
import { ClipLoader } from "react-spinners"
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
const SignUp = () => {
    const primarycolor = "#ff4d2d";
    const hovercolor = "#e64323";
    const bgcolor = "#fff9f6";
    const bordercolor = "#ddd";
    const [showpassword, setshowpassword] = useState(false)
    const [role, setrole] = useState("user")
    const navigate = useNavigate()
    const [fullName, setFullName] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [mobile, setmobile] = useState("")
    const [err, seterr] = useState("")
    const [loading, setloading] = useState(false)
    const dispatch = useDispatch()
    const handlesignup = async () => {
        setloading(true)
        try {
            const result = await axios.post(`${serverUrl}/api/auth/signup`, {
                fullName, email, password, role, mobile
            }, { withCredentials: true });
            dispatch(setUserData(result.data))
           // localStorage.setItem('userData', JSON.stringify(result.data));

            seterr("")
            setloading(false)
        } catch (error) {
            seterr(error?.response?.data?.message)
            setloading(false)

        }
    }
    const handleGoogleauth = async () => {

        if (!mobile) {
            return seterr("* Mobile No. is Required ")
        }
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        try {
            const { data } = await axios.post(`${serverUrl}/api/auth/google-auth`, {
                fullName: result.user.displayName,
                email: result.user.email,
                role,
                mobile
            }, { withCredentials: true })
            dispatch(setUserData(data))
            seterr("")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='min-h-screen w-full flex items-center justify-center p-4' style={{ backgroundColor: bgcolor }}>

            <div className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px]`} style={{
                border: `1px solid ${bordercolor}`
            }}>
                <h1 className={`text-3xl font-bold mb-2`} style={{ color: primarycolor }}>WHITmets</h1>
                <p className='text-gray-600 mb-8'>Create Your Account To Get Your Delicious Food In 7 Minutes</p>

                {/*FullName*/}

                <div className='mb-4'>
                    <label htmlFor='Fullname' className='block text-gray-700 font-medium mb-1'>Full Name</label>
                    <input type='text' className='w-full border rounded-lg px-3 py-2 focus:outline-none ' placeholder='Enter Your Full Name...' style={{ border: `1px solid ${bordercolor}` }} onChange={(e) => setFullName(e.target.value)} value={fullName} required />
                </div>

                {/*Email*/}

                <div className='mb-4'>
                    <label htmlFor='Email' className='block text-gray-700 font-medium mb-1'>Your Email</label>
                    <input type='Email' className='w-full border rounded-lg px-3 py-2 focus:outline-none ' placeholder='Enter Your Maild here...' style={{ border: `1px solid ${bordercolor}` }} onChange={(e) => setemail(e.target.value)} value={email} required />
                </div>

                {/*Mobile*/}

                <div className='mb-4'>
                    <label htmlFor='tel' className='block text-gray-700 font-medium mb-1'>Mobile Number</label>
                    <input type='tel' className='w-full border rounded-lg px-3 py-2 focus:outline-none ' placeholder='Enter Your Mobile Number...' style={{ border: `1px solid ${bordercolor}` }} onChange={(e) => setmobile(e.target.value)} value={mobile} required />
                </div>

                {/*Password*/}

                <div className='mb-4'>
                    <label htmlFor='Password' className='block text-gray-700 font-medium mb-1'>Password</label>
                    <div className='relative'>
                        <input type={`${showpassword ? "text" : "password"}`} className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Type Your password...' style={{ border: `1px solid ${bordercolor}` }} onChange={(e) => setpassword(e.target.value)} value={password} required />
                        <button className='absolute right-3 cursor-pointer top-[14px] text-gray-500' onClick={() => setshowpassword(prev => !prev)}>{!showpassword ? <FaEye /> : <FaEyeSlash />}</button>
                    </div>
                </div>

                {/*Role*/}

                <div className='mb-4'>
                    <label htmlFor='Role' className='block text-gray-700 font-medium mb-1'>Role</label>
                    <div className='flex gap-2'>
                        {["user", "owner", "deliveryBoy"].map((r) => (
                            <button key={r} className='flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors cursor-pointer'
                                onClick={() => setrole(r)}
                                style={
                                    role === r ?
                                        { backgroundColor: primarycolor, color: "white" }
                                        : { border: `1px solid ${primarycolor}`, color: primarycolor }
                                }>
                                {r}</button>
                        ))}
                    </div>
                </div>
                <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} onClick={handlesignup} disabled={loading}>{loading ? <ClipLoader size={20} color='white' /> : "Sign Up"}</button>
                {err && <p className='text-red-500 text-center my-[10px]'>{err}</p>}
                <button className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-100 cursor-pointer' onClick={handleGoogleauth}>
                    <FcGoogle size={20} />
                    <span>Signup with Google</span>
                </button>
                <p className='text-center mt-6 cursor-pointer' onClick={() => navigate('/signin')}>Or SignIn With Google ? <span className='text-[#ff4d2d]'>SignIn</span></p>
            </div>
        </div>
    )
}

export default SignUp
