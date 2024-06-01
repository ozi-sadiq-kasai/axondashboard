
const GridBackground = ({ children }) => {
  return (
    <div className="min-h-[100vh] w-full relative">
      <div className="absolute inset-0 bg-[#FCFCFC] dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] z-0"></div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default GridBackground
