"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Added Eye icons for password visibility toggle

export default function PasswordChecker() {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Function to check password strength with improved criteria
  const checkStrength = (password) => {
    const regexWeak = /[a-zA-Z]{1,5}/; // Weak password (letters only or <6 characters)
    const regexMedium = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{6,}$/; // Medium (letters + digits, min 6)
    const regexStrong = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Strong (letters + digits + special chars, min 8)

    if (regexStrong.test(password)) return "Strong";
    if (regexMedium.test(password)) return "Medium";
    if (regexWeak.test(password)) return "Weak";
    return "Very Weak";
  };

  const handleChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setStrength(checkStrength(newPassword));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="p-6 bg-[#373246] text-white rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Password Strength Checker</h2>

      <div className="relative mb-6">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          value={password}
          onChange={handleChange}
          className="w-full p-3 border border-gray-600 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-3 text-gray-400 hover:text-gray-200"
        >
          {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </button>
      </div>

      <div className="mb-4">
        <p className={`text-lg font-semibold text-center ${strength === "Weak" ? "text-red-500" : strength === "Medium" ? "text-yellow-500" : strength === "Strong" ? "text-green-500" : "text-gray-500"}`}>
          Strength: {strength}
        </p>
        <div className={`h-2 w-full rounded-full mt-2 ${strength === "Weak" ? "bg-red-500" : strength === "Medium" ? "bg-yellow-500" : strength === "Strong" ? "bg-green-500" : "bg-gray-300"}`}></div>
      </div>

      {/* Password strength description */}
      {strength && (
        <div className="text-center text-sm">
          {strength === "Weak" && (
            <p className="text-red-400">Password is too weak. Try using a combination of letters and numbers.</p>
          )}
          {strength === "Medium" && (
            <p className="text-yellow-400">Password is moderate. Consider adding special characters for extra security.</p>
          )}
          {strength === "Strong" && (
            <p className="text-green-400">Strong password! Great job! 🎉</p>
          )}
          {strength === "Very Weak" && (
            <p className="text-gray-400">Password is very weak. Consider using a mix of characters and a longer password.</p>
          )}
        </div>
      )}

      {/* Password tips section */}
      <div className="mt-4">
        <h3 className="font-semibold text-lg mb-2">Password Tips:</h3>
        <ul className="list-disc pl-5 text-sm text-gray-300">
          <li>Use at least 8 characters.</li>
          <li>Combine uppercase and lowercase letters.</li>
          <li>Include at least one number.</li>
          <li>Use special characters like @, $, %, etc.</li>
          <li>Avoid using common words or sequences.</li>
        </ul>
      </div>

      {/* Advanced strength feedback */}
      {strength === "Weak" && (
        <div className="mt-6 text-center text-sm text-red-500">
          <p>Password is weak. Consider using a longer password with a mix of characters.</p>
        </div>
      )}
      {strength === "Medium" && (
        <div className="mt-6 text-center text-sm text-yellow-500">
          <p>Moderate strength detected. You can improve it by adding numbers and special characters.</p>
        </div>
      )}
      {strength === "Strong" && (
        <div className="mt-6 text-center text-sm text-green-500">
          <p>Your password is strong! Consider enabling two-factor authentication for even better security.</p>
        </div>
      )}
    </div>
  );
}
