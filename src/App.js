import React, { useState, useEffect, useRef } from 'react';
import {
  Compass, ShoppingBag, Wrench, Activity, Search, ChevronRight,
  Check, X, Heart, MessageCircle, Share2, Zap, Shield, Mountain,
  Menu, User, Bell, Settings, ArrowRight
} from 'lucide-react';

// --- MOCK DATA ---

const FEED_POSTS = [
  {
    id: 1,
    user: "Alex Rider",
    avatar: "https://i.pravatar.cc/150?u=alex",
    image: "https://images.unsplash.com/photo-1687860913805-dec18145f539?auto=format&fit=crop&q=80&w=800",
    title: "Gravel-Tour durch die Alpen",
    text: "Das neue Setup hat sich extrem gelohnt. Aerobes Training auf dem Gravel-Bike ist einfach der beste Ausgleich zum Enduro-Wochenende!",
    likes: 342
  },
  {
    id: 2,
    user: "Sarah Sendit",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    image: "https://images.unsplash.com/photo-1631636651474-f231fc03f86a?auto=format&fit=crop&q=80&w=800",
    title: "Neue Jacke im Härtetest",
    text: "Vergesst normale Regenjacken. Die neue AeroBreath Pro hat mich heute bei strömendem Regen und 1500 Höhenmetern komplett trocken gehalten.",
    likes: 890
  }
];

const SHOP_CATEGORIES = ["Alle", "Bikes", "Clothes", "Gear"];

const PRODUCTS = [
  {
    id: 101,
    name: "Gravel Master 9000",
    brand: "AeroPeak",
    category: "Bikes",
    price: "3.499 €",
    image: "https://images.unsplash.com/photo-1724410621172-5cdda153de12?auto=format&fit=crop&q=80&w=600",
    pros: ["Carbon-Rahmen", "Ausdauer-Geometrie"],
    cons: ["Preis"],
    description: "Die ultimative Waffe für dein aerobes Training."
  },
  {
    id: 102,
    name: "Enduro Shredder X",
    brand: "GravityWorks",
    category: "Bikes",
    price: "4.299 €",
    image: "https://images.unsplash.com/photo-1545565319-e1b6be69a9a2?auto=format&fit=crop&q=80&w=600",
    pros: ["170mm Federweg", "Extrem robust"],
    cons: ["Gewicht"],
    description: "Anaerobes Intervalltraining leicht gemacht."
  },
  {
    id: 103,
    name: "AeroBreath Pro",
    brand: "SummitTech",
    category: "Clothes",
    price: "450 €",
    image: "https://images.unsplash.com/photo-1721745889171-feeae3a64d75?auto=format&fit=crop&q=80&w=600",
    pros: ["Gore-Tex", "Biker-Schnitt"],
    cons: ["Preis"],
    description: "Schutz vor jedem Wetter."
  }
];

const BUILDER_TIERS = {
  "Low-End": { price: "~ 2.100 €", fork: "RockShox Yari RC", drive: "SRAM NX Eagle", brakes: "SRAM Guide T", wheels: "DT Swiss E 1900" },
  "Preis-Leistung": { price: "~ 3.500 €", fork: "RockShox Lyrik Select+", drive: "SRAM GX Eagle", brakes: "Shimano XT", wheels: "DT Swiss EX 1700" },
  "High-End": { price: "~ 8.500 €", fork: "Fox 36 Factory Kashima", drive: "SRAM XX1 AXS", brakes: "Shimano XTR", wheels: "ENVE M7 Carbon" }
};

// --- STYLED COMPONENTS ---

const GlassCard = ({ children, className = "", delay = 0 }) => (
  <div
    className={`
      relative bg-white/10 backdrop-blur-2xl 
      border border-white/20 shadow-[0_8px_32px_0_rgba(255,255,255,0.05)] 
      rounded-[2.5rem] overflow-hidden 
      transition-all duration-700
      opacity-0 translate-y-10
      animate-fadeUp
      ${className}
    `}
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("tab") || "home";
  });
  const navRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return localStorage.getItem("category") || "Alle";
  });
  
  const categoryRef = useRef(null);
  const [categoryIndicator, setCategoryIndicator] = useState({
    width: 0,
    height: 0,
    transform: "translateX(0px)"
  });
  const [builderTier, setBuilderTier] = useState("Preis-Leistung");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const navItems = [
    { id: 'home', icon: <Compass size={20} />, label: 'Entdecken' },
    { id: 'shop', icon: <ShoppingBag size={20} />, label: 'Shop' },
    { id: 'builder', icon: <Wrench size={20} />, label: 'Builder' },
    { id: 'activity', icon: <Activity size={20} />, label: 'Performance' },
  ];

  useEffect(() => {
    const updateIndicator = () => {
      const activeEl = navRef.current?.querySelector(`[data-id="${activeTab}"]`);
      if (!activeEl) return;

      const rect = activeEl.getBoundingClientRect();
      const parentRect = navRef.current.getBoundingClientRect();

      setIndicatorStyle({
        width: rect.width,
        height: rect.height,
        transform: `translateX(${rect.left - parentRect.left}px)`,
        left: 0
      });
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);

    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeTab]);

  useEffect(() => {
    const updateIndicator = () => {
      const activeEl = categoryRef.current?.querySelector(
        `[data-cat="${selectedCategory}"]`
      );

      if (activeEl) {
        const rect = activeEl.getBoundingClientRect();
        const parentRect = categoryRef.current.getBoundingClientRect();

        setCategoryIndicator({
          width: rect.width,
          height: rect.height,
          transform: `translateX(${rect.left - parentRect.left - 5.5}px)`
        });
      }
    };

    updateIndicator();

    // 🔥 WICHTIG: nochmal nach Render
    setTimeout(updateIndicator, 0);
  }, [selectedCategory]);

  const handleTabChange = (id) => {
    if (id === activeTab) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(id);
      localStorage.setItem("tab", id);
      setIsTransitioning(false);
    }, 150);
  };
  
    

  // --- VIEWS ---

  const renderHome = () => (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <header className="text-center pt-8 animate-in fade-in zoom-in duration-700">
        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter italic uppercase leading-none">
          CORE.<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Craft</span>
        </h1>
        <p className="text-white/40 text-lg mt-4 font-medium tracking-widest uppercase">The Next Gen Outdoor Collective</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {FEED_POSTS.map((post, index) => (
          <GlassCard key={post.id} className="p-0" delay={index * 150}>
            <div className="p-6 flex items-center gap-4">
              <img src={post.avatar} alt={post.user} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white/10" />
              <div>
                <span className="font-bold text-white block">{post.user}</span>
                <span className="text-white/30 text-xs">Vor 2 Stunden</span>
              </div>
            </div>
            <div className="px-6 pb-6">
              <div className="relative rounded-3xl overflow-hidden aspect-video group">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              <div className="mt-6">
                <h3 className="text-2xl font-bold text-white mb-3">{post.title}</h3>
                <p className="text-white/60 leading-relaxed line-clamp-2">{post.text}</p>
              </div>
              <div className="mt-8 flex items-center gap-6">
                <button className="flex items-center gap-2 text-white/50 hover:text-pink-400 transition-all bg-white/5 px-4 py-2 rounded-xl hover:bg-white/10 active:scale-95"><Heart size={18} /> {post.likes}</button>
                <button className="flex items-center gap-2 text-white/50 hover:text-indigo-400 transition-all bg-white/5 px-4 py-2 rounded-xl hover:bg-white/10 active:scale-95"><MessageCircle size={18} /></button>
                <button className="ml-auto p-2 text-white/30 hover:text-white transition-colors"><Share2 size={18} /></button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );

  const renderShop = () => (
    <div className="max-w-7xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-4 animate-in fade-in slide-in-from-left-4 duration-500">
        <h2 className="text-4xl font-black text-white tracking-tight uppercase italic">Gear <span className="text-indigo-400 underline decoration-indigo-500/30">Shop</span></h2>
        <div
          ref={categoryRef}
          className="relative flex gap-2 p-1.5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-x-auto scrollbar-hide"
        >
          {/* SLIDING INDICATOR */}
          <div
            className="absolute top-1.5 bg-white rounded-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
            style={categoryIndicator}
          />

          {SHOP_CATEGORIES.map(cat => (
            <button
              key={cat}
              data-cat={cat}
              onClick={() => {
                setSelectedCategory(cat);
                localStorage.setItem("category", cat);
              }}
              className={`relative z-10 px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap active:scale-95 ${selectedCategory === cat
                  ? 'text-black'
                  : 'text-white/40 hover:text-white'
                }`}
            >
              {cat}
            </button> 
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRODUCTS.filter(p => selectedCategory === "Alle" || p.category === selectedCategory).map((product, index) => (
          <GlassCard key={product.id} className="group p-2" delay={index * 100}>
            <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5]">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-indigo-400 text-[10px] font-black uppercase tracking-widest translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">{product.brand}</p>
                <h3 className="text-2xl font-bold text-white mt-1">{product.name}</h3>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-white">{product.price}</span>
                  <button className="bg-white/20 hover:bg-white text-white hover:text-black p-3 rounded-2xl backdrop-blur-xl transition-all border border-white/10 active:scale-90">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );

  const renderBuilder = () => (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="flex items-center gap-6 pt-4 animate-in fade-in slide-in-from-top-4 duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
        <div className="p-4 bg-indigo-500/20 border border-indigo-500/30 rounded-3xl animate-pulse">
          <Wrench className="text-indigo-400" size={32} />
        </div>
        <div>
          <h2 className="text-4xl font-black text-white tracking-tight uppercase italic">Configurator</h2>
          <p className="text-white/40 font-bold uppercase tracking-widest text-sm italic">Engineered Perfection</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-6">
          <GlassCard className="p-8" hover={false} delay={100}>
            <h3 className="text-white font-bold mb-6 text-xl">Budget Tier</h3>
            <div className="space-y-3">
              {Object.keys(BUILDER_TIERS).map(tier => (
                <button
                  key={tier}
                  onClick={() => setBuilderTier(tier)}
                  className={`w-full p-5 rounded-3xl text-left transition-all border-2 active:scale-95 ${builderTier === tier
                      ? 'bg-white/10 border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.3)]'
                      : 'bg-white/5 border-white/5 text-white/30 hover:border-white/20'
                    }`}
                >
                  <div className={`font-black uppercase text-[10px] tracking-widest mb-1 ${builderTier === tier ? 'text-indigo-400' : ''}`}>{tier}</div>
                  <div className="text-xl font-bold text-white">{BUILDER_TIERS[tier].price}</div>
                </button>
              ))}
            </div>
          </GlassCard>
        </div>

        <div className="lg:col-span-8">
          <GlassCard className="h-full flex flex-col p-8" hover={false} delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {[
                { label: 'Federung', value: BUILDER_TIERS[builderTier].fork },
                { label: 'Schaltung', value: BUILDER_TIERS[builderTier].drive },
                { label: 'Bremsanlage', value: BUILDER_TIERS[builderTier].brakes },
                { label: 'Laufradsatz', value: BUILDER_TIERS[builderTier].wheels },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-white/5 rounded-3xl border border-white/5 transition-all hover:bg-white/10 hover:translate-x-1 duration-300">
                  <span className="text-indigo-400 font-black uppercase text-[10px] tracking-[0.2em]">{item.label}</span>
                  <p className="text-white font-bold text-lg mt-2 leading-tight italic">{item.value}</p>
                </div>
              ))}
            </div>
            <button className="mt-auto w-full group relative overflow-hidden bg-white py-6 rounded-3xl transition-all active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-indigo-500/20">
              <span className="relative z-10 text-black font-black text-xl uppercase tracking-tighter italic">Build anfordern</span>
              <div className="absolute inset-0 bg-indigo-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <span className="absolute inset-0 flex items-center justify-center text-white font-black text-xl uppercase tracking-tighter italic opacity-0 group-hover:opacity-100 transition-opacity duration-500">Ready to Send?</span>
            </button>
          </GlassCard>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0d0f12] text-white selection:bg-indigo-500/30 font-sans flex flex-col overflow-x-hidden">
      {/* Dynamic Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[1200px] h-[1200px] bg-indigo-600/10 rounded-full blur-[180px] animate-pulse transition-transform duration-[3s]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[900px] h-[900px] bg-cyan-600/10 rounded-full blur-[160px] animate-pulse"></div>
        <div className="absolute top-[30%] left-[40%] w-[700px] h-[700px] bg-purple-600/5 rounded-full blur-[140px]"></div>
      </div>

      {/* PC TOP NAVIGATION */}
      <nav className="hidden lg:flex sticky top-0 z-50 px-12 py-8 pointer-events-none">
        <div className="mx-auto w-full max-w-6xl flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl shadow-white/5 group-hover:rotate-12 transition-transform duration-500">
              <Zap className="text-black fill-black" size={26} />
            </div>
            <span className="font-black text-3xl tracking-tighter uppercase italic">CORE.</span>
          </div>

          <div
            ref={navRef}
            className="relative bg-white/10 backdrop-blur-3xl border border-white/20 p-1.5 rounded-[2rem] flex items-center gap-1 shadow-2xl"
          >
            {/* Sliding Indicator */}
            <div
              className="absolute top-1.5 left-1.5 bg-white rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-xl"
              style={indicatorStyle}
            />

            {navItems.map(item => (
              <button
                key={item.id}
                data-id={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`relative px-8 py-3.5 rounded-2xl flex items-center gap-3 transition-all duration-500 font-bold text-sm z-10 ${activeTab === item.id
                    ? 'text-black'
                    : 'text-white/40 hover:text-white'
                  }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className="p-3.5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 text-white/60 transition-all active:scale-90">
              <Search size={22} />
            </button>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 border-2 border-white/20 flex items-center justify-center font-black shadow-lg cursor-pointer hover:scale-105 transition-transform">
              JD
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE HEADER */}
      <header className="lg:hidden flex items-center justify-between px-6 py-6 sticky top-0 z-40 bg-[#0d0f12]/60 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
            <Zap size={22} className="text-black fill-black" />
          </div>
          <span className="font-black text-2xl tracking-tighter uppercase italic">CORE.</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Bell size={24} className="text-white/40" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full"></span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center font-bold text-sm border border-white/10">JD</div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className={`flex-grow relative px-6 lg:px-12 py-8 transition-all duration-500 ${isTransitioning
          ? 'opacity-0 translate-y-6 scale-[0.98]'
          : 'opacity-100 translate-y-0 scale-100'
        }`}>
        <div className="container mx-auto">
          {activeTab === 'home' && renderHome()}
          {activeTab === 'shop' && renderShop()}
          {activeTab === 'builder' && renderBuilder()}
          {activeTab === 'activity' && (
            <div className="max-w-4xl mx-auto space-y-10 pt-4 animate-in fade-in slide-in-from-bottom-10 duration-700">
              <h2 className="text-4xl font-black text-white tracking-tight uppercase italic">Your <span className="text-green-400">Peak</span></h2>
              <GlassCard className="p-12 border-indigo-500/20 bg-indigo-500/5" hover={false}>
                <div className="flex justify-between items-center mb-12">
                  <div>
                    <h3 className="text-white font-black text-3xl">Aero-Score: 84%</h3>
                    <p className="text-white/40 text-sm font-bold tracking-[0.3em] uppercase mt-2">Performance Index</p>
                  </div>
                  <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center border border-white/10 animate-bounce-slow">
                    <Activity className="text-indigo-400" size={40} />
                  </div>
                </div>
                <div className="h-6 bg-white/5 rounded-full overflow-hidden border border-white/10 p-1">
                  <div className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-green-400 w-[84%] rounded-full shadow-[0_0_20px_rgba(99,102,241,0.6)]"></div>
                </div>
              </GlassCard>
            </div>
          )}
        </div>
      </main>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="lg:hidden fixed bottom-8 left-6 right-6 z-50">
        <div className="bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[2.5rem] p-2.5 flex justify-between items-center shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`flex-grow py-4 rounded-[2rem] flex flex-col items-center justify-center gap-1.5 transition-all duration-500 active:scale-90 ${activeTab === item.id
                  ? 'bg-white text-black shadow-xl scale-105'
                  : 'text-white/40 hover:text-white'
                }`}
            >
              <div className={`${activeTab === item.id ? 'scale-110' : ''} transition-transform duration-500`}>
                {item.icon}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <style dangerouslySetInnerHTML={{
        __html: `
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-fadeUp {
  animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards;
}

@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-bounce-slow {
  animation: bounce-slow 3s ease-in-out infinite;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
`}} />
    </div>
  );
}