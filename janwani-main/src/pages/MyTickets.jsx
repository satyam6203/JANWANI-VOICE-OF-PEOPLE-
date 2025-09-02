import React, { useState } from 'react';
import { Ticket } from 'lucide-react'
import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom';


export default function MyTickets() {
  const [activeTab, setActiveTab] = useState('All');

  const tickets = [
    {
      id: 1,
      title: 'Title for Issue...',
      date: 'Mar 20, 2024',
      status: 'Pending',
      bgColor: 'bg-orange-200',
      textColor: 'text-orange-600',
      badgeColor: 'bg-orange-100 text-orange-600'
    },
    {
      id: 2,
      title: 'Title for Issue...',
      date: 'Mar 18, 2024',
      status: 'Submitted',
      bgColor: 'bg-blue-200',
      textColor: 'text-blue-600',
      badgeColor: 'bg-blue-100 text-blue-600'
    },
    {
      id: 3,
      title: 'Title for Issue...',
      date: 'Mar 15, 2024',
      status: 'Completed',
      bgColor: 'bg-green-200',
      textColor: 'text-green-600',
      badgeColor: 'bg-green-100 text-green-600'
    },
    {
      id: 4,
      title: 'Another Issue...',
      date: 'Mar 12, 2024',
      status: 'Pending',
      bgColor: 'bg-orange-200',
      textColor: 'text-orange-600',
      badgeColor: 'bg-orange-100 text-orange-600'
    },
    {
      id: 5,
      title: 'System Bug Report',
      date: 'Mar 10, 2024',
      status: 'Completed',
      bgColor: 'bg-green-200',
      textColor: 'text-green-600',
      badgeColor: 'bg-green-100 text-green-600'
    }
  ];

  const filteredTickets = activeTab === 'All'
    ? tickets
    : tickets.filter(ticket => ticket.status === activeTab);

  const tabs = ['All', 'Submitted', 'Pending', 'Completed'];

  return (
    <div className="max-w-sm mx-auto bg-white min-h-screen">
      {/* Header Card */}
      <div className=" rounded-3xl p-4 mb-3">
        <div className="flex items-center mb-6">
          <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
          <div className='flex flex-col'>
            <span className="text-lg font-medium text-gray-800">Hey, Welcome!</span>
            <span className='text-[14px] text-[#B2B2B2]'>Check Your Tickets</span>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex justify-center">
          <div className="flex space-x-1 bg-white rounded-full p-1 relative overflow-hidden w-full max-w-md">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 rounded-full text-sm font-medium transition-all duration-300 relative z-10 ${activeTab === tab
                    ? 'bg-orange-200 text-orange-800'
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tickets Section */}
      <div className="px-4 pb-20 ">
        <div className="flex items-center justify-between mb-4 ">
          <h2 className="text-2xl flex justify-center items-center gap-2 font-bold text-gray-800"><div className='text-[#FFA931]'><Ticket /></div><div>Your Tickets</div></h2>
        </div>

        {/* Ticket Items with Animation */}
        <div className="space-y-3">
          {filteredTickets.map((ticket, index) => (
            <div
              key={ticket.id}
              className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between transform transition-all duration-500 ease-in-out"
              style={{
                animation: `slideIn 0.3s ease-out ${index * 0.1}s both`
              }}
            >
              <div className="flex items-center">
                <div className={`w-10 h-10 ${ticket.bgColor} rounded-full flex items-center justify-center mr-3`}>
                  <span className={`${ticket.textColor} text-lg`}><Ticket/></span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">{ticket.title}</p>
                  <p className="text-sm text-gray-500">{ticket.date}</p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <span className={`${ticket.badgeColor} px-3 py-1 rounded-full text-sm font-medium`}>
                  {ticket.status}
                </span>
                <Link to="/myTickets/submittedtickets">
                  <button className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors duration-200">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          ))}

          {filteredTickets.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No tickets found for "{activeTab}"</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
      <Navbar />
    </div>
  );
}