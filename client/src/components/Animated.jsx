
const Animated = () => {
  return (
    <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200 overflow-hidden">
  {/* Rotating Border Ring around Main Gradient Circle */}
  <div className="absolute w-72 h-72 rounded-full border-8 border-transparent border-t-gradient rotate-slow animate-rotate" />
  
  {/* Main Gradient Circle with Color Pulse */}
  <div className="w-60 h-60 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full animate-bounce pulse-shadow hover:scale-105 transition-transform duration-500 ease-out" />

  {/* Additional Floating Smaller Circles */}
  <div className="absolute w-20 h-20 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full animate-float top-10 left-20 opacity-75" />
  <div className="absolute w-16 h-16 bg-gradient-to-r from-indigo-400 to-teal-400 rounded-full animate-float bottom-16 right-16 opacity-75" />
  <div className="absolute w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-float top-1/2 right-1/3 opacity-75" />

  {/* Background Layered Gradients */}
  <div className="absolute inset-0 bg-gradient-to-tr from-purple-700 via-transparent to-blue-600 opacity-20 animate-slow-rotate" />
  <div className="absolute inset-0 bg-gradient-to-bl from-pink-500 via-transparent to-yellow-400 opacity-30 animate-slow-rotate-reverse" />

  {/* Starburst Effect */}
  <div className="absolute w-80 h-80 bg-white rounded-full opacity-5 animate-starburst" />

  {/* Blurred Overlay */}
  <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />

  {/* Floating Particles */}
  <div className="absolute inset-0 flex flex-wrap justify-around items-center">
    {[...Array(20)].map((_, i) => (
      <div key={i} className="w-2 h-2 bg-white rounded-full opacity-70 animate-pulse delay-150 duration-500" style={{ animationDelay: `${i * 0.2}s` }} />
    ))}
  </div>
</div>
  )
}

export default Animated