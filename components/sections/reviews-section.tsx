import Image from "next/image"

export default function ReviewsSection() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-card/30 to-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-black text-center mb-16 text-white drop-shadow-[0_0_10px_rgba(239,68,68,0.5)] animate-on-scroll">
          GUEST REVIEWS
        </h2>

        <div className="text-center mb-8 animate-on-scroll animate-delay-100">
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-white text-2xl">
                  ★
                </span>
              ))}
            </div>
            <span className="text-white text-xl font-bold">5.0 Stars</span>
          </div>
          <p className="text-white/80 text-lg">Phoenix New Times "Best Of" Winner • 15 Years of Excellence</p>
        </div>

        <div className="overflow-hidden relative">
          <div className="flex animate-scroll-reviews gap-8 mb-8">
            <div className="flex-shrink-0 bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 p-6 rounded-lg w-80">
              <div className="flex items-center mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
                  alt="Michael R."
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div>
                  <h4 className="text-white font-bold">Michael R. - Phoenix</h4>
                  <div className="flex text-white text-sm">★★★★★ • Google Review</div>
                </div>
              </div>
              <p className="text-white/90 text-sm">
                "Best bachelor party venue in Scottsdale! Professional staff, amazing atmosphere, and the
                entertainment was top-notch. Highly recommend for special occasions."
              </p>
            </div>

            <div className="flex-shrink-0 bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 p-6 rounded-lg w-80">
              <div className="flex items-center mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1494790108755-2616c6106db4?w=60&h=60&fit=crop&crop=face"
                  alt="Sarah T."
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div>
                  <h4 className="text-white font-bold">Sarah T. - Denver</h4>
                  <div className="flex text-white text-sm">★★★★★ • skincabaret.com</div>
                </div>
              </div>
              <p className="text-white/90 text-sm">
                "Brought my husband here for his birthday and we both had an amazing time! The performers were
                incredibly talented and the VIP service was exceptional."
              </p>
            </div>

            <div className="flex-shrink-0 bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 p-6 rounded-lg w-80">
              <div className="flex items-center mb-4">
                <Image
                  src="/images/skin-logo-red-silhouette.png"
                  alt="Anonymous"
                  width={50}
                  height={50}
                  className="rounded-full mr-4 bg-red-600 p-2"
                />
                <div>
                  <h4 className="text-white font-bold">Marcus J. - Los Angeles</h4>
                  <div className="flex text-white text-sm">★★★★★ • skincabaret.com</div>
                </div>
              </div>
              <p className="text-white/90 text-sm">
                "Flew in from LA for a business trip and this was the highlight! Sophisticated atmosphere, beautiful
                performers, and world-class service. Will definitely be back."
              </p>
            </div>

            <div className="flex-shrink-0 bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 p-6 rounded-lg w-80">
              <div className="flex items-center mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=60&h=60&fit=crop&crop=face"
                  alt="James K."
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div>
                  <h4 className="text-white font-bold">James K. - Chicago</h4>
                  <div className="flex text-white text-sm">★★★★★ • Yelp Review</div>
                </div>
              </div>
              <p className="text-white/90 text-sm">
                "Classy establishment with beautiful performers. Great for business entertainment or special
                celebrations. The VIP packages are definitely worth it."
              </p>
            </div>

            <div className="flex-shrink-0 bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 p-6 rounded-lg w-80">
              <div className="flex items-center mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=60&h=60&fit=crop&crop=face"
                  alt="Robert M."
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div>
                  <h4 className="text-white font-bold">Robert M. - Atlanta</h4>
                  <div className="flex text-white text-sm">★★★★★ • Google Review</div>
                </div>
              </div>
              <p className="text-white/90 text-sm">
                "Outstanding venue! Professional atmosphere, talented entertainers, and excellent service. Perfect for
                bachelor parties and corporate events."
              </p>
            </div>

            <div className="flex-shrink-0 bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 p-6 rounded-lg w-80">
              <div className="flex items-center mb-4">
                <Image
                  src="/images/skin-logo-red-silhouette.png"
                  alt="Anonymous"
                  width={50}
                  height={50}
                  className="rounded-full mr-4 bg-red-600 p-2"
                />
                <div>
                  <h4 className="text-white font-bold">Antonio R. - Miami</h4>
                  <div className="flex text-white text-sm">★★★★★ • skincabaret.com</div>
                </div>
              </div>
              <p className="text-white/90 text-sm">
                "Been to clubs all over Miami and this place sets the standard! The heritage and class they bring to
                adult entertainment is unmatched. Truly bringing that old skin back!"
              </p>
            </div>

            <div className="flex-shrink-0 bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 p-6 rounded-lg w-80">
              <div className="flex items-center mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=60&h=60&fit=crop&crop=face"
                  alt="Carlos M."
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div>
                  <h4 className="text-white font-bold">Carlos M. - Las Vegas</h4>
                  <div className="flex text-white text-sm">★★★★★ • Yelp Review</div>
                </div>
              </div>
              <p className="text-white/90 text-sm">
                "Traveled from Vegas for a friend's bachelor party. This place exceeded all expectations! The VIP
                experience was incredible and the performers were absolutely stunning."
              </p>
            </div>

            <div className="flex-shrink-0 bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 p-6 rounded-lg w-80">
              <div className="flex items-center mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
                  alt="David L."
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div>
                  <h4 className="text-white font-bold">David L. - San Diego</h4>
                  <div className="flex text-white text-sm">★★★★★ • Google Review</div>
                </div>
              </div>
              <p className="text-white/90 text-sm">
                "VIP treatment from start to finish. Clean facility, professional dancers, and excellent customer
                service. Worth every penny for a special night out."
              </p>
            </div>

            {/* Duplicate set for seamless scrolling */}
            <div className="flex-shrink-0 bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 p-6 rounded-lg w-80">
              <div className="flex items-center mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
                  alt="Michael R."
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div>
                  <h4 className="text-white font-bold">Michael R. - Phoenix</h4>
                  <div className="flex text-white text-sm">★★★★★ • Google Review</div>
                </div>
              </div>
              <p className="text-white/90 text-sm">
                "Best bachelor party venue in Scottsdale! Professional staff, amazing atmosphere, and the
                entertainment was top-notch. Highly recommend for special occasions."
              </p>
            </div>

            <div className="flex-shrink-0 bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 p-6 rounded-lg w-80">
              <div className="flex items-center mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1494790108755-2616c6106db4?w=60&h=60&fit=crop&crop=face"
                  alt="Sarah T."
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div>
                  <h4 className="text-white font-bold">Sarah T. - Denver</h4>
                  <div className="flex text-white text-sm">★★★★★ • skincabaret.com</div>
                </div>
              </div>
              <p className="text-white/90 text-sm">
                "Brought my husband here for his birthday and we both had an amazing time! The performers were
                incredibly talented and the VIP service was exceptional."
              </p>
            </div>
          </div>
        </div>

        {/* Add Review Form */}
        <div className="mt-12 bg-gradient-to-br from-red-900/20 to-black border border-red-500/40 p-8 rounded-lg max-w-2xl mx-auto animate-on-scroll animate-delay-300">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Share Your Experience</h3>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="bg-black/50 border border-red-500/40 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:border-red-400 focus:outline-none"
              />
              <select className="bg-black/50 border border-red-500/40 rounded-lg px-4 py-3 text-white focus:border-red-400 focus:outline-none">
                <option value="">Rating</option>
                <option value="5">★★★★★ (5 stars)</option>
                <option value="4">★★★★☆ (4 stars)</option>
                <option value="3">★★★☆☆ (3 stars)</option>
              </select>
            </div>
            <textarea
              placeholder="Tell us about your experience..."
              rows={4}
              className="w-full bg-black/50 border border-red-500/40 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:border-red-400 focus:outline-none"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 rounded-lg transition-all duration-300"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
