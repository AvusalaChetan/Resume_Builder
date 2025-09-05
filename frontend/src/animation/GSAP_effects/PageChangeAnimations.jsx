import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import { useLocation } from "react-router-dom";
const images = document.querySelectorAll('.imgs img');
    
    images.forEach((img, index) => {
      img.addEventListener('mousemove', (e) => {
        const rect = img.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(img, {
          x: x * 0.3,
          y: y * 0.3,
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      img.addEventListener('mouseleave', () => {
        gsap.to(img, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)"
        });
      });
    });

const PageChange = ({ children }) => {

  useGSAP(() => {
    const tl = gsap.timeline()
    
    // Set initial state first
    gsap.set('.B', { y: 0, opacity: 1, display: 'block' })
    
    tl.to('.B', {
      y: -1000,
      stagger: {
        amount: 0.2,
        from: "start"
      },
      duration: 1.2,
      ease: "power2.inOut",
    })
    .to('.B', {
      opacity: 0,
      duration: 0.2,
      ease: "power2.out"
    })
    .set('.B', { display: "none" })
  }, [])
  
  return (
    <div className='relative overflow-hidden '>
      <div className='flex absolute top-0 left-0 z-[9999]'>
        <div className='B B1 w-[25vw] bg-black h-screen'></div>
        <div className='B B2 w-[25vw] bg-black h-screen'></div>
        <div className='B B3 w-[25vw] bg-black h-screen'></div>
        <div className='B B4 w-[25vw] bg-black h-screen'></div>
        <div className='B B5 w-[25vw] bg-black h-screen'></div>
      </div>
      <div className='content w-full h-full '>
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
    <div className="relative overflow-x-hidden h-screen w-screen border">
      <div ref={stairParentRef} className="flex absolute top-0 left-0">
        <div className="stair w-[25vw] bg-black h-screen "></div>
        <div className="stair w-[25vw] bg-black h-screen "></div>
        <div className="stair w-[25vw] bg-black h-screen "></div>
        <div className="stair w-[25vw] bg-black h-screen "></div>
        <div className="stair w-[25vw] bg-black h-screen "></div>
      </div>
      <div
        ref={pageRef}
        className="content w-full h-full">{children}</div>
    </div>
  );
};





export default PageChange