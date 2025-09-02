import React, { useState, useRef } from 'react';
import { ArrowLeft, Camera, Image, Mic } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function RaiseTicket() {
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioURL, setAudioURL] = useState(null);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  // 📸 Handle camera / upload
  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  // 🎤 Start / Stop voice recording
  const handleMicClick = async () => {
    if (!recording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        const chunks = [];

        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) chunks.push(e.data);
        };

        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/webm' });
          setAudioURL(URL.createObjectURL(blob));
        };

        recorder.start();
        setMediaRecorder(recorder);
        setRecording(true);
      } catch (err) {
        console.error('Microphone access denied:', err);
        alert('Please allow microphone access.');
      }
    } else {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-8 border-b border-gray-100">
        <button className="w-8 h-8 flex items-center justify-center">
          <ArrowLeft onClick={goBack} className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-lg font-medium text-gray-800">Raise a ticket</h1>
        <div className="w-8 h-8"></div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col space-y-4">
        {/* 📸 Camera / Upload OR Preview */}
        {selectedImage ? (
          <div className="w-full h-40 rounded-2xl overflow-hidden">
            <img
              src={selectedImage}
              alt="Captured"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="flex space-x-3">
            <button
              onClick={() => fileInputRef.current.click()}
              className="flex-1 bg-orange-50 border border-orange-200 rounded-2xl p-6 flex flex-col items-center justify-center h-32"
            >
              <Camera className="w-8 h-8 text-orange-400 mb-3" />
              <span className="text-base text-orange-500 font-medium">
                Click a Photo
              </span>
            </button>

            <button
              onClick={() => fileInputRef.current.click()}
              className="flex-1 bg-orange-50 border border-orange-200 rounded-2xl p-6 flex flex-col items-center justify-center h-32"
            >
              <Image className="w-8 h-8 text-orange-400 mb-3" />
              <span className="text-base text-orange-500 font-medium">
                Upload Photo
              </span>
            </button>
          </div>
        )}

        {/* Hidden Input for Camera / Upload */}
        <input
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageSelect}
        />

        {/* 📝 Description Text Area with Mic inside */}
        <div className="relative">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please Describe Your Issue"
            className="w-full h-64 p-4 pr-12 bg-gray-50 rounded-2xl border-none resize-none text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-0"
          />
          <button
            onClick={handleMicClick}
            className={`absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              recording
                ? 'bg-red-400 hover:bg-red-500'
                : 'bg-orange-200 hover:bg-orange-300'
            }`}
          >
            <Mic className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* 🎧 Playback recorded audio */}
        {audioURL && (
          <audio controls className="mt-2 w-full">
            <source src={audioURL} type="audio/webm" />
            Your browser does not support the audio tag.
          </audio>
        )}
      </div>

      {/* Submit Button */}
      <div className="p-4">
        <Link to="/">
          <button className="w-full bg-[#FFA21F42] text-[#FFA21F] font-bold text-xl py-4 rounded-2xl">
            Submit
          </button>
        </Link>
      </div>
    </div>
  );
}