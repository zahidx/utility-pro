import { useState } from "react";
import { FaMinus, FaTimes, FaWindowRestore } from "react-icons/fa"; // Added restore icon

export default function Modal({ onClose, children }) {
  const [isMinimized, setIsMinimized] = useState(false); // State to handle minimize

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized); // Toggle minimize state
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 transition-all ease-in-out duration-300 backdrop-blur-lg bg-opacity-50">
      {/* Modal Content */}
      <div
        className={`bg-gradient-to-r from-[#6A4CFF] to-[#3B2A99] p-6 rounded-xl shadow-2xl transform transition-all duration-500 hover:scale-105 max-w-lg w-full relative ${isMinimized ? 'h-20 overflow-hidden' : 'h-auto'}`}
        style={{ left: '15%' }} // Adjust this to position the modal slightly to the right
      >
        {/* Header with Close and Minimize buttons */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-white text-xl font-semibold">Modal Header</div>

          <div className="flex space-x-4">
            {/* Toggle Minimize/Restore Button */}
            <button
              className="text-2xl text-white hover:text-gray-200 transition-colors duration-300 focus:outline-none"
              onClick={toggleMinimize} // Toggle minimize on click
            >
              {isMinimized ? <FaWindowRestore /> : <FaMinus />} {/* Conditionally render minimize or restore icon */}
            </button>

            {/* Close Button */}
            <button
              className="text-2xl text-white hover:text-gray-200 transition-colors duration-300 focus:outline-none"
              onClick={onClose} // Close the modal
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
    </div>
  );
}
