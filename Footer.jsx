import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-10 px-6 mt-auto">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
          S
        </div>
        <p className="font-bold text-slate-900 text-lg">SkillCircle</p>
        <p className="text-slate-500 text-sm">
          A collaborative learning platform © 2026
        </p>
      </div>
    </footer>
  );
};

export default Footer;