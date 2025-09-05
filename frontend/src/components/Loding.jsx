import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Loading = ({ message = "Loading...", size = "medium" }) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div
        className={`${sizeClasses[size]}  -4  -gray-200  -t-black rounded-full animate-spin`}
        role="status"
        aria-label="Loading"
      ></div>

      <p className="mt-2 text-gray-1300 te1xt-sm font-medium">{message}</p>
    </div>
  );
};

export const DotsLoading = ({ message = "Loading" }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 backdrop-blur-3xl  ">
      <div className="flex space-x-1 ">
        <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
        <div
          className="w-2 h-2 bg-black rounded-full animate-bounce"
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          className="w-2 h-2 bg-black rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
      </div>
      <p className="mt-2 text-gray-1300 te1xt-sm font-medium">{message}...</p>
    </div>
  );
};

export const FullPageLoading = ({ message = "Please wait..." }) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <Loading message={message} size="large" />
      </div>
    </div>
  );
};


export const LoadingPage = () => {
  const colorRef = useRef();
  const logingcontaierRef = useRef();
  const tl = gsap.timeline();
  useGSAP(() => {
    const timeline = gsap.timeline();
    timeline
      .from(logingcontaierRef.current, {
        y: 90,
        opacity: 0,
      })
      .from(colorRef.current, {
        x: -200,
      })
      .to(colorRef.current, { x: 230, stagger: 0.2 })
      .to(colorRef.current, { x: -50, stagger: 0.2 })
      .to(colorRef.current, { x: 190, stagger: 0.2 })
      .to(".black-screen", {
        y: "-100%",
      })
      .from(".img0 ", {
        opacity: 0,
        y: -60,
        x: 0,
        ease: "power2.out",
      })
      .from(
        ".img1 ",
        {
          opacity: 0,
          y: -60,
          x: -15,
          ease: "power2.out",
        },
        "-=0.2"
      )
      .from(
        ".img2",
        {
          opacity: 0,
          y: -50,
          x: 15,
          ease: "power2.out",
        },
        "-=0.2"
      )
      .from(
        ".img3",
        {
          opacity: 0,
          y: -50,
          x: 0,
          ease: "power2.out",
        },
        "-=0.2"
      )
      .from(".title ", { y: 160 })
      .from(".title-text", { y: 100 })
      .to(".img3", { y: 1000, x: -500, opacity: 0 }, "exitStart")
      .to(".img2", { y: 1000, x: -500, opacity: 0 }, "exitStart+=0.2")
      .to(".img1", { y: 900, x: 500 }, "exitStart+=0.4")
      .to(".img0", { y: 900, x: 500 }, "exitStart+=0.6")
      .to(".title, .title-text", { y: -300 });
    return () => timeline.kill();
  }, []);

  const [imgArr, setimgArr] = useState([
    "https://s3.eu-west-2.amazonaws.com/resumedone-eu-west-2-staging/M6yGdv3A0N-photo.png",
    "https://images.template.net/447167/Aesthetic-CV-Photo-Resume-Template-edit-online.png",
    "https://marketplace.canva.com/EAGGoggpWgU/1/0/1131w/canva-white-and-black-simple-resume-HfPnafAdeoI.jpg",
  ]);

  return (
    <>
      <main className="h-screen  bg-[#ddc8a5] relative">
        <div className="overflow-hidden h-screen w-[80vw] mx-auto flex items-center justify-center">
          <div
            ref={logingcontaierRef}
            className="  p-4 overflow-hidden flex items-center justify-center flex-col gap-3 "
          >
            <div className=" ">
              <h1 className="loading-font text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-widest font-semibold text-red-900">
                LOADING
              </h1>
            </div>
            <div className="loading w-70   h-2 overflow-hidden">
              <div ref={colorRef} className="color bg-red-900 h-full w-1/3" />
            </div>
          </div>
        </div>

        <div className="black-screen h-screen bg-black flex items-center justify-center overflow-hidden">
          <div className="flex relative  ">
            <div className="img0 h-130 w-90 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rotate-0  rounded-2xl overflow-hidden ">
              <img
                src="https://s3.resume.io/cdn-cgi/image/width=380,format=auto/uploads/local_template_image/image/3235/persistent-resource/boston-resume-templates.jpg?v=1656071149"
                alt=""
                className="object-cover object-right w-full h-full"
              />
            </div>
            <div className="img1 h-130 w-90 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] -rotate-10 rounded-2xl overflow-hidden ">
              <img
                src={imgArr[0]}
                alt=""
                className="object-cover object-right w-full h-full"
              />
            </div>
            <div className="img2 h-130 w-90 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] -rotate-5 rounded-2xl overflow-hidden ">
              <img
                src={imgArr[1]}
                alt=""
                className="object-cover object-right w-full h-full"
              />
            </div>
            <div className="img3 h-130 w-90  absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rotate-0 rounded-2xl overflow-hidden ">
              <img
                src={imgArr[2]}
                alt=""
                className="object-cover object-right w-full h-full"
              />
            </div>
            <div className="z-10 overflow-hidden ">
              <h1 className="loading-font title text-[6rem] text-red-900 font-script font-bold tracking-wider">
                Resume_Builder
              </h1>
              <p className="title-text loading-font font-semibold text-red-900 text-right text-2xl font-script italic">
                you can build your resume without a sweat
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Loading;
