import React from 'react';

function HeroBanner() {
  return (
    <div>
      <div
        className="relative bg-cover bg-center h-[500px] rounded-xl shadow-2xl overflow-hidden animate-fade-in"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1606813909417-2f6224bcefa2?auto=format&fit=crop&w=1470&q=80')",
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60 flex flex-col items-center justify-center text-white text-center px-4 md:px-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-bounce">
            🔥 Big Summer Sale!
          </h1>
          <p className="text-lg md:text-2xl mb-6 max-w-2xl animate-fade-in-up">
            Save up to{' '}
            <span className="text-yellow-400 font-bold text-2xl md:text-3xl">
              70%
            </span>{' '}
            on top products. Limited time only.
          </p>
          <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-xl animate-fade-in-up delay-150">
            Shop Now 🚀
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
