import { useSearchParams, useNavigate } from "react-router-dom";
import {lazy,Suspense } from 'react'
import ResumePage1 from "./ResumePage1";
import ResumePage2 from "./ResumePage2";
import ResumePage3 from "./ResumePage3";
import ResumePage4 from "./ResumePage4";
import ResumePage5 from "./ResumePage5";
import ResumePage6 from "./ResumePage6";
import ResumePage7 from "./ResumePage7";
const ResumePage = () => {
const LazyResumePage7 = lazy(() => import('./ResumePage7'))

    const [searchParams, setSearchParams] = useSearchParams();
    const step = searchParams.get("step") || "1"; 
    const resumeId = searchParams.get("resumeId") || null; 
const arr = [
  {step : "1" , page: <ResumePage1 />},
  {step : "2" , page: <ResumePage2 />},
  {step : "3" , page: <ResumePage3 />},
  {step : "4" , page: <ResumePage4 />},
  {step : "5" , page: <ResumePage5 />},
  {step : "6" , page: <ResumePage6 />},
  {step : "7" , page: <ResumePage7 />},
]

  return (
   <div>
      <h2>Create Resume (ID: {resumeId})</h2>

    {step === "1" && <ResumePage1 />}
    {step === "2" && <ResumePage2 />}
    {step === "3" && <ResumePage3 />}
    {step === "4" && <ResumePage4 />}
    {step === "5" && <ResumePage5 />}
    {step === "6" && <ResumePage6 />}
    {step === "7" &&(  <Suspense fallback={<div>Loading...</div>}>
      <LazyResumePage7 />
    </Suspense>)}

      <div style={{ marginTop: "20px" }} className="flex items-center gap-6">
       {arr.map((item,idx)=>{
        return(
        <button 
        key={idx}
        onClick={() => setSearchParams({ step: item.step, resumeId:resumeId })}>
          Step {item.step}
        </button>
        )
       })}
      </div>
    </div>
  )
}

export default ResumePage