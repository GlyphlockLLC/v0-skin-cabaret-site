import { ChevronDown } from "lucide-react"

export default function FaqSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-red-900/10 to-black">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-black text-center mb-16 text-white drop-shadow-[0_0_10px_rgba(239,68,68,0.5)] animate-on-scroll">
          FREQUENTLY ASKED QUESTIONS
        </h2>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 rounded-lg overflow-hidden animate-on-scroll animate-delay-100">
            <details className="group">
              <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-red-900/20 transition-colors">
                <h3 className="text-xl font-bold text-white">What is the dress code?</h3>
                <ChevronDown className="w-5 h-5 text-white group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6">
                <p className="text-white/90 leading-relaxed">
                  We maintain an upscale dress code. Men: collared shirts, dress pants, and dress shoes required. No
                  athletic wear, shorts, sandals, or hats. Women: upscale casual to formal attire. Management reserves
                  the right to refuse entry for inappropriate attire.
                </p>
              </div>
            </details>
          </div>

          <div className="bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 rounded-lg overflow-hidden animate-on-scroll animate-delay-200">
            <details className="group">
              <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-red-900/20 transition-colors">
                <h3 className="text-xl font-bold text-white">Do I need reservations?</h3>
                <ChevronDown className="w-5 h-5 text-white group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6">
                <p className="text-white/90 leading-relaxed">
                  Reservations are not required but highly recommended, especially for VIP seating, bachelor parties,
                  and weekend visits. Call (480) 425-7546 to secure your preferred seating and avoid wait times.
                </p>
              </div>
            </details>
          </div>

          <div className="bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 rounded-lg overflow-hidden animate-on-scroll animate-delay-300">
            <details className="group">
              <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-red-900/20 transition-colors">
                <h3 className="text-xl font-bold text-white">What payment methods do you accept?</h3>
                <ChevronDown className="w-5 h-5 text-white group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6">
                <p className="text-white/90 leading-relaxed">
                  We accept cash, all major credit cards (Visa, MasterCard, American Express, Discover), and debit
                  cards. ATM is available on-site for your convenience.
                </p>
              </div>
            </details>
          </div>

          <div className="bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 rounded-lg overflow-hidden animate-on-scroll animate-delay-400">
            <details className="group">
              <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-red-900/20 transition-colors">
                <h3 className="text-xl font-bold text-white">Are cameras and phones allowed?</h3>
                <ChevronDown className="w-5 h-5 text-white group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6">
                <p className="text-white/90 leading-relaxed">
                  No photography, video recording, or phone use is permitted inside the club. This policy protects the
                  privacy of our performers and guests. Phones must be stored away during your visit.
                </p>
              </div>
            </details>
          </div>

          <div className="bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 rounded-lg overflow-hidden animate-on-scroll animate-delay-500">
            <details className="group">
              <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-red-900/20 transition-colors">
                <h3 className="text-xl font-bold text-white">What VIP services are available?</h3>
                <ChevronDown className="w-5 h-5 text-white group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6">
                <p className="text-white/90 leading-relaxed">
                  Our VIP packages include private seating areas, bottle service, dedicated waitstaff, and exclusive
                  access to our most talented performers. Bachelor party packages feature custom DJ entertainment and
                  group activities.
                </p>
              </div>
            </details>
          </div>

          <div className="bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 rounded-lg overflow-hidden animate-on-scroll animate-delay-600">
            <details className="group">
              <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-red-900/20 transition-colors">
                <h3 className="text-xl font-bold text-white">Is there parking available?</h3>
                <ChevronDown className="w-5 h-5 text-white group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6">
                <p className="text-white/90 leading-relaxed">
                  Yes, we offer complimentary parking for all guests. Our secure parking area is well-lit and
                  monitored for your safety and convenience.
                </p>
              </div>
            </details>
          </div>

          <div className="bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 rounded-lg overflow-hidden animate-on-scroll animate-delay-700">
            <details className="group">
              <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-red-900/20 transition-colors">
                <h3 className="text-xl font-bold text-white">What are your policies on conduct?</h3>
                <ChevronDown className="w-5 h-5 text-white group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6">
                <p className="text-white/90 leading-relaxed">
                  We maintain a zero-tolerance policy for inappropriate behavior, harassment, or disrespect toward
                  performers or staff. All interactions must be consensual and professional. Violation of our policies
                  results in immediate removal without refund.
                </p>
              </div>
            </details>
          </div>

          <div className="bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 rounded-lg overflow-hidden animate-on-scroll animate-delay-800">
            <details className="group">
              <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-red-900/20 transition-colors">
                <h3 className="text-xl font-bold text-white">Do you offer group packages?</h3>
                <ChevronDown className="w-5 h-5 text-white group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6">
                <p className="text-white/90 leading-relaxed">
                  Yes! We specialize in bachelor parties, corporate events, and group celebrations. Our packages
                  include reserved seating, bottle service, and customized entertainment. Contact us at (480) 425-7546
                  to discuss your group's needs.
                </p>
              </div>
            </details>
          </div>
        </div>
      </div>
    </section>
  )
}
