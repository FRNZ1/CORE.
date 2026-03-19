import React, { useState, useEffect } from 'react';
import {
  Mountain,
  Wind,
  Compass,
  Bike,
  Shirt,
  Search,
  ShoppingBag,
  ArrowRight,
  Cpu,
  Fingerprint,
  Atom
} from 'lucide-react';

const App = () => {
  const [page, setPage] = useState('home');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Resize handler for navigation positioning
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const products = {
    bikes: [
      { id: 1, name: "Vertex Ti-Carbon", type: "XC", desc: "Grade 5 Titan trifft auf High-Modulus Carbon. Keine Kompromisse.", price: "11.200 €", label: "Custom Build" },
      { id: 2, name: "Aero Core One", type: "Road", desc: "Vollintegriertes System für maximale Effizienz bei hohem Puls.", price: "9.800 €", label: "Limited Edition" }
    ],
    clothes: [
      { id: 3, name: "Summit Shell V3", type: "Shell", desc: "Revolutionäre Atmungsaktivität. RET < 2.5. Entwickelt für Extreme.", price: "720 €", label: "Pro Tech" },
      { id: 4, name: "Thermal Core Mid", type: "Layer", desc: "Graphen-basierte Wärmeregulierung bei minimalem Gewicht.", price: "240 €", label: "New Gen" }
    ],
    gear: [
      { id: 5, name: "Horizon GPS", type: "Nav", desc: "Kein Schnickschnack. Nur du und dein Weg. 100h Akkulaufzeit.", price: "450 €", label: "Off-Grid" },
      { id: 6, name: "Titanium Toolset", type: "Tools", desc: "12 unverzichtbare Werkzeuge aus ultra-leichtem Titan.", price: "120 €", label: "Survival" }
    ]
  };

  const navigate = (target) => {
    setPage(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Animation Classes ---
  const pageTransition = "animate-[slideUp_0.8s_cubic-bezier(0.16,1,0.3,1)]";

  return (
    <div className="min-h-screen bg-[#0f1115] text-white font-['Plus_Jakarta_Sans',sans-serif] selection:bg-blue-500/30 overflow-x-hidden">
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(100px, 50px) scale(1.1); }
        }
        .text-gradient {
          background: linear-gradient(135deg, #fff 0%, #94a3b8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .glass {
          background: rgba(255, 255, 255, 0.07);
          backdrop-filter: blur(25px) saturate(180%);
          -webkit-backdrop-filter: blur(25px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .glass-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-12px) scale(1.01);
          box-shadow: 0 30px 60px rgba(0,0,0,0.5);
        }

        /* Dynamischer Hintergrund exakt wie im HTML */
        .background-visuals {
            position: fixed;
            inset: 0;
            z-index: -1;
            background: radial-gradient(circle at 50% 50%, #1a1d24 0%, #0f1115 100%);
        }

        .liquid-blob {
            position: absolute;
            width: 60vw;
            height: 60vw;
            border-radius: 50%;
            filter: blur(80px);
            opacity: 0.25;
            pointer-events: none;
            animation: float 20s infinite alternate ease-in-out;
        }
        .blob-blue { top: -10%; left: -10%; background: #60a5fa; }
        .blob-purple { bottom: -10%; right: -10%; background: #a78bfa; animation-delay: -7s; }
      `}</style>

      {/* Background Visuals */}
      <div className="background-visuals">
        <div className="liquid-blob blob-blue"></div>
        <div className="liquid-blob blob-purple"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed left-0 right-0 z-50 flex justify-center px-6 transition-all duration-500 ${isMobile ? 'bottom-[30px]' : 'top-8'}`}>
        <div className="glass flex items-center px-8 py-3 rounded-full space-x-10">
          <div
            className="text-xl font-black tracking-tighter cursor-pointer select-none"
            onClick={() => navigate('home')}
          >
            CORE.
          </div>

          <div className="flex items-center space-x-8 text-[11px] font-bold uppercase tracking-widest">
            {[
              { id: 'bikes', label: 'Bikes', icon: Bike },
              { id: 'clothes', label: 'Clothes', icon: Shirt },
              { id: 'gear', label: 'Gear', icon: Compass }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`transition-all duration-300 hover:opacity-100 ${page === item.id ? 'text-blue-400 opacity-100' : 'opacity-50'}`}
              >
                <item.icon size={20} className={isMobile ? 'block' : 'hidden'} />
                <span className={isMobile ? 'hidden' : 'block'}>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-5">
            <Search size={16} className="opacity-40 hover:opacity-100 cursor-pointer transition" />
            <ShoppingBag size={16} className="opacity-40 hover:opacity-100 cursor-pointer transition" />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pt-32 md:pt-48 pb-40">
        <div className={pageTransition} key={page}>

          {page === 'home' && (
            <>
              <div className="text-center mb-32">
                <span className="text-xs font-black uppercase tracking-[0.5em] text-blue-400 mb-6 block">Beyond Branding</span>
                <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter mb-8 text-gradient leading-tight">
                  Dein Sport.<br /><span className="italic opacity-30">Dein Element.</span>
                </h1>
                <p className="max-w-2xl mx-auto text-slate-400 font-light text-lg md:text-xl leading-relaxed mb-12">
                  Wir kuratieren Equipment für jene, die den Wald nicht vor lauter Marketing-Logos sehen wollen. Funktion über alles.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                  <button onClick={() => navigate('bikes')} className="glass px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300">
                    Bikes ansehen
                  </button>
                  <button onClick={() => navigate('clothes')} className="bg-white text-black px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-slate-200 transition-colors duration-300">
                    Tech Apparel
                  </button>
                </div>
              </div>

              {/* Inspirational Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { id: 'bikes', title: 'Entdeckung', icon: Mountain, text: 'Finde Wege, die noch niemand vor dir gefahren ist. Mit Hardware, die hält.' },
                  { id: 'clothes', title: 'Resistenz', icon: Wind, text: 'Wetter ist kein Hindernis, sondern eine Bedingung. Kleidung als Schutzschild.' },
                  { id: 'gear', title: 'Autarkie', icon: Compass, text: 'Alles dabei, was du brauchst. Reduziert auf das absolute Minimum.' }
                ].map((card) => (
                  <div
                    key={card.id}
                    onClick={() => navigate(card.id)}
                    className="glass-card aspect-[4/5] rounded-[48px] p-10 flex flex-col justify-end group cursor-pointer"
                  >
                    <div className="mb-auto opacity-20 group-hover:opacity-100 group-hover:text-blue-400 transition-all duration-500">
                      <card.icon size={48} strokeWidth={1} />
                    </div>
                    <h3 className="text-3xl font-bold mb-2 transition-transform group-hover:translate-x-2">{card.title}</h3>
                    <p className="text-sm text-slate-400 font-light leading-relaxed group-hover:translate-x-2 transition-transform">{card.text}</p>
                  </div>
                ))}
              </div>

              {/* Value Section */}
              <div className="mt-40 text-center">
                <div className="glass p-12 md:p-20 rounded-[60px] max-w-5xl mx-auto">
                  <h2 className="text-3xl md:text-5xl font-bold mb-8">Ehrlichkeit ist unser Core.</h2>
                  <p className="text-slate-400 text-lg font-light leading-relaxed mb-10 max-w-3xl mx-auto">
                    In einer Welt voller Marketing-Hype setzen wir auf kalte Fakten. Wir testen jedes Produkt auf seine technische Integrität, bevor es in unseren Shop kommt.
                  </p>
                  <div className="flex justify-center space-x-12 opacity-40">
                    <Cpu size={32} />
                    <Fingerprint size={32} />
                    <Atom size={32} />
                  </div>
                </div>
              </div>
            </>
          )}

          {page !== 'home' && (
            <>
              <div className="flex justify-between items-end mb-16">
                <div>
                  <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Kollektion</span>
                  <h2 className="text-5xl font-black uppercase tracking-tighter">{page}</h2>
                </div>
                <div className="text-slate-500 text-sm font-light hidden md:block">
                  {products[page].length} Produkte kuratiert
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {products[page].map(item => (
                  <div key={item.id} className="glass-card rounded-[40px] p-8 group flex flex-col">
                    <div className="h-60 mb-8 rounded-3xl bg-black/40 flex items-center justify-center relative overflow-hidden">
                      <div className="opacity-5 group-hover:scale-110 group-hover:opacity-20 transition duration-700">
                        {page === 'bikes' && <Bike size={100} />}
                        {page === 'clothes' && <Shirt size={100} />}
                        {page === 'gear' && <Compass size={100} />}
                      </div>
                      <span className="absolute top-4 left-4 bg-white/10 px-3 py-1 rounded-full text-[9px] font-black tracking-widest text-blue-400 uppercase">
                        {item.label}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{item.name}</h3>
                    <p className="text-sm text-slate-400 font-light mb-8 leading-relaxed">
                      {item.desc}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xl font-bold tracking-tight">{item.price}</span>
                      <button className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300">
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      </main>

      <footer className="py-20 text-center opacity-10 text-[10px] uppercase tracking-[0.5em] font-bold">
        CORE. Webstore &copy; 2024 — Explorers Choice
      </footer>
    </div>
  );
};

export default App;