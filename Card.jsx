import React from 'react';

const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`bg-white p-6 rounded-3xl border border-slate-200 shadow-sm ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;