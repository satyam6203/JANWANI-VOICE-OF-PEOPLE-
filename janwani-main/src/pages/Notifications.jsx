import React from 'react';
import { Building2, ChevronLeft, ClockFading } from 'lucide-react';
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';

const Notifications = () => {

    const navigate = useNavigate();

    const goBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate("/"); // fallback route if no history
        }
    }
  return (
    <>
    <div className="max-w-sm mx-auto bg-white min-h-screen">
      

      {/* Header */}
      <div className="flex items-center px-4 py-4 border-b border-gray-100">
        <ChevronLeft onClick={goBack} className="w-6 h-6 text-gray-600" />
        <h1 className="text-lg font-semibold text-center flex-1 mr-6">Notifications</h1>
      </div>

      {/* Notifications List */}
      <div className="px-4 pb-14 flex flex-col gap-4">
        <div className="flex items-start py-4 rounded-xl bg-gray-50">
          <div className="p-2 rounded-lg bg-orange-50 mr-3 flex-shrink-0">
            <div className="w-6 h-6 text-orange-500"><ClockFading/></div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 mb-1">
              Thursday's Feast Awaits!
            </h3>
            <p className="text-sm text-gray-600 leading-tight mb-2">
              Your Exotic Veggie Fusion is on the menu. Get excited!
            </p>
            <span className="text-xs text-gray-400">3 days ago</span>
          </div>
        </div>

        <div className="flex items-start py-4 rounded-xl bg-gray-50">
          <div className="p-2 rounded-lg bg-orange-50 mr-3 flex-shrink-0">
            <div className="w-6 h-6 text-orange-500"><Building2/></div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 mb-1">
              Thursday's Feast Awaits!
            </h3>
            <p className="text-sm text-gray-600 leading-tight mb-2">
              Your Exotic Veggie Fusion is on the menu. Get excited!
            </p>
            <span className="text-xs text-gray-400">3 days ago</span>
          </div>
        </div>

        <div className="flex items-start py-4 rounded-xl bg-gray-50">
          <div className="p-2 rounded-lg bg-orange-50 mr-3 flex-shrink-0">
            <div className="w-6 h-6 text-orange-500"><Building2/></div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 mb-1">
              Thursday's Feast Awaits!
            </h3>
            <p className="text-sm text-gray-600 leading-tight mb-2">
              Your Exotic Veggie Fusion is on the menu. Get excited!
            </p>
            <span className="text-xs text-gray-400">3 days ago</span>
          </div>
        </div>

        <div className="flex items-start py-4 rounded-xl bg-gray-50">
          <div className="p-2 rounded-lg bg-orange-50 mr-3 flex-shrink-0">
            <div className="w-6 h-6 text-orange-500"><Building2/></div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 mb-1">
              Thursday's Feast Awaits!
            </h3>
            <p className="text-sm text-gray-600 leading-tight mb-2">
              Your Exotic Veggie Fusion is on the menu. Get excited!
            </p>
            <span className="text-xs text-gray-400">3 days ago</span>
          </div>
        </div>

        <div className="flex items-start py-4 rounded-xl bg-gray-50">
          <div className="p-2 rounded-lg bg-orange-50 mr-3 flex-shrink-0">
            <div className="w-6 h-6 text-orange-500"><Building2/></div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 mb-1">
              Thursday's Feast Awaits!
            </h3>
            <p className="text-sm text-gray-600 leading-tight mb-2">
              Your Exotic Veggie Fusion is on the menu. Get excited!
            </p>
            <span className="text-xs text-gray-400">3 days ago</span>
          </div>
        </div>

        <div className="flex items-start py-4 rounded-xl bg-gray-50">
          <div className="p-2 rounded-lg bg-orange-50 mr-3 flex-shrink-0">
            <div className="w-6 h-6 text-orange-500"><ClockFading/></div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 mb-1">
              Thursday's Feast Awaits!
            </h3>
            <p className="text-sm text-gray-600 leading-tight mb-2">
              Your Exotic Veggie Fusion is on the menu. Get excited!
            </p>
            <span className="text-xs text-gray-400">3 days ago</span>
          </div>
        </div>

        <div className="flex items-start py-4 rounded-xl bg-gray-50">
          <div className="p-2 rounded-lg bg-orange-50 mr-3 flex-shrink-0">
            <div className="w-6 h-6 text-orange-500"><Building2/></div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 mb-1">
              Thursday's Feast Awaits!
            </h3>
            <p className="text-sm text-gray-600 leading-tight mb-2">
              Your Exotic Veggie Fusion is on the menu. Get excited!
            </p>
            <span className="text-xs text-gray-400">3 days ago</span>
          </div>
        </div>

        <div className="flex items-start py-4 rounded-xl bg-gray-50">
          <div className="p-2 rounded-lg bg-orange-50 mr-3 flex-shrink-0">
            <div className="w-6 h-6 text-orange-500"><Building2/></div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 mb-1">
              Thursday's Feast Awaits!
            </h3>
            <p className="text-sm text-gray-600 leading-tight mb-2">
              Your Exotic Veggie Fusion is on the menu. Get excited!
            </p>
            <span className="text-xs text-gray-400">3 days ago</span>
          </div>
        </div>
        <div className="flex items-start py-4 rounded-xl bg-gray-50">
          <div className="p-2 rounded-lg bg-orange-50 mr-3 flex-shrink-0">
            <div className="w-6 h-6 text-orange-500"><Building2/></div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 mb-1">
              Thursday's Feast Awaits!
            </h3>
            <p className="text-sm text-gray-600 leading-tight mb-2">
              Your Exotic Veggie Fusion is on the menu. Get excited!
            </p>
            <span className="text-xs text-gray-400">3 days ago</span>
          </div>
        </div>
      </div>
    </div>
    <Navbar/>
    </>
  );
};

export default Notifications;