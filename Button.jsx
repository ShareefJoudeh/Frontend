// src/components/Button.jsx
export default function Button({ children, type = "button", ...props }) {
  return (
    <button 
      type={type} 
      className="px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-colors"
      {...props}
    >
      {children}
    </button>
  );
}