import React, { useEffect, useRef, useState } from 'react'
import Nav from './Nav'
import { categories } from '../category'
import CategoryCard from './CategoryCard'
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { useSelector } from 'react-redux';
import FoodCard from './FoodCard';

const UserDashboard = () => {
  const { currentCity, shopInMyCity, itemsInMyCity } = useSelector(state => state.user)
  const cateScollRef = useRef()
  const shopScollRef = useRef()
  const [showLeftCateButton, setShowLeftCateButton] = useState(false)
  const [showRightCateButton, setShowRightCateButton] = useState(false)
  const [showLeftShopButton, setShowLeftShopButton] = useState(false)
  const [showRightShopButton, setShowRightShopButton] = useState(false)

  const updateButton = (ref, setLeftButton, setRightButton) => {
    const element = ref.current
    if (element) {
      setLeftButton(element.scrollLeft > 0)
      setRightButton(element.scrollLeft + element.clientWidth < element.scrollWidth)
    }
  }

  const scrollHandler = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth"
      })
      setTimeout(() => {
        updateButton(ref, setShowLeftCateButton, setShowRightCateButton)
      }, 300)
    }
  }

  useEffect(() => {
    if (cateScollRef.current) {
      updateButton(cateScollRef, setShowLeftCateButton, setShowRightCateButton)
      updateButton(shopScollRef, setShowLeftShopButton, setShowRightShopButton)
      cateScollRef.current?.addEventListener('scroll', () => {
        updateButton(cateScollRef, setShowLeftCateButton, setShowRightCateButton)
      })
      shopScollRef.current.addEventListener('scroll', () => {
        updateButton(shopScollRef, setShowLeftShopButton, setShowRightShopButton)
      })

    }
    return () => {
      cateScollRef?.current?.removeEventListener('scroll', () => {
        updateButton(cateScollRef, setShowLeftCateButton, setShowRightCateButton)
      })
      cateScollRef?.current?.removeEventListener('scroll', () => {
        updateButton(shopScollRef, setShowLeftShopButton, setShowRightShopButton)
      })
    }

  }, [categories])

  return (
    <div className='w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] overflow-y-auto'>
      <Nav />
      <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>
        <h1 className='text-gray-800 text-2xl sm:text-3xl'>Inspiration for Your first order</h1>
        <div className='w-full relative'>

          {showLeftCateButton && (
            <button
              className='absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10'
              onClick={() => scrollHandler(cateScollRef, "left")}
            >
              <FaChevronCircleLeft className='cursor-pointer' />
            </button>
          )}

          <div className='w-full flex overflow-x-auto gap-4 pb-2' ref={cateScollRef}>
            {categories.map((cate, index) => (
              <CategoryCard name={cate.category} image={cate.image} key={index} />
            ))}
          </div>

          {showRightCateButton && (
            <button
              className='absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10'
              onClick={() => scrollHandler(cateScollRef, "right")}
            >
              <FaChevronCircleRight className='cursor-pointer' />
            </button>
          )}
        </div>
      </div>
      <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>
        <h1 className='text-gray-800 text-2xl sm:text-3xl'>Best Shop in {currentCity}</h1>
        <div className='w-full relative'>

          {showLeftShopButton && (
            <button
              className='absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10'
              onClick={() => scrollHandler(shopScollRef, "left")}
            >
              <FaChevronCircleLeft className='cursor-pointer' />
            </button>
          )}

          <div className='w-full flex overflow-x-auto gap-4 pb-2' ref={shopScollRef}>
            {shopInMyCity?.map((shop, index) => (
              <CategoryCard name={shop.name} image={shop.image} key={index} />
            ))}
          </div>

          {showRightShopButton && (
            <button
              className='absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10'
              onClick={() => scrollHandler(shopScollRef, "right")}
            >
              <FaChevronCircleRight className='cursor-pointer' />
            </button>
          )}
        </div>
      </div >
      <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>
        <h1 className='text-gray-800 text-2xl sm:text-3xl'>
          Suggested Food Items
        </h1>
        <div className='w-full h-auto flex flex-wrap gap-[20px] justify-center'>
          {itemsInMyCity?.map((item, index) => (
            <FoodCard key={index} data={item} />
          ))}
        </div>
      </div>

    </div>
  )
}

export default UserDashboard
