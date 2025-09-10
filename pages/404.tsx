import type { NextPage } from 'next'
import Head from 'next/head'

const Custom404: NextPage = () => {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | Skin Cabaret</title>
        <meta name="description" content="The page you're looking for could not be found." />
        <meta name="robots" content="noindex" />
      </Head>
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
          <h2 className="text-2xl mb-4">Page Not Found</h2>
          <p className="text-gray-400 mb-8">The page you're looking for doesn't exist.</p>
          <a 
            href="/" 
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Return Home
          </a>
        </div>
      </div>
    </>
  )
}

export default Custom404
