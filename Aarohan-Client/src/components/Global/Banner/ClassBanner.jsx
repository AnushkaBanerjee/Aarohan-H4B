import React from 'react'
import banner from '../../../assets/Banner/banner.png'
import { Button } from "@nextui-org/react";


function ClassBanner({ classData }) {
    return (
        <div className='w-full'>
            <div className="h-48  rounded-md bg-cover bg-no-repeat my-4 flex justify-start items-center "
                style={{ backgroundImage: `url(${banner})` }}>
                <div className=' w-1/3 h-48 rounded-md bg-cover bg-no-repeat justify-center items-center ' style={{ backgroundImage: `url(${classData?.thumbnail})` }}>

                </div>
                <div className='w-2/3'>
                    <div className='text-center'>
                        <h1 className=" text-white-default text-4xl font-semibold mb-4">{`${classData?.title} Classroom`}</h1>
                    </div>
                    <div className='text-center'>
                        <h1 className="text-white-default text-xl mb-6">{classData?.description}</h1>
                    </div>
                    
                </div>

            </div>
        </div>




    )
}

export default ClassBanner;