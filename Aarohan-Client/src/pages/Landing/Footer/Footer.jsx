import Logo from '../../../assets/Logo/LogoLogo.png'

export default function Footer() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-xl font-semibold leading-8 text-gray-900">
          Redefining Mentorship through the Fusion of  AI Tech and Human Connection
        </h2>
        <div className="mx-auto mt-10 flex justify-center"> {/* Added flex and justify-center for center alignment */}
          <img
            className="w-full object-contain lg:max-w-md" // Adjusted classes for sizing
            src={Logo}
            alt="Transistor"
            style={{ maxWidth: '250px' }} // Inline style for max width
          />
        </div>
      </div>
    </div>
  )
}
