import Image from 'next/image'
import React from 'react'

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-[#C8CACC] bg-opacity-55	"
    style={{ position: 'fixed', top: 0, left: 0 ,bottom:0 ,right:0, zIndex: 9999 }}
    >
      <Image src="/loader.gif"
       width={208} height={193}
       unoptimized 
       alt="Loading..." />
  {/* <p>Loading.....</p> */}
    </div>
  )
}

export default Loader
