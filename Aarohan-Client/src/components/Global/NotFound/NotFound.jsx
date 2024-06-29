import React from 'react'
import banner from '../../../assets/Banner/banner.png'

export default function NotFound() {
  return (
    <>
     <div className='w-full'>
            <div className="h-48  rounded-md bg-cover bg-no-repeat my-4 flex justify-center items-center"
                style={{ backgroundImage: `url(${banner})` }}>

                <div className=''>
                    <div className='text-center'>
                        <h1 className=" text-white-default text-6xl font-semibold mb-4">404</h1>
                    </div>
                   
                </div>

            </div>
        </div>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-blue-default px-3.5 py-2.5 text-sm font-semibold text-white-default shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </a>
            <a href="#" className="text-sm font-semibold text-gray-900">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </>
  )
}
