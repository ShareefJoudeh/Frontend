import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Wallet() {
  const [walletData, setWalletData] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentUserId = 2;

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/wallet/${currentUserId}`);
        const data = await response.json();
        setWalletData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching wallet:', error);
        setLoading(false);
      }
    };
    fetchWallet();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-indigo-600 font-bold">
        Loading secure wallet...
      </div>
    );
  }

  if (!walletData) {
    return (
      <div className="p-10 text-center text-slate-500">
        Unable to load wallet data. Please try again later.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Digital Bank Card */}
        <div className="relative bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-8 text-white shadow-xl mb-8 overflow-hidden">
          <h2 className="text-indigo-100 font-bold uppercase text-sm tracking-widest mb-2">Available Balance</h2>
          <div className="text-5xl font-bold">
            {walletData.credits} <span className="text-2xl text-indigo-200">CR</span>
          </div>
          
          {/* Decorative shapes */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute right-20 -top-20 w-40 h-40 bg-indigo-500/30 rounded-full blur-xl"></div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Recent Transactions</h3>
          
          {walletData.transactions.length === 0 ? (
            <div className="text-center py-10 text-slate-500">
              You haven't made any transactions yet. <Link to="/skillswap" className="text-indigo-600 font-bold hover:underline">Book a session to get started!</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {walletData.transactions.map((tx, index) => {
                const isEarned = tx.type === 'earned';
                return (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isEarned ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                        {isEarned ? (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        ) : (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg>
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{isEarned ? 'Taught: ' : 'Booked: '} {tx.description}</h4>
                        <p className="text-xs text-slate-500 font-medium">{formatDate(tx.date)}</p>
                      </div>
                    </div>
                    
                    <div className={`font-bold text-lg ${isEarned ? 'text-emerald-600' : 'text-slate-900'}`}>
                      {isEarned ? '+' : '-'}{tx.amount} CR
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Wallet;