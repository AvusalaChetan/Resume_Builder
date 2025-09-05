import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { _horizontal } from "gsap/Observer";
import Draggable from "gsap/Draggable";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const IntoPage = () => {
  const introRef = useRef(null);
  const mainTextRef = useRef(null);
  const [imgs, setimgs] = useState([
    "/images/res1.webp",
    "/images/res2.webp",
    "/images/res3.webp",
    "/images/res4.webp",
    "/images/res6.webp",
    "/images/res7.webp",
    "/images/res8.webp",
  ])

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.from(".left", {
        opacity: 0,
        scale: 0.8,
        y: -50,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 1.5, // Changed to 1.5 to start after PageChange completes
      })
        .from(
          "li",
          {
            x: -100,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "back.out(1.7)",
          },
          "-=0.7"
        )
        .fromTo(
          ".intro-btn",
          { opacity: 0, scale: 0.5 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "elastic.out(1, 0.5)",
          },
          "-=0.5"
        )
        .from(
          ".intro-img",
          {
            x: 100,
            opacity: 0,
            scale: 0.8,
            duration: 1,
            ease: "power2.out",
          },
          "-=1"
        );
    },
    { scope: introRef }
  );

  //------------------------------
const plain1 = useRef(null)
const plain2 = useRef(null)
const plain3 = useRef(null)

  let xForce = 0
  let yForce = 0
  let speed = 0.01
  let requestAnimationFrameId = null;
const easing = 0.08

  const handileOnMouseMove = (e)=>{
const {movementX,movementY} = e;
xForce += movementX *speed;
yForce += movementY *speed;
if(!requestAnimationFrameId){
  requestAnimationFrameId = requestAnimationFrame(animate)
}
  }

  const lerp = (start ,end,amount ) => start*(1-amount)+end*amount;

  const animate = ()=>{
    xForce = lerp(xForce,0,easing)
    yForce = lerp(yForce,0,easing)

    gsap.set(plain1.current,{x:`+=${xForce}`,y:`+=${yForce}`})
    gsap.set(plain2.current,{x:`+=${xForce * 0.5}`,y:`+=${yForce * 0.5}`})
    gsap.set(plain3.current,{x:`+=${xForce * 0.25}`,y:`+=${yForce * 0.25}`})
  requestAnimationFrame(animate)
  }
  return (
    <div
      ref={introRef}
      className=" min-h-screen w-full overflow-hidden bg-white relative"
    >
      <div className="h-16 flex items-center loading-font font-bold fixed backdrop-blur-xl w-full z-5 px-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl">Resume_Builder</h1>
      </div>

      <div className="page1  h-screen w-full mx-auto flex flex-col sm:flex-row justify-center items-center gap-8 mt-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-xl text-center sm:text-left ">
          <div ref={mainTextRef}>
            <h1 className="heading left text-2xl sm:text-4xl lg:text-5xl font-bold mb-4">
              The Best Online Resume Builder
            </h1>
          </div>
          <p className="left para text-sm sm:text-base lg:text-xl mb-6 text-gray-900">
            Create professional resumes in minutes. Choose from modern
            templates, customize easily, and download instantly. Perfect for job
            seekers, students, and professionals!
          </p>
          <ul className="mb-8 text-sm sm:text-base lg:text-lg list-disc list-inside text-gray-700">
            <li>Free & easy to use</li>
            <li>Modern, customizable templates</li>
            <li>Download as PDF</li>
            <li>No signup required</li>
          </ul>
          <button className="intro-btn bg-black text-white px-6 py-3 rounded-full font-semibold text-base sm:text-lg lg:text-xl hover:bg-gray-800 transition">
            Get Started
          </button>
        </div>

        <div className="mt-8 hidden sm:block">
          <img
            src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&black&q=80"
            alt="Resume Example"
            className="intro-img rounded-lg shadow-lg w-[300px] sm:w-[350px] lg:w-[400px]"
          />
        </div>
      </div>

      <div 
      onMouseMove={handileOnMouseMove}
      className="page2 w-full min-h-[100vh]  flex-col items-center justify-center  bg-gray-900 overflow-hidden ">
        <div className=" h-full">
        <div className="absolute left-[50%] top-[50%] -translate-[50%] text-white ">
          <h1 className=" text-4xl  capitalize ">Design Without Limits</h1>
          <p className="text-lg text-gray-300">Choose from a wide range of professionally designed templates for every need. </p>
        </div>
          <div
          
          ref={plain1}
          className="plain1  absolute w-full h-screen overflow-hidden" >
            <div><img src={imgs[1]} alt="" className=" w-40 h-64 absolute left-3 top-[70%] object-cover" /></div>
          <div><img src={imgs[3]} alt="" className=" w-33 h-44 absolute top-3 left-[40%] mt-2.5 object-cover" /></div>
          </div>
          <div
          ref={plain2}
          className="plain1  absolute w-full h-screen overflow-hidden" >
            <div><img src={imgs[4]} alt="" className=" w-40 h-64 absolute left-50 top-[10%] object-cover" /></div>
            <div><img src={imgs[4]} alt="" className="w-45 h-44 absolute top-[70%] right-[20%] object-cover" /></div>
          </div>
          <div
          ref={plain3}
          className="plain1  sm:none  absolute w-full h-screen overflow-hidden" >
            <div><img src={imgs[2]} alt="" className=" w-44 h-44 absolute top-[30%] right-[10%] mt-2.5 object-cover" /></div>
            <div><img src={imgs[2]} alt="" className="w-43 h-55 absolute top-[10%] right-[30%] object-cover" /></div>
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div className="section3 h-screen bg-gradient-to-r from-gray-100  to-gray-100 text-black flex flex-col items-center justify-center px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          Why Choose Us?
        </h2>
        <p className="text-lg md:text-xl text-gray-900 max-w-2xl text-center mb-12">
          We provide powerful tools and beautiful templates to help you build
          your resume in minutes. Stand out with modern designs and professional
          layouts tailored for every industry.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          <div className="p-6 bg-gray-300 rounded-2xl shadow-md hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
            <p className="text-black">
              Build your resume with an intuitive editor, no design skills
              needed.
            </p>
          </div>
          <div className="p-6 bg-gray-300 rounded-2xl shadow-md hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold mb-2"> Customizable</h3>
            <p className="text-black">
              Choose from dozens of templates and personalize with your style.
            </p>
          </div>
          <div className="p-6 bg-gray-300 rounded-2xl shadow-md hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold mb-2">ATS-Friendly</h3>
            <p className="text-black">
              Ensure your resume passes applicant tracking systems with ease.
            </p>
          </div>
        </div>
        <motion.div
          className="flex items-center justify-center gap-12 px-4 py-1 mx-auto mt-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/login"
              className="text-black text-3xl sm:text-4xl lg:text-5xl capitalize px-4 py-2 rounded-2xl border hover:bg-black hover:text-white transition-colors duration-300"
            >
              login
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/register"
              className="text-black text-3xl sm:text-4xl lg:text-5xl capitalize px-4 py-2 rounded-2xl border hover:bg-black hover:text-white transition-colors duration-300"
            >
              signup
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <footer className="bg-black text-black py-6 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm mb-2">
            © {new Date().getFullYear()} Resume_Builder. All rights reserved.
          </p>
          <div className="flex justify-center gap-6 text-lg">
            <a href="/home" className="text-white">
              Home
            </a>
            <Link to="/login" className="text-white">
              login
            </Link>
            <Link to="#" className="text-white">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IntoPage;
