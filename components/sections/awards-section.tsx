export default function AwardsSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-black to-red-900/20 animate-on-scroll">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-8">Awards & Recognition</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="bg-black/60 backdrop-blur-sm rounded-lg p-6 border border-red-500/30">
            <div className="text-yellow-400 text-2xl mb-2">★★★★★</div>
            <h3 className="text-white font-bold">Phoenix New Times</h3>
            <p className="text-red-400">Best Of Winner - 5 Years Running</p>
          </div>
          <div className="bg-black/60 backdrop-blur-sm rounded-lg p-6 border border-red-500/30">
            <div className="text-red-400 text-3xl mb-2">15</div>
            <h3 className="text-white font-bold">Years</h3>
            <p className="text-red-400">Premier Entertainment Service</p>
          </div>
        </div>
      </div>
    </section>
  )
}
