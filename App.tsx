
import React, { useState, useEffect, useRef } from 'react';
import { ViewId, Product, CartItem, ChatMessage } from './types';
import { askKijanaStylist } from './services/geminiService';
import { Button } from './components/Button';
import { PRODUCTS, LOOKBOOK_IMAGES, CUSTOM_BASES, CUSTOM_COLORS, CUSTOM_DETAILS } from './constants';

/**
 * ⚡ DIGITAL STREET CANVAS
 * Background Motion System & Visual Identity Engine
 */

// --- Icons & Stickers ---

const WhatsAppIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.36-.54.38-.89.96-1.03 1.6-.14.69-.03 1.4.27 2.02.35.84 1.05 1.54 1.88 1.94 1.02.48 2.3.41 3.28-.19.64-.39 1.08-1.02 1.22-1.75.12-.66.11-1.31.11-1.97V.02z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const HamburgerIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// --- Loading Component ---
const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 1200); // Cinematic exit
          return 100;
        }
        return prev + Math.random() * 8;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[1000] bg-[#FAF9F6] flex flex-col items-center justify-center animate-in fade-in duration-1000">
      <div className="relative w-56 h-56 md:w-80 md:h-80 mb-12">
        {/* Rotating Circular Text Stamp */}
        <div className="absolute inset-0 animate-spin-slow">
           <svg className="w-full h-full" viewBox="0 0 100 100">
             <path id="loaderPath" fill="none" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0 " />
             <text className="text-[5.5px] font-black uppercase tracking-[0.4em] fill-slate-900/40">
                <textPath xlinkHref="#loaderPath">KIJANA AMAZING • ROOTED IN GRIT • EST. 2018 • NAIROBI • NAKURU • VISIONARY •</textPath>
             </text>
           </svg>
        </div>
        
        {/* Secondary Inner Stamp Layer */}
        <div className="absolute inset-4 animate-spin-slow-reverse">
           <svg className="w-full h-full" viewBox="0 0 100 100">
             <path id="innerLoaderPath" fill="none" d="M 50, 50 m -32, 0 a 32,32 0 1,1 64,0 a 32,32 0 1,1 -64,0 " />
             <text className="text-[5px] font-black uppercase tracking-[0.2em] fill-slate-900/20">
                <textPath xlinkHref="#innerLoaderPath">AESTHETIC ENDURANCE • QUALITY ARTIFACTS •</textPath>
             </text>
           </svg>
        </div>

        {/* Center Pulsing Stamp Logo */}
       <div className="absolute inset-0 flex items-center justify-center">
  <div className="flex items-center justify-center ring-[12px] ring-[#FFD8BE]/30 rounded-full">
    
    <img
      src="/assets/loader-logo.png"
      alt="KA Protocol Logo"
      className="w-20 h-20 md:w-24 md:h-24 object-contain"
    />

  </div>
</div>

      </div>
      
      {/* Loading Progress System */}
      <div className="flex flex-col items-center space-y-4">
        <div className="w-48 h-[1px] bg-slate-100 relative">
          <div 
            className="absolute inset-y-0 left-0 bg-slate-900 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(0,0,0,0.5)]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex items-center gap-3">
           <div className="w-1.5 h-1.5 bg-[#FFD8BE] rounded-full animate-pulse"></div>
           <p className="text-[9px] font-black uppercase tracking-[0.6em] text-slate-400">
             Forging Artifacts {Math.round(progress)}%
           </p>
        </div>
      </div>

      {/* Background Atmosphere Layer */}
      <div className="absolute inset-0 z-[-1] opacity-40">
        <div className="absolute top-[10%] left-[10%] w-[50%] h-[50%] bg-[#FFD8BE] rounded-full filter blur-[140px] animate-blob"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[50%] h-[50%] bg-[#D1F2EB] rounded-full filter blur-[140px] animate-blob animation-delay-4000"></div>
      </div>
    </div>
  );
};

// --- Scroll Reveal Component ---
const RevealSection: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={sectionRef} 
      className={`${className} transition-all duration-[1200ms] ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
    >
      {children}
    </div>
  );
};

// --- Lazy Image Loader ---
const LazyLookbookImage: React.FC<{ src: string; index: number }> = ({ src, index }) => {
  const [loaded, setLoaded] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 20;
    const y = ((e.clientY - top) / height - 0.5) * -20;
    setTilt({ x, y });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      className={`break-inside-avoid mb-4 md:mb-8 rounded-2xl md:rounded-3xl overflow-hidden border-[3px] md:border-4 border-white shadow-lg transition-all duration-700 perspective-1000 group ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} 
      style={{ 
        transitionDelay: `${(index % 6) * 100}ms`,
        animation: loaded ? `grit-float ${6 + (index % 4)}s infinite ease-in-out ${index * 0.1}s` : 'none'
      }}
    >
      <div 
        className="w-full h-full transition-transform duration-300 ease-out"
        style={{ transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(${tilt.x !== 0 ? 1.05 : 1})` }}
      >
        <div className={`absolute inset-0 bg-gradient-to-tr from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none`}></div>
        <img 
          src={src} 
          loading="lazy"
          onLoad={() => setLoaded(true)} 
          className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" 
          alt={`Lookbook moment ${index + 1}`} 
        />
        {!loaded && (
          <div className="absolute inset-0 bg-slate-100 overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- WhatsApp Floating Button ---
const WhatsAppButton = () => (
  <a 
    href="https://wa.me/254746129446" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="fixed bottom-32 right-8 z-[70] w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-4xl hover:scale-110 active:scale-90 transition-transform animate-glow"
    aria-label="Contact us on WhatsApp"
  >
    <WhatsAppIcon />
  </a>
);



// --- Visionary DNA Section ---
const VisionaryDNA = () => {
  return (
    <RevealSection className="w-full bg-slate-900 overflow-hidden relative py-20 md:py-32 rounded-[2.5rem] md:rounded-[6rem] border-[12px] md:border-8 border-white shadow-4xl mb-32 font-inter">
       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFD8BE]/5 to-transparent"></div>
       {/* Campaign Cinema Section */}
<section className="py-32 md:py-48 bg-[#e7d3c1] backdrop-blur-xl border-y border-white">
  <div className="container mx-auto px-6 text-center">
    <div className="max-w-4xl mx-auto space-y-12">
      <span className="text-[10px] font-black uppercase tracking-[0.8em] text-slate-400">
        CAMPAIGN CINEMA
      </span>

      <h3 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter">
        THE BRAND FILM.
      </h3>

      <p className="text-lg md:text-2xl text-slate-500 font-medium italic">
        Witness the elite motion of Kijana Amazing. Our latest drop captured in visionary quality.
      </p>

      <div className="relative aspect-video max-w-7xl mx-auto rounded-[3rem] overflow-hidden border-8 border-white shadow-4xl bg-slate-900 group">
        <video
          src="/assets/vd2.mp4"
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          controls
        />

        <div className="absolute inset-0 bg-slate-900/10 pointer-events-none group-hover:bg-transparent transition-all duration-700"></div>
      </div>

      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
        Cinematic Artifact Selection 01
      </p>
    </div>
  </div>
</section>


       
       <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16 md:gap-24">
          <div className="lg:w-1/2 space-y-8 md:space-y-12 text-center lg:text-left">
             <span className="text-[10px] font-black uppercase tracking-[1em] text-[#FFD8BE]">Protocol: Endurance</span>
             <h2 className="text-5xl md:text-9xl font-bangers uppercase tracking-tight leading-[0.85] text-white">THE ANATOMY <br/>OF GRIT.</h2>
             <p className="text-lg md:text-xl text-white/60 font-playfair italic leading-relaxed max-w-lg mx-auto lg:mx-0">
                Forged for the high-altitude grind of Nakuru. Every stitch is a commitment to the visionary who doesn't wait for permission.
             </p>
             <div className="pt-4 grid grid-cols-2 gap-8 md:gap-12 max-sm mx-auto lg:mx-0">
                <div className="space-y-2">
                   <p className="text-2xl md:text-3xl font-bangers text-white">NAX_01</p>
                   <p className="text-[9px] font-black uppercase tracking-widest text-[#FFD8BE]">Thermal Defense</p>
                </div>
                <div className="space-y-2">
                   <p className="text-2xl md:text-3xl font-bangers text-white">COURT_X</p>
                   <p className="text-[9px] font-black uppercase tracking-widest text-[#FFD8BE]">Athletic Pivot</p>
                </div>
             </div>
          </div>

          <div className="lg:w-1/2 relative">
             <div className="relative aspect-[4/5] max-w-lg mx-auto overflow-visible group">
                <div className="absolute inset-0 bg-[#FFD8BE]/10 rounded-full blur-[120px] animate-pulse"></div>
                <svg className="absolute -inset-20 w-[140%] h-[140%] opacity-10 pointer-events-none" viewBox="0 0 100 100">
                  <path d="M0 20 L100 20 M0 40 L100 40 M0 60 L100 60 M0 80 L100 80" stroke="white" strokeWidth="0.05" />
                  <path d="M20 0 L20 100 M40 0 L40 100 M60 0 L60 100 M80 0 L80 100" stroke="white" strokeWidth="0.05" />
                </svg>
                <img 
                  src="/assets/lkk4.jpeg" 
                  className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)] transition-transform duration-[2000ms] group-hover:scale-105" 
                  alt="Technical breakout of Kijana artifact" 
                />
                <GritHotspot top="15%" left="20%" title="DEFENSE_PROTO" data="Nax-Cold optimized lining." />
                <GritHotspot top="45%" left="75%" title="GSM_REINFORCE" data="450GSM Industrial Weave." delay="0.2s" />
                <GritHotspot top="85%" left="40%" title="VISION_FINISH" data="Tailored Boxy Architecture." delay="0.4s" />
             </div>
          </div>
       </div>

       <div className="absolute bottom-0 left-0 w-full overflow-hidden opacity-5 pointer-events-none whitespace-nowrap mb-4 md:mb-8 font-bangers">
          <p className="text-8xl md:text-[12rem] uppercase tracking-tighter text-white animate-marquee">
             SPEC_ENG_254_NAX_REINFORCED_STITCH_AESTHETIC_ENDURANCE_CRAFT_PROTO_V1.1_
          </p>
       </div>
    </RevealSection>
  );
};

const GritHotspot: React.FC<{ top: string; left: string; title: string; data: string; delay?: string }> = ({ top, left, title, data, delay = "0s" }) => {
  const [active, setActive] = useState(false);
  return (
    <div 
      className="absolute z-20 group"
      style={{ top, left, transitionDelay: delay }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-[#FFD8BE] flex items-center justify-center cursor-help animate-pulse transition-all duration-500 ${active ? 'scale-150 bg-[#FFD8BE] rotate-45' : 'bg-transparent'}`}>
        <span className={`font-black transition-colors text-sm ${active ? 'text-slate-900' : 'text-[#FFD8BE]'}`}>+</span>
      </div>
      <div className={`absolute left-10 md:left-14 top-0 w-48 md:w-64 p-4 md:p-6 bg-slate-900/90 backdrop-blur-xl border border-white/20 rounded-2xl md:rounded-3xl transition-all duration-500 transform ${active ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-10 scale-90 pointer-events-none'}`}>
         <h6 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-[#FFD8BE] mb-2">{title}</h6>
         <p className="text-[10px] md:text-[11px] font-mono text-white/80 leading-relaxed uppercase tracking-widest">{data}</p>
      </div>
    </div>
  );
};

const ProductCard: React.FC<{ product: Product; onClick: () => void }> = ({ product, onClick }) => {
  return (
    <div 
      onClick={onClick} 
      className="group cursor-pointer relative focus-within:ring-2 focus-within:ring-[#FFD8BE] rounded-2xl md:rounded-[2.5rem] break-inside-avoid mb-6 md:mb-12 font-inter"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <div className="aspect-[3/4] rounded-2xl md:rounded-[2.5rem] overflow-hidden border-[3px] md:border-4 border-white shadow-xl mb-4 md:mb-6 relative bg-white transition-all duration-500 hover:shadow-2xl">
        <img 
          src={product.image} 
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-0" 
          alt={product.name} 
        />
        {product.hoverImage && (
          <img 
            src={product.hoverImage} 
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-110" 
            alt={`${product.name} alternate view`} 
          />
        )}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
      <div className="px-1 md:px-2 text-center">
        <h3 className="text-sm md:text-xl font-bold uppercase tracking-tight group-hover:text-[#FFD8BE] transition-colors text-slate-900 leading-tight">{product.name}</h3>
        <p className="font-black text-slate-400 mt-1 uppercase tracking-widest text-[8px] md:text-[10px]">KES {product.price.toLocaleString()}</p>
      </div>
    </div>
  );
};

const ZoomableImage: React.FC<{ src: string; alt: string; borderClassName?: string }> = ({ src, alt, borderClassName = "" }) => {
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div 
      className={`relative overflow-hidden cursor-zoom-in group ${borderClassName}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      role="img"
    >
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-transform duration-500 ease-out`}
        style={{
          transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
          transform: isHovering ? 'scale(2.2)' : 'scale(1)'
        }}
      />
    </div>
  );
};

const FloatingStickersLayer = () => {
  const stickers = [
    { type: 'flame', color: '#FFD8BE', top: '15%', left: '8%', delay: '0s', scale: 1.2 },
    { type: 'bolt', color: '#E2D1F9', top: '25%', left: '85%', delay: '2s', scale: 0.9 },
    { type: 'star', color: '#D1F2EB', top: '65%', left: '12%', delay: '4s', scale: 1.1 },
    { type: 'smiley', color: '#FFD8BE', top: '45%', left: '92%', delay: '1s', scale: 1 },
    { type: 'tag', color: '#E2D1F9', top: '85%', left: '75%', delay: '3s', scale: 0.8 },
  ];

  return (
    <>
      {stickers.map((s, i) => (
        <Sticker 
          key={i} 
          type={s.type}
          color={s.color}
          top={s.top}
          left={s.left}
          delay={s.delay}
          scale={s.scale}
        />
      ))}
    </>
  );
};

interface StickerProps {
  type: string;
  color: string;
  top: string;
  left: string;
  delay: string;
  scale?: number;
}

const Sticker: React.FC<StickerProps> = ({ type, color, top, left, delay, scale = 1 }) => {
  const icons: Record<string, React.ReactElement> = {
    flame: <path d="M12 2C12 2 12 6.5 8 9.5C6.5 10.6 5 12.5 5 15C5 18.9 8.1 22 12 22C15.9 22 19 18.9 19 15C19 12.5 17.5 10.6 16 9.5C12 6.5 12 2 12 2Z" fill="currentColor"/>,
    bolt: <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor"/>,
    star: <path d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z" fill="currentColor"/>,
    smiley: <g fill="currentColor"><path d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM7 9.5C7 8.67 7.67 8 8.5 8C9.33 8 10 8.67 10 9.5C10 10.33 9.33 11 8.5 11C7.67 11 7 10.33 7 9.5ZM14 9.5C14 8.67 14.67 8 15.5 8C16.33 8 17 8.67 17 9.5C17 10.33 16.33 11 15.5 11C14.67 11 14 10.33 14 9.5ZM12 18C14.5 18 16.63 16.47 17.5 14.28C17.7 13.78 17.45 13.22 16.95 13.02C16.45 12.82 15.89 13.07 15.69 13.57C15.08 15.11 13.62 16.2 12 16.2C10.38 16.2 8.92 15.11 8.31 13.57C8.11 13.07 7.55 12.82 7.05 13.02C6.55 13.22 6.3 13.78 6.5 14.28C7.37 16.47 9.5 18 12 18Z"/></g>,
    tag: <path d="M21.41 11.58L12.41 2.58C12.05 2.22 11.55 2 11 2H4C2.9 2 2 2.9 2 4V11C2 11.55 2.22 12.05 2.59 12.42L11.59 21.42C11.95 21.78 12.45 22 13 22C13.55 22 14.05 21.78 14.41 21.41L21.41 14.41C21.78 14.05 22 13.55 22 13C22 12.45 21.77 11.94 21.41 11.58ZM13 20L4 11V4H11L20 13L13 20ZM6.5 5C7.33 5 8 5.67 8 6.5C8 7.33 7.33 8 6.5 8C5.67 8 5 7.33 5 6.5C5 5.67 5.67 5 6.5 5Z" fill="currentColor"/>
  };

  return (
    <div 
      className="fixed z-[-1] opacity-20 pointer-events-none animate-sticker-float hidden md:block"
      style={{ 
        top, 
        left, 
        color, 
        animationDelay: delay,
        transform: `scale(${scale})`
      }}
    >
      <svg className="w-16 h-16" viewBox="0 0 24 24">
        {icons[type]}
      </svg>
    </div>
  );
};

// --- Main App ---

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<ViewId>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [filter, setFilter] = useState<string>('All');
  const [scrolled, setScrolled] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Cart / Checkout States
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'mpesa'>('cash');

  // Lab Selection States
  const [labBase, setLabBase] = useState(CUSTOM_BASES[0]);
  const [labColor, setLabColor] = useState(CUSTOM_COLORS[0]);
  const [labDetail, setLabDetail] = useState(CUSTOM_DETAILS[0]);
  const [monogram, setMonogram] = useState('');
  const [forgeLogs, setForgeLogs] = useState<string[]>(['[SYSTEM]: READY FOR FORGING', '[SYSTEM]: LOC: 0.38.254.NAX']);

  // Protocol Signal States
  const [protocolStatus, setProtocolStatus] = useState<'idle' | 'intercepting' | 'authenticated'>('idle');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileMenuOpen]);

  const addForgeLog = (msg: string) => {
    setForgeLogs(prev => [...prev.slice(-3), msg]);
  };

  const navigateTo = (view: ViewId, product?: Product) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    if (product) {
      setSelectedProduct(product);
      setSelectedSize(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product: Product) => {
    if (!selectedSize) {
      alert("Please choose your artifact size before adding to the vault.");
      return;
    }
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === selectedSize);
      if (existing) {
        return prev.map(item => item === existing ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1, selectedSize: selectedSize }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number, size: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedSize === size)));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = { role: 'user' as const, text: chatInput };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);
    const reply = await askKijanaStylist(chatInput);
    setChatMessages(prev => [...prev, { role: 'model', text: reply }]);
    setIsTyping(false);
  };

  const handleProtocolIntercept = () => {
    setProtocolStatus('intercepting');
    setTimeout(() => {
      setProtocolStatus('authenticated');
    }, 2000);
  };

  const initiateForge = () => {
    const message = `*⚙️ NEW CUSTOM ARTIFACT SPECIFICATION - KIJANA AMAZING ✨*\n\nARTIFACT BASE: *${labBase.name}*\nCHROMATIC INFUSION: *${labColor.name}*\nDETAIL SPEC: *${labDetail.name}*\nLEGACY MONOGRAM: *${monogram || 'NONE'}*\n\nPlease initiate forge.`;
    window.open(`https://wa.me/254746129446?text=${encodeURIComponent(message)}`, '_blank');
  };

  const finalizeOrder = () => {
    if (!deliveryAddress.trim()) {
      alert("Please provide a delivery address to complete your visionary order.");
      return;
    }

    const itemDetails = cart.map(item => `📦 *${item.name}* [Size: ${item.selectedSize}] x ${item.quantity}`).join('\n');
    const paymentText = paymentMethod === 'mpesa' ? "PAYMENT: *MPESA (via 0746129446)*" : "PAYMENT: *CASH ON DELIVERY*";
    
    const message = `*✨ NEW ARTIFACT ORDER - KIJANA AMAZING ✨*\n\n` + 
                    itemDetails + 
                    `\n\n💰 *Total Price: KES ${cartTotal.toLocaleString()}*` +
                    `\n📍 *Address: ${deliveryAddress}*` +
                    `\n💳 ${paymentText}` +
                    `\n🚚 *Delivery fee to be calculated based on distance.*` +
                    `\n\nPlease fulfill this artifact dispatch!`;
    
    window.open(`https://wa.me/254746129446?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen relative text-slate-900 overflow-x-hidden selection:bg-[#FFD8BE]">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[60%] h-[60%] bg-[#FFD8BE]/70 rounded-full mix-blend-multiply filter blur-[80px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[55%] h-[55%] bg-[#E2D1F9]/60 rounded-full mix-blend-multiply filter blur-[90px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[0%] left-[10%] w-[65%] h-[65%] bg-[#D1F2EB]/70 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-4000"></div>
      </div>
      <FloatingStickersLayer />

      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 font-inter ${scrolled ? 'bg-white/90 backdrop-blur-xl py-3 md:py-4 shadow-xl border-b border-slate-100' : 'bg-transparent py-6 md:py-8'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-4 cursor-pointer" onClick={() => navigateTo('home')}>
                <div className="flex items-center gap-2 pl-6 md:pl-8">
                  <img
                    src="/assets/ka-logo.png"
                    alt="Kijana Amazing Logo"
                    className="w-10 h-10 md:w-12 md:h-12 "
                  />

                </div>

          </div>
          
          <div className="hidden lg:flex items-center gap-10">
            {['home', 'shop', 'lookbook', 'custom', 'about'].map((id) => (
              <button key={id} onClick={() => navigateTo(id as ViewId)} className={`text-[10px] font-black uppercase tracking-[0.3em] transition-colors relative group ${currentView === id ? 'text-[#FFD8BE]' : 'text-slate-400 hover:text-slate-900'}`}>
                {id === 'custom' ? 'The Lab' : id === 'about' ? 'Our Story' : id}
                <span className={`absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-1 h-1 bg-[#FFD8BE] rounded-full transition-all duration-300 ${currentView === id ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-50'}`}></span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <button onClick={() => setIsCartOpen(true)} className="relative p-2.5 md:p-3 bg-white/60 rounded-full shadow-sm hover:scale-110 transition-transform focus:outline-none">
              <svg className="w-5 h-5 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              {cart.length > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-[#FFD8BE] text-[9px] md:text-[10px] text-white rounded-full flex items-center justify-center font-black animate-pulse">{cart.length}</span>}
            </button>
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2.5 md:p-3 bg-slate-900 text-white rounded-full shadow-lg hover:scale-110 active:scale-95 transition-transform focus:outline-none">
              <HamburgerIcon />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <div className={`fixed inset-0 z-[110] lg:hidden transition-all duration-500 ${isMobileMenuOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity duration-500 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMobileMenuOpen(false)}></div>
        <div className={`absolute top-0 right-0 h-full w-[80vw] max-w-[320px] bg-white shadow-4xl transition-transform duration-500 ease-out transform flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white font-bangers text-sm">KA</div>
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 font-inter">Protocol_v1</span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 border-2 border-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all active:scale-90"><CloseIcon /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-8 space-y-6">
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-300 mb-8 italic font-inter">
                  &gt;&gt; NAVIGATION_MENU
                </p>
            {['home', 'shop', 'lookbook', 'custom', 'about'].map((id, i) => (
              <button key={id} onClick={() => navigateTo(id as ViewId)} className={`w-full text-left flex items-center justify-between group py-2 transition-all duration-700 ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`} style={{ transitionDelay: `${i * 80}ms` }}>
                <span className={`text-xl font-bangers uppercase tracking-widest transition-colors ${currentView === id ? 'text-[#FFD8BE]' : 'text-slate-900 group-hover:text-[#FFD8BE]'}`}>{id === 'custom' ? 'The Lab' : id === 'about' ? 'Our Story' : id}</span>
                <span className={`w-2 h-2 rounded-full transition-all ${currentView === id ? 'bg-[#FFD8BE] scale-150' : 'bg-slate-100 scale-0 group-hover:scale-100'}`}></span>
              </button>
            ))}
          </div>
          <div className="p-8 border-t border-slate-50 space-y-4 font-inter">
             <div className="flex items-center gap-4 text-slate-300">
               <span className="w-1.5 h-1.5 bg-[#FFD8BE] rounded-full animate-pulse"></span>
               <p className="text-[9px] font-black uppercase tracking-widest italic">Signal: Nairobi_Active</p>
             </div>
             <p className="text-[8px] font-mono text-slate-200 uppercase tracking-widest leading-relaxed">For the visionaries who refuse to stay static. Rooted in Grit.</p>
          </div>
          <div className="absolute inset-0 z-[-1] opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>
      </div>

      <div className={`fixed inset-0 z-[100] transition-opacity duration-500 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
        <div className={`absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-4xl transition-transform duration-700 transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col font-inter`}>
          <div className="p-8 border-b flex justify-between items-center bg-slate-50">
            <h3 className="text-2xl font-bangers uppercase tracking-widest text-slate-900">The Vault</h3>
            <button onClick={() => setIsCartOpen(false)} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-white transition-colors text-slate-900"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" /></svg></button>
          </div>
          <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-300 italic uppercase font-black text-[10px] tracking-widest gap-4">
                <svg className="w-12 h-12 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                The vault is empty
              </div>
            ) : (
              <>
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Current Artifacts</h4>
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}`} className="flex gap-6 pb-6 border-b border-slate-50 animate-fade-up">
                      <img src={item.image} className="w-20 h-24 rounded-2xl object-cover shadow-lg border" alt={item.name} />
                      <div className="flex-1">
                        <h4 className="font-bold text-sm uppercase tracking-tight text-slate-900">{item.name}</h4>
                        <p className="text-[10px] font-black text-slate-400 mt-1 uppercase">SIZE: {item.selectedSize} | QTY: {item.quantity}</p>
                        <p className="text-[#FFD8BE] font-black text-sm mt-2">KES {item.price.toLocaleString()}</p>
                        <button onClick={() => removeFromCart(item.id, item.selectedSize)} className="mt-2 text-[9px] font-black uppercase text-red-400 hover:text-red-600 transition-colors">Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-6 pt-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Dispatch Details</h4>
                  <div className="space-y-3">
                    <label className="text-[9px] font-black uppercase text-slate-900 block ml-1">Delivery Address</label>
                    <textarea value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} placeholder="Enter Estate, Street, Apartment..." className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl p-5 text-sm font-medium focus:outline-none focus:border-slate-900 transition-all min-h-[100px] italic" />
                  </div>
                  <div className="space-y-4 pt-2">
                    <label className="text-[9px] font-black uppercase text-slate-900 block ml-1">Choice of Settlement</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button onClick={() => setPaymentMethod('cash')} className={`py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border-2 ${paymentMethod === 'cash' ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'}`}>Cash on Delivery</button>
                      <button onClick={() => setPaymentMethod('mpesa')} className={`py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border-2 ${paymentMethod === 'mpesa' ? 'bg-[#FFD8BE] text-slate-900 border-[#FFD8BE] shadow-xl' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'}`}>Mpesa</button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          {cart.length > 0 && (
            <div className="p-8 border-t bg-slate-50/50 backdrop-blur-md space-y-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-black text-slate-400 uppercase text-[10px] tracking-[0.2em]">Total Vault Value</span>
                <span className="font-black text-2xl text-slate-900">KES {cartTotal.toLocaleString()}</span>
              </div>
              <Button onClick={finalizeOrder} disabled={!deliveryAddress.trim()} className="w-full py-6 text-lg">Dispatch via WhatsApp</Button>
            </div>
          )}
        </div>
      </div>

      <main className="pt-24 md:pt-32">
        {currentView === 'home' && (
          <div className="space-y-24 md:space-y-32 mb-32">
            <RevealSection className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 md:gap-16 items-center min-h-[60vh] md:min-h-[70vh]">
              <div>
                <h1 className="text-6xl md:text-9xl font-bangers uppercase tracking-tight leading-[0.85] mb-6 md:mb-8 text-slate-900">ROOTED <br/>IN GRIT.</h1>
                <p className="text-lg md:text-2xl text-slate-500 font-playfair italic mb-10 md:mb-12 max-w-xl">Elite athletic artifacts crafted for the modern visionary. High-end streetwear forged in Nakuru, Kenya.</p>
                <div className="flex flex-wrap gap-6 md:gap-8 font-inter">
                  <Button onClick={() => navigateTo('shop')} className="px-10 md:px-12 py-5 md:py-6 text-xs md:text-base">Shop Drop</Button>
                  <button onClick={() => navigateTo('about')} className="flex items-center gap-4 group">
                    <span className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-slate-900/10 flex items-center justify-center group-hover:bg-[#FFD8BE] group-hover:text-white transition-all font-black text-slate-900">→</span>
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400">The Legacy</span>
                  </button>
                </div>
              </div>
              <div className="relative aspect-[4/5] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border-[8px] md:border-[16px] border-white shadow-4xl rotate-1 md:rotate-2 transition-transform duration-700 hover:rotate-0">
                <img src="./assets/bggg.jpg" className="w-full h-full object-cover" alt="Hero" />
              </div>
            </RevealSection>

            <div className="bg-slate-900 py-8 md:py-12 overflow-hidden whitespace-nowrap font-bangers">
              <div className="flex animate-marquee">
                {[...Array(6)].map((_, i) => (
                  <span key={i} className="text-white/20 text-4xl md:text-6xl uppercase tracking-widest mx-6 md:mx-8 italic">KIJANA AMAZING • AESTHETIC ENDURANCE • ROOTED IN GRIT • 254 LEGACY •</span>
                ))}
              </div>
            </div>

            <section className="container mx-auto px-6">
              <div className="flex justify-between items-end mb-12 md:mb-16">
                <h2 className="text-4xl md:text-8xl font-bangers uppercase tracking-tight text-slate-900">Latest Drops</h2>
                <Button onClick={() => navigateTo('shop')} variant="outline" className="px-6 py-3 font-inter">View All</Button>
              </div>
              <div className="columns-2 md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-12">
                {PRODUCTS.slice(0, 4).map((p) => (
                  <ProductCard key={p.id} product={p} onClick={() => navigateTo('product', p)} />
                ))}
              </div>
            </section>

            <VisionaryDNA />
          </div>
        )}

        {currentView === 'shop' && (
          <RevealSection className="container mx-auto px-4 md:px-6 mb-32">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8 mb-12 md:mb-20">
              <h2 className="text-5xl md:text-9xl font-bangers uppercase tracking-tight text-slate-900">Collections</h2>
              <div className="flex flex-wrap gap-2 md:gap-4 font-inter">
                {['All', 'Street', 'Retro', 'Gym', 'Official'].map((cat) => (
                  <button key={cat} onClick={() => setFilter(cat)} className={`px-5 md:px-8 py-2 md:py-3 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all ${filter === cat ? 'bg-slate-900 text-white shadow-xl' : 'bg-white border text-slate-400 hover:text-slate-900'}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-12">
              {PRODUCTS.filter(p => filter === 'All' || p.category === filter).map((p) => (
                <ProductCard key={p.id} product={p} onClick={() => navigateTo('product', p)} />
              ))}
            </div>
          </RevealSection>
        )}

        {currentView === 'product' && selectedProduct && (
          <div className="space-y-24 md:space-y-32 mb-32">
            <RevealSection className="container mx-auto px-6 font-inter">
              <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-start">
                <div className="sticky top-24 md:top-40">
                  <ZoomableImage src={selectedProduct.image} alt={selectedProduct.name} borderClassName="aspect-[3/4] rounded-3xl md:rounded-[4rem] border-[10px] md:border-[16px] border-white shadow-4xl" />
                </div>
                <div className="space-y-8 md:space-y-12">
                  <div>
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.5em] text-[#FFD8BE] mb-4 block">ID: ARTIFACT_00{selectedProduct.id}</span>
                    <h1 className="text-5xl md:text-8xl font-bangers uppercase tracking-tight leading-none text-slate-900">{selectedProduct.name}</h1>
                    <p className="text-2xl md:text-3xl font-bold mt-4 md:mt-6 italic text-slate-900">KES {selectedProduct.price.toLocaleString()}</p>
                  </div>
                  <p className="text-lg md:text-xl text-slate-500 font-playfair italic leading-relaxed max-w-xl">{selectedProduct.description || "Crafted for elite visionaries."}</p>
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Select Choice Size</h4>
                    <div className="grid grid-cols-5 gap-2 md:gap-3">
                      {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                        <button key={size} onClick={() => setSelectedSize(size)} className={`h-16 md:h-24 rounded-xl md:rounded-3xl border-2 font-black transition-all flex flex-col items-center justify-center ${selectedSize === size ? 'bg-slate-900 border-slate-900 text-white shadow-2xl scale-105' : 'bg-white border-slate-100 text-slate-400 hover:text-slate-900'}`}>
                          <span className="text-base md:text-xl">{size}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button onClick={() => handleAddToCart(selectedProduct)} disabled={!selectedSize} className={`w-full py-8 md:py-10 text-lg md:text-xl ${!selectedSize ? 'bg-slate-100 text-slate-300' : 'bg-slate-900 text-white'}`}>
                    {selectedSize ? `ADD ${selectedSize} TO VAULT` : 'LOCKED: SELECT SIZE'}
                  </Button>
                </div>
              </div>
            </RevealSection>
          </div>
        )}

        {currentView === 'lookbook' && (
          <div className="container mx-auto px-4 md:px-6 mb-32">
            <RevealSection className="mb-12 md:mb-20">
               <span className="text-[10px] font-black uppercase tracking-[1em] text-[#FFD8BE] mb-4 block font-inter">Archive: Digital Street Canvas</span>
               <h2 className="text-5xl md:text-9xl font-bangers uppercase tracking-tight text-slate-900">The Archive.</h2>
            </RevealSection>
            <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-8">
              {LOOKBOOK_IMAGES.map((img, i) => (
                <LazyLookbookImage key={i} src={img} index={i} />
              ))}
            </div>
          </div>
        )}

        {currentView === 'custom' && (
          <div className="container mx-auto px-6 py-12 md:py-20 min-h-screen font-inter">
             <div className="flex flex-col lg:flex-row gap-12 md:gap-16 items-start">
                <div className="lg:w-1/2 sticky top-24 md:top-40 space-y-8 md:space-y-12">
                   <div className="relative aspect-[4/5] rounded-[2rem] md:rounded-[4rem] bg-slate-900/5 backdrop-blur-3xl border-2 border-white shadow-4xl overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#FFD8BE]/20 to-transparent"></div>
                      <div className="absolute top-0 left-0 w-full h-1 bg-[#FFD8BE] shadow-[0_0_15px_#FFD8BE] animate-scan z-20"></div>
                      <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12 overflow-hidden">
                        <img key={labBase.id} src={labBase.img} className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-reveal-up" alt="Forging" style={{ filter: `hue-rotate(${CUSTOM_COLORS.indexOf(labColor) * 45}deg)` }} />
                      </div>
                      <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-30 font-mono text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-[#FFD8BE] bg-black/40 backdrop-blur-md p-3 md:p-4 rounded-xl md:rounded-2xl border border-white/10">
                         {forgeLogs.map((log, i) => <p key={i} className={i === forgeLogs.length - 1 ? 'animate-pulse text-white' : 'opacity-40'}>{log}</p>)}
                      </div>
                   </div>
                   <div className="bg-slate-900/90 text-[#FFD8BE] p-6 md:p-10 rounded-3xl md:rounded-[3rem] font-mono shadow-glow border border-white/5">
                      <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-4 md:mb-6">Artifact_Manifest_v3.1</p>
                      <div className="grid grid-cols-2 gap-6 md:gap-10 text-[9px] md:text-[11px] uppercase tracking-widest font-black">
                        <div>
                                        <p className="opacity-40 mb-1">&gt;&gt;&gt; BASE_PROTO</p>
                                        <p className="text-white">{labBase.name}</p>
                                      </div>

                                      <div>
                                        <p className="opacity-40 mb-1">&gt;&gt;&gt; CHROMATIC</p>
                                        <p className="text-white">{labColor.name}</p>
                                      </div>

                                      <div>
                                        <p className="opacity-40 mb-1">&gt;&gt;&gt; DETAIL_SPEC</p>
                                        <p className="text-white">{labDetail.name}</p>
                                      </div>

                                      <div>
                                        <p className="opacity-40 mb-1">&gt;&gt;&gt; MARK_ID</p>
                                        <p className="text-white">{monogram || 'PENDING...'}</p>
                                      </div>

                            </div>
                   </div>
                </div>
                <div className="lg:w-1/2 space-y-12 md:space-y-16 py-8 md:py-12">
                  <h2 className="text-6xl md:text-9xl font-bangers uppercase tracking-tight leading-none text-slate-900">FORGE <br/>ONE-OF-ONE.</h2>
                  <div className="space-y-6">
                     <h5 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 italic">01 / Choose Archetype</h5>
                     <div className="grid grid-cols-3 gap-4 md:gap-6">
                        {CUSTOM_BASES.map((b) => (
                          <button key={b.id} onClick={() => { setLabBase(b); addForgeLog(`[LOG]: SWAPPING TO ${b.id.toUpperCase()} PROTOCOL`); }} className={`p-2.5 md:p-4 rounded-2xl md:rounded-[2rem] border-2 transition-all ${labBase.id === b.id ? 'border-slate-900 bg-white shadow-2xl scale-105' : 'border-white bg-white/40 hover:border-slate-200'}`}>
                            <img src={b.img} className="w-full aspect-square object-contain mb-2 md:mb-4 grayscale hover:grayscale-0 transition-all" alt={b.name} />
                            <p className="text-[8px] md:text-[9px] font-black uppercase text-center tracking-widest leading-tight">{b.name}</p>
                          </button>
                        ))}
                     </div>
                  </div>
                  <div className="space-y-6 md:space-y-8">
                     <h5 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 italic">02 / Chromatic Infusion</h5>
                     <div className="flex flex-wrap gap-2 md:gap-4">
                        {CUSTOM_COLORS.map((c) => (
                          <button key={c.id} onClick={() => { setLabColor(c); addForgeLog(`[LOG]: INJECTING ${c.id.toUpperCase()} PIGMENT`); }} className={`flex items-center gap-2 md:gap-4 px-4 md:px-6 py-3 md:py-4 rounded-full border-2 transition-all ${labColor.id === c.id ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-white border-white text-slate-400'}`}>
                            <span className="w-3 h-3 md:w-4 md:h-4 rounded-full border border-black/10" style={{ backgroundColor: c.hex }}></span>
                            <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest">{c.name}</span>
                          </button>
                        ))}
                     </div>
                  </div>
                  <div className="space-y-6 md:space-y-8">
                     <h5 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 italic">03 / Legacy Mark</h5>
                     <input type="text" maxLength={12} value={monogram} onChange={(e) => { setMonogram(e.target.value.toUpperCase()); addForgeLog(`[LOG]: MARK UPDATED: ${e.target.value.toUpperCase()}`); }} placeholder="Enter Legacy Name..." className="w-full bg-white/60 border-2 border-slate-100 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] font-mono text-lg md:text-xl uppercase tracking-[0.2em] focus:outline-none focus:border-slate-900 transition-all shadow-sm" />
                  </div>
                  <div className="pt-8 md:pt-12">
                     <Button onClick={initiateForge} className="w-full py-12 md:py-16 text-2xl md:text-4xl bg-slate-900 text-white shadow-glow group relative overflow-hidden font-bangers uppercase tracking-widest">
                       <span className="relative z-20 italic">INITIATE_FORGE</span>
                       <div className="absolute inset-0 bg-gradient-to-r from-[#FFD8BE] to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                     </Button>
                     <p className="mt-6 md:mt-8 text-[9px] md:text-[10px] font-black text-slate-300 uppercase tracking-widest text-center italic">Forging takes 7-14 visionary work days.</p>
                  </div>
                </div>
             </div>
          </div>
        )}

        {currentView === 'about' && (
          <section className="animate-in fade-in duration-1000 pb-32 font-inter">
            <div className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900 rounded-b-[4rem] md:rounded-b-[8rem]">
              <img src="https://images.unsplash.com/photo-1544919982-b61976f0ba43?q=80&w=1600" className="absolute inset-0 w-full h-full object-cover opacity-40 scale-100 animate-slow-zoom" alt="Basketball Grit" />
              <div className="relative z-10 text-center text-white px-6">
                <p className="text-[10px] font-black uppercase tracking-[1em] mb-12 opacity-60 animate-fade-up">The Manifesto</p>
                <h2 className="text-[clamp(3rem,10vw,12rem)] font-black italic uppercase tracking-tighter leading-[0.85] mb-8 animate-reveal-up">COURT TO <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD8BE] to-white">LEGACY.</span></h2>
              </div>
            </div>

            <div className="container mx-auto px-6 py-24 md:py-48 max-w-6xl space-y-48 relative z-10">
              <div className="grid md:grid-cols-2 gap-16 md:gap-32 items-center">
                 <div className="space-y-12 animate-fade-up">
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-[#FFD8BE]">01 / THE SOURCE</span>
                    <h3 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">NAX <br/>ORIGINS.</h3>
                    <p className="text-xl md:text-2xl text-slate-600 font-medium italic leading-relaxed">
                       "Every young visionary in Nakuru knows the weight of the morning cold. The courts aren't just concrete; they are the forge of our grit."
                    </p>
                 </div>
                 <div className="relative group">
                    <div className="aspect-[4/5] rounded-[3rem] md:rounded-[5rem] overflow-hidden border-8 md:border-[20px] border-white shadow-4xl transform -rotate-3 hover:rotate-0 transition-all duration-1000">
                       <img src="https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=1200" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3000ms]" alt="Origins" />
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-48 h-48 md:w-64 md:h-64 rounded-full border-8 border-white overflow-hidden shadow-3xl transform rotate-12 hidden md:block">
                       <img src="./assets/crophoodie.jpeg" className="w-full h-full object-cover" alt="Detail" />
                    </div>
                 </div>
              </div>

              <div className="text-center space-y-12 max-w-4xl mx-auto py-24 md:py-32 px-10 md:px-16 bg-white/40 backdrop-blur-3xl rounded-[4rem] md:rounded-[8rem] border border-white shadow-4xl animate-float relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FFD8BE] via-orange-400 to-[#E2D1F9]"></div>
                 <h4 className="text-3xl md:text-6xl font-black uppercase italic tracking-tighter text-slate-900 leading-none">THE SHARED <br/><span className="text-[#FFD8BE]">PULSE.</span></h4>
                 <p className="text-lg md:text-3xl text-slate-700 font-bold leading-relaxed italic px-4">
                    "Do you remember the sound of a basketball bouncing on dry asphalt at 5:00 AM? That's the rhythm of anyone who wants to be Amazing. Whether you're holding a ball or a dream, we are built the same."
                 </p>
                 <div className="pt-8">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">EST. 2018 / NAX</span>
                 </div>
              </div>

              <div className="grid md:grid-cols-2 gap-16 md:gap-32 items-center">
                 <div className="md:order-2 space-y-12 animate-fade-up">
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-[#E2D1F9]">02 / THE DESIGN</span>
                    <h3 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">AESTHETIC <br/>ENDURANCE.</h3>
                    <p className="text-xl md:text-2xl text-slate-600 font-medium italic leading-relaxed">
                       "We blend tech-pastels with heavy-duty construction. Grace meets absolute power. Soft colors, hard grit."
                    </p>
                 </div>
                 <div className="md:order-1 relative group">
                    <div className="aspect-[4/5] rounded-[3rem] md:rounded-[5rem] overflow-hidden border-8 md:border-[20px] border-white shadow-4xl transform rotate-3 hover:rotate-0 transition-all duration-1000">
                       <img src="./assets/colection .jpeg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3000ms]" alt="Design" />
                    </div>
                 </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="relative z-10 bg-slate-950 text-white overflow-hidden pt-20 md:pt-32 pb-20 font-inter">
        <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-soft-light">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1533038595180-20f0613d290c?q=80&w=2000')] bg-cover bg-center grayscale filter contrast-150 brightness-75"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/20"></div>
        </div>

        <div className="absolute top-10 right-5 md:top-20 md:right-32 w-24 h-24 md:w-32 md:h-32 opacity-20 hover:opacity-100 transition-opacity duration-1000 pointer-events-none group">
           <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
             <path id="circlePath" fill="none" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0 " />
             <text className="text-[8px] font-black uppercase tracking-[0.2em] fill-white">
                <textPath xlinkHref="#circlePath">CERTIFIED VISIONARY • KIJANA AMAZING • WORLDWIDE NODE • GRIT ROOTED •</textPath>
             </text>
           </svg>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-end mb-20 md:mb-32">
             <div className="space-y-8 md:space-y-12">
              <div className="flex items-center gap-2 pl-4 md:pl-6">
                                <img
                                  src="/assets/kijana awesome .png"
                                  alt="Kijana Amazing Logo"
                                  className="w-10 h-10 md:w-12 md:h-12"
                                />
                              </div>

                <h3 className="text-6xl md:text-9xl font-bangers uppercase tracking-tight leading-[0.85]">ROOTED IN <br/>THE VISION.</h3>
                <div className="flex gap-3 md:gap-4">
                   <a href="https://wa.me/254746129446" target="_blank" rel="noopener noreferrer" className="p-4 md:p-5 bg-white/5 rounded-full border border-white/10 hover:bg-[#25D366] hover:text-white transition-all duration-500 shadow-lg">
                      <WhatsAppIcon />
                   </a>
                   <a href="https://tiktok.com/@kijanaamazing" target="_blank" rel="noopener noreferrer" className="p-4 md:p-5 bg-white/5 rounded-full border border-white/10 hover:bg-[#E2D1F9] hover:text-slate-950 transition-all duration-500 shadow-lg">
                      <TikTokIcon />
                   </a>
                   <a href="https://instagram.com/kijanaamazing" target="_blank" rel="noopener noreferrer" className="p-4 md:p-5 bg-white/5 rounded-full border border-white/10 hover:bg-[#FFD8BE] hover:text-slate-950 transition-all duration-500 shadow-lg">
                      <InstagramIcon />
                   </a>
                </div>
             </div>

             <div className="bg-white/5 backdrop-blur-3xl p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] border border-white/10 shadow-4xl group transition-all duration-700 hover:bg-white/10 min-h-[250px] md:min-h-[300px] flex flex-col justify-center">
                {protocolStatus === 'authenticated' ? (
                  <div className="animate-reveal-up text-center sm:text-left">
                     <div className="flex items-center gap-3 mb-4 md:mb-6">
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-[#FFD8BE] rounded-full animate-pulse shadow-[0_0_15px_#FFD8BE]"></div>
                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-[#FFD8BE]">Status: Movement Locked</span>
                     </div>
                     <h4 className="text-3xl md:text-6xl font-bangers uppercase tracking-widest leading-none mb-4 md:mb-6 italic">UPLINK ESTABLISHED.</h4>
                     <p className="text-white/40 font-mono text-[9px] md:text-[10px] uppercase tracking-widest leading-loose mb-6 md:mb-8">
                        {" >> ID_VERIFIED: GUEST_V1"}<br/>
                        {" >> SIGNAL: CRITICAL_DROP"}

                     </p>
                     <Button onClick={() => window.open('https://wa.me/254746129446', '_blank')} className="w-full sm:w-auto bg-[#FFD8BE] text-slate-950 px-8 py-4">Join Inner Circle</Button>
                  </div>
                ) : (
                  <>
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em] text-[#FFD8BE] mb-4 md:mb-6 block">Protocol Initialization</span>
                    <h4 className="text-3xl md:text-6xl font-bangers uppercase tracking-tight mb-6 md:mb-8 leading-none">MOVEMENT UPLINK.</h4>
                    <p className="text-white/40 text-base md:text-lg font-playfair italic mb-8 md:mb-10 leading-relaxed">Join the visionary community. Nairobi based, Nakuru forged.</p>
                    <div className="flex items-center">
                       <button onClick={handleProtocolIntercept} disabled={protocolStatus === 'intercepting'} className="bg-white text-slate-950 w-full sm:w-auto px-10 py-5 rounded-full font-black uppercase text-[10px] md:text-[11px] tracking-[0.3em] hover:bg-[#FFD8BE] transition-all relative overflow-hidden group/node">
                         <div className="absolute inset-0 bg-[#FFD8BE] scale-x-0 group-hover/node:scale-x-100 origin-left transition-transform duration-500 z-0"></div>
                         <span className="relative z-10 group-hover/node:text-slate-950">
                           {protocolStatus === 'intercepting' ? 'Initializing Sync...' : 'Join the Inner Circle'}
                         </span>
                       </button>
                    </div>
                  </>
                )}
             </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16 pt-12 md:pt-16 border-t border-white/10">
             <div>
                <h5 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 mb-6 md:mb-8 italic">Navigate The Vault</h5>
                <ul className="grid grid-cols-2 gap-y-3 md:gap-y-4">
                   {['Shop Drops', 'Custom Lab', 'Our Story', 'Legacy Comms', 'Lookbook Archive'].map(l => (
                     <li key={l} onClick={() => {
                        if (l === 'Shop Drops') navigateTo('shop');
                        else if (l === 'Custom Lab') navigateTo('custom');
                        else if (l === 'Our Story') navigateTo('about');
                        else if (l === 'Lookbook Archive') navigateTo('lookbook');
                     }} className="text-[11px] md:text-sm font-black uppercase tracking-widest hover:text-[#FFD8BE] cursor-pointer transition-colors flex items-center gap-3 group/link">
                        <span className="w-1 md:w-1.5 h-1 md:h-1.5 bg-[#FFD8BE] rounded-full opacity-0 group-hover/link:opacity-100 transition-opacity"></span>{l}
                     </li>
                   ))}
                </ul>
             </div>
             <div className="flex flex-col md:items-end md:text-right">
                <h5 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 mb-6 md:mb-8 italic">Global Comms</h5>
                <p className="text-[11px] md:text-sm font-black uppercase tracking-widest text-white/60 mb-2">WHATSAPP_LINE</p>
                <p className="text-xl md:text-2xl font-bold italic text-[#FFD8BE] uppercase tracking-tighter hover:scale-105 transition-transform cursor-pointer">
                  <a href="https://wa.me/254746129446" target="_blank" rel="noopener noreferrer">+254 746 129 446</a>
                </p>
                <p className="text-[8px] md:text-[10px] text-white/20 mt-4 font-mono uppercase tracking-widest">NAIROBI, KENYA [254_NRB]<br/>FORGED_IN_NAX</p>
             </div>
          </div>
        </div>

        <div className="mt-20 md:mt-32 border-y border-white/5 py-6 md:py-8 overflow-hidden whitespace-nowrap bg-white/[0.02]">
           <div className="flex animate-marquee-fast text-[8px] md:text-[10px] font-black uppercase tracking-[1em] text-white/20 italic">
              {[...Array(8)].map((_, i) => (
                <span key={i} className="mx-8 md:mx-10">KIJANA AMAZING • FORGED IN NAX • EST. 2018 • AESTHETIC ENDURANCE • ROOTED IN GRIT • FORGED FOR VISIONARIES • NO PHYSICAL STORE •</span>
              ))}
           </div>
        </div>
        
        <div className="container mx-auto px-6 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 opacity-20">
           <p className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.4em]">© 2025 KIJANA AMAZING. FORGED IN NAX, KENYA.</p>
           <div className="flex gap-6 md:gap-8 text-[7px] md:text-[8px] font-black uppercase tracking-[0.4em]">
              <span className="cursor-pointer hover:text-white transition-colors">Privacy_Protocol</span>
              <span className="cursor-pointer hover:text-white transition-colors">Service_Terms</span>
           </div>
        </div>
      </footer>

      <WhatsAppButton />
      
      {/* Gemini Stylist Chatbot */}
      <div className={`fixed bottom-8 right-8 z-[70] flex flex-col items-end gap-4 font-inter`}>
         {chatOpen && (
           <div className="w-[90vw] max-w-md h-[450px] md:h-[500px] bg-white rounded-[2rem] md:rounded-[3rem] shadow-4xl border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10">
              <div className="p-6 md:p-8 bg-slate-900 text-white flex justify-between items-center">
                 <div><h3 className="font-bangers uppercase tracking-widest text-sm md:text-lg leading-none">Kijana Stylist</h3><p className="text-[8px] md:text-[9px] uppercase tracking-widest opacity-60">AI Fashion consultant</p></div>
                 <button onClick={() => setChatOpen(false)} className="opacity-60 hover:opacity-100 text-white focus:outline-none"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" /></svg></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-slate-50">
                {chatMessages.length === 0 && <p className="text-center text-slate-400 font-bold italic text-xs md:text-sm mt-10">"Ask me about your next vision..."</p>}
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-up`}>
                    <div className={`max-w-[85%] p-4 md:p-5 rounded-2xl md:rounded-[2rem] text-xs md:text-sm font-medium italic leading-relaxed ${msg.role === 'user' ? 'bg-[#FFD8BE] text-slate-900 rounded-br-none shadow-md' : 'bg-white shadow-md text-slate-600 rounded-bl-none'}`}>{msg.text}</div>
                  </div>
                ))}
                {isTyping && <div className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-300 animate-pulse">Stylist is contemplating...</div>}
              </div>
              <form onSubmit={handleChatSubmit} className="p-4 md:p-6 bg-white border-t flex gap-3 md:gap-4">
                <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Ask for advice..." className="flex-1 bg-slate-100 rounded-full px-5 md:px-6 py-3 md:py-4 text-xs md:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#FFD8BE] text-slate-900" />
                <button type="submit" className="w-10 h-10 md:w-12 md:h-12 bg-slate-900 rounded-full flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform"><svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" /></svg></button>
              </form>
           </div>
         )}
         <div className={`transition-all duration-300 ${chatOpen ? 'scale-0' : 'scale-100'}`}>
            <button onClick={() => setChatOpen(true)} className="w-14 h-14 md:w-20 md:h-20 bg-slate-900 rounded-full flex items-center justify-center text-white shadow-4xl hover:scale-110 active:scale-90 animate-bounce-slow">
              <span className="text-xl md:text-2xl transition-transform" aria-hidden="true">⛹️‍♂️</span>
            </button>
         </div>
      </div>

      <style>{`
        @keyframes blob { 0% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(60px, -80px) scale(1.2); } 66% { transform: translate(-40px, 40px) scale(0.9); } 100% { transform: translate(0px, 0px) scale(1); } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }
        @keyframes marquee-fast { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes sticker-float { 0% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-30px) rotate(10deg); } 100% { transform: translateY(0) rotate(0deg); } }
        @keyframes grit-float { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-15px) rotate(1deg); } }
        @keyframes scan { 0% { transform: translateY(0); opacity: 0; } 50% { opacity: 0.5; } 100% { transform: translateY(100%); opacity: 0; } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-slow-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .perspective-1000 { perspective: 1000px; }
        .animate-spin-slow { animation: spin-slow 15s linear infinite; }
        .animate-spin-slow-reverse { animation: spin-slow-reverse 10s linear infinite; }
        .shadow-glow { box-shadow: 0 0 30px rgba(255, 216, 190, 0.1); }
        .shadow-glow-white { box-shadow: 0 0 30px rgba(255, 255, 255, 0.2); }
        .animate-blob { animation: blob 25s infinite alternate ease-in-out; }
        .animate-marquee { animation: marquee 40s linear infinite; }
        .animate-marquee-fast { animation: marquee-fast 15s linear infinite; }
        .animate-sticker-float { animation: sticker-float 8s infinite ease-in-out; }
        .animate-scan { animation: scan 3s linear infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        @keyframes reveal-up { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes fade-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes glow { 0%, 100% { box-shadow: 0 0 15px rgba(37, 211, 102, 0.4); } 50% { box-shadow: 0 0 45px rgba(37, 211, 102, 0.9); } }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(-12%); } 50% { transform: translateY(0); } }
        @keyframes slow-zoom { from { transform: scale(1); } to { transform: scale(1.15); } }
        .animate-reveal-up { animation: reveal-up 1.4s cubic-bezier(0.2, 1, 0.3, 1) forwards; }
        .animate-fade-up { animation: fade-up 0.8s cubic-bezier(0.2, 1, 0.3, 1) forwards; }
        .animate-glow { animation: glow 2.5s infinite ease-in-out; }
        .animate-bounce-slow { animation: bounce-slow 3.5s infinite ease-in-out; }
        .animate-slow-zoom { animation: slow-zoom 35s alternate infinite ease-in-out; }
        .shadow-4xl { filter: drop-shadow(0 50px 100px rgba(0, 0, 0, 0.1)); }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: #FFD8BE; border-radius: 10px; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        
        /* Masonry Grid Handling */
        .break-inside-avoid {
          break-inside: avoid-column;
          -webkit-column-break-inside: avoid;
        }
      `}</style>
    </div>
  );
};

export default App;
