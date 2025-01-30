import { useState } from "react";
import { FaMinus, FaTimes, FaWindowRestore } from "react-icons/fa";

export default function Modal({ onClose, children }) {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 transition-all ease-in-out duration-300 backdrop-blur-lg bg-opacity-50">
      {/* Modal Container with Glow Effect */}
      <div
        className={`relative p-6 rounded-xl shadow-2xl transform transition-all duration-500 hover:scale-105 max-w-lg w-full
          ${isMinimized ? "h-20 overflow-hidden" : "h-auto"}
          bg-gradient-to-r from-[#4730b9] to-[#3B2A99] border-4 border-transparent animate-glow`}
        style={{
          left: "15%",
          animation: "glow 2s infinite alternate",
        }}
      >
        {/* Glowing Border - Fixed Clickability Issue */}
        <div
          className="absolute inset-0 rounded-xl border-[4px] border-transparent pointer-events-none"
        ></div>

        {/* Header with Close and Minimize buttons */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-white text-xl font-semibold">Modal Header</div>

          <div className="flex space-x-4">
            {/* Toggle Minimize/Restore Button */}
            <button
              className="text-2xl text-white hover:text-gray-200 transition-colors duration-300 focus:outline-none"
              onClick={toggleMinimize}
            >
              {isMinimized ? <FaWindowRestore /> : <FaMinus />}
            </button>

            {/* Close Button */}
            <button
              className="text-2xl text-white hover:text-gray-200 transition-colors duration-300 focus:outline-none"
              onClick={onClose}
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        {!isMinimized && (
          <div className="text-white text-lg sm:text-xl leading-relaxed font-medium opacity-90">
            {children}
          </div>
        )}
      </div>

      {/* Keyframe Animation for Glowing Border */}
      <style jsx>{`
        @keyframes glow {
          0% {
            box-shadow: 0 0 10px rgba(255, 0, 255, 0.5);
            border-color: rgba(255, 0, 255, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.8);
            border-color: rgba(0, 255, 255, 0.8);
          }
          100% {
            box-shadow: 0 0 15px rgba(0, 255, 0, 0.8);
            border-color: rgba(0, 255, 0, 0.8);
          }
        }
      `}</style>
    </div>
  );
}
