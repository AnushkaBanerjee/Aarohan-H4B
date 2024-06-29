import { Link } from "react-router-dom"
import Footer from "../Footer/Footer"

const links = [
    { name: 'Signup As Student to Explore Features For Students ' },
    { name: 'Signup As Mentors to Explore Features For Mentors' },
   
  ]
  const stats = [
    { name: 'Centralized platform for course and assignment management', value: 'Knowledge Exchange' },
    { name: 'AI-powered course recommendations and roadmap generation', value: 'AI Generated Road Maps' },
    { name: 'Efficient and effective communication between mentors and students', value: 'Seamless Communication' },
    { name: ' Real-time insights into student performance and course effectiveness', value: 'Real-Time Collaboration' },
  ]
  
  export default function Services() {
    return (
      <div className="relative isolate overflow-hidden  bg-blue-200 py-24 sm:py-32">
        
        <div
          className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-blue-default to-blue-teal opacity-20"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div
          className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
          aria-hidden="true"
        >
          <div
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-yellow-default to-yellow-dark opacity-20"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-blue-dark sm:text-6xl">Services we provide</h2>
            <p className="mt-6 text-lg leading-8 text-slate-800">
              
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
              {links.map((link) => (
                <Link 
                to="/signup"
                key={link.name} className="text-blue-default" >
                  {link.name} <span aria-hidden="true">&rarr;</span>
                </Link>
              ))}
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.name} className="flex flex-col-reverse">
                  <dt className="text-base leading-7 text-blue-dark">{stat.name}</dt>
                  <dd className="text-2xl font-bold leading-9 tracking-tight text-blue-dark">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
  