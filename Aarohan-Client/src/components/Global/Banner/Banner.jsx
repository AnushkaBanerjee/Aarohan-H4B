import React from 'react'
import banner from '../../../assets/Banner/banner.png'
import { Button } from "@nextui-org/react";


function Banner({ mentor = "Mentor", classroom = "XYZ" }) {
    return (
        <div className='w-full'>
            <div className="h-48  rounded-md bg-cover bg-no-repeat my-4 flex justify-center items-center"
                style={{ backgroundImage: `url(${banner})` }}>

                <div className=''>
                    <div className='text-center'>
                        <h1 className=" text-white-default text-4xl font-semibold mb-4">Hi, {mentor}</h1>
                    </div>
                    <div className='text-center'>
                        <h1 className="text-white-default text-xl mb-6">Explore {classroom}</h1>
                    </div>
                    <div className='flex justify-center items-center'>
                        <Button variant="bordered" className='text-white-default text-lg'>
                            Know More
                        </Button>
                    </div>
                </div>

            </div>
        </div>




    )
}

export default Banner;