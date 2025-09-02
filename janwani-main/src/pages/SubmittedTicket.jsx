import React from 'react';
import { ArrowLeft, Calendar, ClockFading,Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SubmittedTicket() {

    const navigate = useNavigate();

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/tickets"); // fallback route if no history
    }
  }

  return (
    <div className="max-w-sm mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-8">

        <button onClick={goBack} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-gray-600" />
        </button>
        <span className="text-sm text-gray-500">Ticket ID - #T404534232</span>
        <div className="w-8 h-8"></div> {/* Spacer */}
      </div>

      {/* Main Content */}
      <div className="px-4">
        {/* Gray Image Placeholder */}
        <div className="w-full h-48 bg-gray-300 rounded-2xl mb-6"></div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Title of the issue</h1>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut 
          viverra ipsum suspendisse vitae bibendum. Leo 
          venenatis vestibulum nibh dui lacus eros consequat 
          congue rutssa. Maecenas molestieae consequat arcu. 
          Posuere purus. Scelerisque leo quam porttitor 
          ornit sit platea id mauris. Mauris faucibus nulls 
          vitam amet mauris.
        </p>

        {/* Bottom Action Buttons */}
        <div className="flex justify-center space-x-8 pb-8">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-2">
              <Calendar className="w-6 h-6 text-orange-500" />
            </div>
            <span className="text-xs text-gray-500">2/10/2025</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-2">
              <ClockFading className="w-6 h-6 text-orange-500" />
            </div>
            <span className="text-xs text-gray-500">Pending</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-2">
              <Building2 className="w-6 h-6 text-orange-500" />
            </div>
            <span className="text-xs text-gray-500">Electrical</span>
          </div>
        </div>
      </div>
    </div>
  );
}