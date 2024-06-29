import React from 'react'

function StatCard({value, title, icon}) {
  return (
    <div className="w-full p-2 lg:w-1/4 md:w-1/2">
          <div className="flex flex-col px-6 py-10 overflow-hidden bg-primary rounded-xl shadow-lg duration-300 hover:shadow-2xl group">
            <div className="flex flex-row justify-between items-center">
              <div className="px-4 py-4 bg-white-default rounded-xl bg-opacity-30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-50"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
              </div>
              
            </div>
            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold  mt-12 text-gray-50">
              {value}
            </h1>
            <div className="flex flex-row justify-between text-gray-200">
              <p>{title}</p>
              
            </div>
          </div>
        </div>
  )
}

export default StatCard