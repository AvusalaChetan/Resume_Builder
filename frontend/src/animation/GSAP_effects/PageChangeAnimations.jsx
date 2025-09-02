import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
const PageChange = ({ children }) => {
  useGSAP(() => {
    gsap.to('.B', {
      y: -1000,
      stagger: {
        amount: -0.2,
      },
      duration: 1,
      ease: "power2.inOut",
    })
  }, [])
  return (
    <div className='relative overflow-x-hidden '>
      <div className='flex absolute top-0 left-0'>
        <div className='B B1 w-[25vw] bg-black h-[100vh]  border '></div>
        <div className='B B2 w-[25vw] bg-black h-[100vh]  border '></div>
        <div className='B B3 w-[25vw] bg-black h-[100vh]  border '></div>
        <div className='B B4 w-[25vw] bg-black h-[100vh]  border '></div>
        <div className='B B5 w-[25vw] bg-black h-[100vh]  border '></div>
      </div>
      <div className='content w-full h-full bg-red-700'>
        {children}
      </div>
    </div>
  )
}

export const PageChangeOnRoute = ({ children }) => {
  const stairParentRef = useRef(null);
  const location = useLocation();
  const pageRef = useRef(null)

  useGSAP(() => {
    if (location.pathname === '/') {
      return;
    }
    const tl = gsap.timeline();

    tl.set(stairParentRef.current, { autoAlpha: 1 })
      .from('.stair', {
        height: 0,
        stagger: { amount: 0.3, from: "end" },
      })
      .to('.stair', {
        y: '100%',
        stagger: { amount: 0.3, from: "end" },
      })
      .set(stairParentRef.current, { autoAlpha: 0 })
      .to('.stair', {
        y: 0,
      });

    gsap.from(pageRef.current, {
      opacity: 0,
      delay: 1.3,
      scale:1.2
    })

  }, [location.pathname]);

  return (
    <div className="relative overflow-x-hidden h-screen w-screen">
      <div ref={stairParentRef} className="flex absolute top-0 left-0">
        <div className="stair w-[25vw] bg-black h-[100vh] border"></div>
        <div className="stair w-[25vw] bg-black h-[100vh] border"></div>
        <div className="stair w-[25vw] bg-black h-[100vh] border"></div>
        <div className="stair w-[25vw] bg-black h-[100vh] border"></div>
        <div className="stair w-[25vw] bg-black h-[100vh] border"></div>
      </div>
      <div
        ref={pageRef}
        className="content w-full h-full">{children}</div>
    </div>
  );
};





export default PageChange