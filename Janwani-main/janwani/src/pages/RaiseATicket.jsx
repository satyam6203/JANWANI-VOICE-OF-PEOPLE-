import React, { useState } from 'react';
import { ArrowLeft, Camera, Image, Mic } from 'lucide-react';

export default function RaiseTicket() {
  const [description, setDescription] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  return (
    <div className="max-w-sm mx-auto bg-white h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-8 border-b border-gray-100">
        <button className="w-8 h-8 flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-lg font-medium text-gray-800">Raise a ticket</h1>
        <div className="w-8 h-8"></div> {/* Spacer */}
      </div>

      {/* Content */}
<div className="flex-1 p-4 flex flex-col space-y-4">
        {/* Photo Upload Buttons - Expanded */}
        <div className="flex space-x-3">
          <button className="flex-1 bg-orange-50 border border-orange-200 rounded-2xl p-6 flex flex-col items-center justify-center h-32">
            <Camera className="w-8 h-8 text-orange-400 mb-3" />
            <span className="text-base text-orange-500 font-medium">Click a Photo</span>
          </button>
          
          <button className="flex-1 bg-orange-50 border border-orange-200 rounded-2xl p-6 flex flex-col items-center justify-center h-32">
            <Image className="w-8 h-8 text-orange-400 mb-3" />
            <span className="text-base text-orange-500 font-medium">Upload Photo</span>
          </button>
        </div>

        {/* Description Text Area - Expanded */}
        <div className="flex-1 relative">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please Describe Your Issue"
            className="w-full h-64 p-4 pr-12 bg-gray-50 rounded-2xl border-none resize-none text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-0"
          />
          <button className="absolute bottom-6 right-6 w-6 h-6 bg-orange-200 rounded-full flex items-center justify-center hover:bg-orange-300 transition-colors">
            <Mic className="w-3 h-3 text-orange-600" />
          </button>
        </div>
      </div>

      {/* Submit Button - At bottom */}
      <div className="p-4">
        <button className="w-full bg-[#FFA21F42] text-[#FFA21F] font-bold text-xl py-4 rounded-2xl">
          Submit
        </button>
      </div>
    </div>
  );
}