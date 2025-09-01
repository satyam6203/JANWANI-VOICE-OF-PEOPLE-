import React, { useState } from 'react'
import { Ticket } from 'lucide-react'
import Navbar from '../Components/Navbar'

const Home = () => {
  const [ticketId, setTicketId] = useState('')

  return (
    <>
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-sm mx-auto bg-white min-h-screen">
        {/* Header Section */}
        <div className="px-4 py-6">
          {/* Profile and Greeting */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Hey, Welcome!</h1>
              <p className="text-sm text-gray-500">Have a nice day today</p>
            </div>
          </div>

          {/* Hero Image Card */}
          <div className="relative rounded-xl overflow-hidden mb-6 shadow-lg">
            <div 
              className="h-48 bg-cover bg-center relative"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('data:image/svg+xml,${encodeURIComponent(`
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200">
                    <defs>
                      <pattern id="trees" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <rect width="100" height="100" fill="#4a5568"/>
                        <circle cx="20" cy="80" r="15" fill="#2d3748"/>
                        <circle cx="50" cy="70" r="20" fill="#2d3748"/>
                        <circle cx="80" cy="75" r="18" fill="#2d3748"/>
                      </pattern>
                    </defs>
                    <rect width="400" height="200" fill="url(#trees)"/>
                    <rect x="0" y="150" width="400" height="50" fill="#2d3748"/>
                  </svg>
                `)}')`
              }}
            >
              {/* Overlay Content */}
              <div className="absolute inset-0 flex flex-col justify-center px-6">
                <h2 className="text-white text-xl font-bold mb-2">We Solved XYZ problem!</h2>
                <p className="text-white text-sm opacity-90 leading-relaxed">
                  Lorem ipsum dolor consectetur adipiscing elit, sed do eiusmod 
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud Lorem ipsum dolor.
                </p>
              </div>
            </div>
          </div>

          {/* Have an issue Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Have an issue?</h3>
            
            {/* Raise a ticket button */}
            <div className="space-y-3">
              <button className="w-full bg-[#FFF1E5] hover:bg-orange-200 rounded-xl p-4 flex items-center justify-between transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center">
                    <Ticket className="w-5 h-5 text-orange-600" />
                  </div>
                  <span className="font-medium text-gray-800">Raise a ticket</span>
                </div>
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Ticket ID Input */}
              <div className="w-full bg-[#FFF1E5] rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="enter ticket id"
                      value={ticketId}
                      onChange={(e) => setTicketId(e.target.value)}
                      className="w-full bg-transparent font-medium text-gray-600 placeholder-gray-500 focus:outline-none border-none pb-1"
                    />
                    <div className="w-full h-0.5 bg-orange-300 mt-1"></div>
                  </div>
                </div>
                <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Navbar/>
    </>
  )
}

export default Home