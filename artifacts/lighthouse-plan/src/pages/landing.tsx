import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowRight, Compass, Target, Map, ArrowUpRight, Play, CheckCircle2, Quote, Sparkles, Heart } from 'lucide-react';
import { LighthouseLogo } from '@/components/LighthouseLogo';
import { useUserStore } from '@/store/useUserStore';
import { useLocation } from 'wouter';

const WORRIES = [
  '室友都知道要考研了，就我还没想好……',
  '投了好多简历，一个面试都没有',
  '家里让我考公，但我真的不知道自己适不适合',
  '大三了，感觉每天都在焦虑但什么也没做',
  '不知道自己的优势是什么，简历不知道怎么写',
  '出国、考研、工作，选哪个都感觉在赌',
  '看到别人都很厉害，我是不是已经晚了？',
];

export default function LandingPage() {
  const { loadDemoData } = useUserStore();
  const [, setLocation] = useLocation();
  const [worryIdx, setWorryIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setWorryIdx(i => (i + 1) % WORRIES.length);
        setFade(true);
      }, 400);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const handleGuestDemo = () => {
    loadDemoData();
    setLocation('/app');
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden selection:bg-primary/20">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b z-50">
        <div className="max-w-6xl mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LighthouseLogo size={32} showText />
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="/" className="text-foreground">首页</Link>
            <Link href="/features" className="hover:text-primary transition-colors">产品功能</Link>
            <a href="#testimonials" className="hover:text-primary transition-colors">用户评价</a>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden sm:inline-flex" onClick={handleGuestDemo}>
              游客体验
            </Button>
            <Button onClick={() => setLocation('/app')} className="gap-2 rounded-full px-6">
              开启成长 <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] bg-brand-gold/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[40%] bg-brand-teal/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 space-y-8 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              专属中国大学生的 AI 成长引擎
            </div>

            {/* Rotating worry strip */}
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 text-left max-w-lg mx-auto md:mx-0">
              <Heart size={16} className="text-amber-500 mt-0.5 shrink-0" />
              <p
                className="text-sm text-amber-800 leading-relaxed transition-opacity duration-400"
                style={{ opacity: fade ? 1 : 0 }}
              >
                「{WORRIES[worryIdx]}」
              </p>
            </div>
            <p className="text-xs text-muted-foreground -mt-5 text-center md:text-left">↑ 这些声音，我们都听见了</p>
            
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              迷茫很正常，<br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-brand-teal to-primary">找到方向才是关键</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto md:mx-0">
              不是又一份千篇一律的测评表。灯塔计划先听你说话，再帮你看清楚自己——你适合什么路，下一步该怎么走。
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start pt-2">
              <Button size="lg" className="rounded-full px-8 h-14 text-base gap-2 w-full sm:w-auto shadow-lg shadow-primary/20" onClick={() => setLocation('/app')}>
                开始免费探索 <ArrowRight size={18} />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base gap-2 w-full sm:w-auto border-border bg-white" onClick={handleGuestDemo}>
                <Play size={18} className="text-brand-gold" /> 先看一份示例报告
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center md:text-left">无需注册，3 分钟了解你的专属成长方向</p>
            
            <div className="flex items-center gap-4 justify-center md:justify-start text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-muted flex items-center justify-center text-xs overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}&backgroundColor=e2e8f0`} alt="avatar" />
                  </div>
                ))}
              </div>
              <p>已有 <span className="font-bold text-foreground">12,400+</span> 名同学在这里找到了方向</p>
            </div>
          </div>
          
          <div className="flex-1 relative w-full max-w-[500px] aspect-square">
            {/* Hero Lighthouse Illustration */}
            <div className="absolute inset-0 rounded-3xl shadow-2xl overflow-hidden border border-blue-100">
              <svg viewBox="0 0 480 480" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="hero-sky" cx="50%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#C8E8FF" />
                    <stop offset="45%" stopColor="#5EB3F5" />
                    <stop offset="100%" stopColor="#1A6EC2" />
                  </radialGradient>
                  <linearGradient id="hero-sea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2B8FE8" />
                    <stop offset="100%" stopColor="#0F4FA0" />
                  </linearGradient>
                  <radialGradient id="hero-beam-c" cx="50%" cy="100%" r="100%">
                    <stop offset="0%" stopColor="#FFFBE0" stopOpacity="0.98" />
                    <stop offset="55%" stopColor="#FFE47A" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#FFC845" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="hero-beam-l" cx="100%" cy="100%" r="100%">
                    <stop offset="0%" stopColor="#FFFBE0" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#FFD060" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="hero-beam-r" cx="0%" cy="100%" r="100%">
                    <stop offset="0%" stopColor="#FFFBE0" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#FFD060" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="hero-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFFBE0" stopOpacity="1" />
                    <stop offset="40%" stopColor="#FFE47A" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#FFC845" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="hero-road" x1="0.5" y1="0" x2="0.5" y2="1">
                    <stop offset="0%" stopColor="#D6EEFF" />
                    <stop offset="60%" stopColor="#A8D4F5" />
                    <stop offset="100%" stopColor="#7ABDE8" />
                  </linearGradient>
                  <linearGradient id="hero-tower" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#D8EEFF" />
                    <stop offset="50%" stopColor="#F0F8FF" />
                    <stop offset="100%" stopColor="#BDD8F5" />
                  </linearGradient>
                  <filter id="hero-glow-filter" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                </defs>

                {/* Sky background */}
                <rect width="480" height="480" fill="url(#hero-sky)" />

                {/* Distant clouds */}
                <ellipse cx="80" cy="120" rx="55" ry="18" fill="white" opacity="0.35" />
                <ellipse cx="110" cy="110" rx="40" ry="14" fill="white" opacity="0.3" />
                <ellipse cx="380" cy="100" rx="60" ry="20" fill="white" opacity="0.3" />
                <ellipse cx="410" cy="90" rx="40" ry="14" fill="white" opacity="0.25" />

                {/* Horizon sun glow */}
                <ellipse cx="240" cy="270" rx="110" ry="38" fill="#FFF8D0" opacity="0.6" />
                <ellipse cx="240" cy="270" rx="65" ry="22" fill="#FFF0A0" opacity="0.65" />

                {/* City skyline silhouette */}
                <g fill="#1558A8" opacity="0.28">
                  <rect x="20"  y="258" width="18" height="30" />
                  <rect x="16"  y="248" width="12" height="40" />
                  <rect x="38"  y="262" width="14" height="26" />
                  <rect x="54"  y="254" width="12" height="34" />
                  <rect x="68"  y="260" width="16" height="28" />
                  <rect x="86"  y="265" width="10" height="23" />
                  <rect x="370" y="256" width="18" height="32" />
                  <rect x="388" y="248" width="14" height="40" />
                  <rect x="404" y="258" width="20" height="30" />
                  <rect x="426" y="252" width="16" height="36" />
                  <rect x="444" y="260" width="14" height="28" />
                </g>

                {/* Sea */}
                <rect x="0" y="300" width="480" height="180" fill="url(#hero-sea)" />

                {/* Winding path — left branch */}
                <path d="M240 305 C 235 295, 210 285, 190 310 C 168 338, 140 370, 80 410" stroke="url(#hero-road)" strokeWidth="16" strokeLinecap="round" fill="none" opacity="0.7" />
                {/* Winding path — right branch */}
                <path d="M240 305 C 245 295, 270 285, 290 310 C 312 338, 340 370, 400 410" stroke="url(#hero-road)" strokeWidth="16" strokeLinecap="round" fill="none" opacity="0.7" />
                {/* Path sparkle dots */}
                <circle cx="195" cy="316" r="4" fill="#FFE060" opacity="0.9" />
                <circle cx="172" cy="340" r="3.2" fill="#FFE060" opacity="0.8" />
                <circle cx="148" cy="368" r="2.8" fill="#FFE060" opacity="0.7" />
                <circle cx="285" cy="316" r="4" fill="#FFE060" opacity="0.9" />
                <circle cx="308" cy="340" r="3.2" fill="#FFE060" opacity="0.8" />
                <circle cx="332" cy="368" r="2.8" fill="#FFE060" opacity="0.7" />

                {/* ── CSS keyframe animations ── */}
                <style>{`
                  @keyframes lh-sweep {
                    0%   { transform: rotate(-52deg); }
                    45%  { transform: rotate(52deg);  }
                    50%  { transform: rotate(52deg);  }
                    95%  { transform: rotate(-52deg); }
                    100% { transform: rotate(-52deg); }
                  }
                  @keyframes lh-sweep2 {
                    0%   { transform: rotate(-52deg); opacity: 0.55; }
                    20%  { opacity: 0.25; }
                    45%  { transform: rotate(52deg); opacity: 0.55; }
                    50%  { transform: rotate(52deg); opacity: 0.55; }
                    70%  { opacity: 0.25; }
                    95%  { transform: rotate(-52deg); opacity: 0.55; }
                    100% { transform: rotate(-52deg); opacity: 0.55; }
                  }
                  @keyframes lh-pulse {
                    0%,100% { opacity: 0.85; r: 18; }
                    50%     { opacity: 1;    r: 26; }
                  }
                  @keyframes lh-ring1 {
                    0%   { r: 14; opacity: 0.9; }
                    100% { r: 72; opacity: 0;   }
                  }
                  @keyframes lh-ring2 {
                    0%   { r: 14; opacity: 0.7; }
                    100% { r: 72; opacity: 0;   }
                  }
                  @keyframes lh-ring3 {
                    0%   { r: 14; opacity: 0.5; }
                    100% { r: 72; opacity: 0;   }
                  }
                  @keyframes lh-reflect {
                    0%   { transform: rotate(-52deg); opacity: 0.3; }
                    45%  { transform: rotate(52deg);  opacity: 0.3; }
                    50%  { transform: rotate(52deg);  opacity: 0.3; }
                    95%  { transform: rotate(-52deg); opacity: 0.3; }
                    100% { transform: rotate(-52deg); opacity: 0.3; }
                  }
                `}</style>

                {/* ── Sweeping light beams (pivot = lamp position 240, 167) ── */}

                {/* Outer soft glow cone — sweeps with main beam */}
                <g style={{ transformOrigin: '240px 167px', animation: 'lh-sweep2 5s ease-in-out infinite' }}>
                  <path d="M240 167 L 30 -30 L 450 -30 Z"
                    fill="url(#hero-beam-c)" opacity="0.38" />
                </g>

                {/* Main sharp beam */}
                <g style={{ transformOrigin: '240px 167px', animation: 'lh-sweep 5s ease-in-out infinite' }}>
                  {/* Wide cone */}
                  <path d="M240 167 L 110 -10 L 370 -10 Z"
                    fill="url(#hero-beam-c)" opacity="0.82" />
                  {/* Bright core ray */}
                  <path d="M237 166 L 218 -10 L 262 -10 Z"
                    fill="#FFFEF0" opacity="0.95" />
                </g>

                {/* Trailing ghost beam (slight delay offset) */}
                <g style={{ transformOrigin: '240px 167px', animation: 'lh-sweep 5s ease-in-out infinite', animationDelay: '-0.35s' }}>
                  <path d="M240 167 L 130 0 L 350 0 Z"
                    fill="url(#hero-beam-c)" opacity="0.28" />
                </g>

                {/* Water surface reflection beam */}
                <g style={{ transformOrigin: '240px 310px', animation: 'lh-reflect 5s ease-in-out infinite' }}>
                  <path d="M240 310 L 80 480 L 400 480 Z"
                    fill="url(#hero-beam-c)" opacity="0.22" />
                </g>

                {/* ── Pulsing halo rings from lantern ── */}
                <circle cx="240" cy="167" r="14" fill="none" stroke="#FFE060" strokeWidth="3"
                  style={{ animation: 'lh-ring1 2.4s ease-out infinite' }} />
                <circle cx="240" cy="167" r="14" fill="none" stroke="#FFE060" strokeWidth="2"
                  style={{ animation: 'lh-ring2 2.4s ease-out infinite', animationDelay: '0.8s' }} />
                <circle cx="240" cy="167" r="14" fill="none" stroke="#FFC845" strokeWidth="1.5"
                  style={{ animation: 'lh-ring3 2.4s ease-out infinite', animationDelay: '1.6s' }} />

                {/* ── Lighthouse ── */}
                {/* Base platform */}
                <ellipse cx="240" cy="308" rx="46" ry="12" fill="#1558A8" opacity="0.55" />
                <rect x="200" y="298" width="80" height="16" rx="6" fill="#1E6EC8" />

                {/* Main tower body */}
                <path d="M214 298 L 266 298 L 256 168 L 224 168 Z" fill="url(#hero-tower)" />
                {/* Tower right-side shading */}
                <path d="M256 298 L 266 298 L 256 168 Z" fill="#B8D4F0" opacity="0.6" />
                {/* Horizontal band stripes */}
                <rect x="224" y="220" width="32" height="9" rx="1.5" fill="#4DA6F7" opacity="0.55" />
                <rect x="225" y="248" width="30" height="7" rx="1.5" fill="#4DA6F7" opacity="0.45" />
                <rect x="226" y="272" width="28" height="6" rx="1.5" fill="#4DA6F7" opacity="0.4" />
                <rect x="225" y="192" width="30" height="6" rx="1.5" fill="#4DA6F7" opacity="0.35" />

                {/* Lamp room housing */}
                <rect x="220" y="158" width="40" height="18" rx="5" fill="#2368C4" />
                <rect x="223" y="161" width="34" height="12" rx="3" fill="#FFF8D0" opacity="0.96" />

                {/* Roof */}
                <path d="M218 158 L 262 158 L 252 138 L 228 138 Z" fill="#1558A8" />
                {/* Finial pole */}
                <line x1="240" y1="138" x2="240" y2="126" stroke="#1558A8" strokeWidth="4" strokeLinecap="round" />
                {/* Finial orb */}
                <circle cx="240" cy="122" r="7" fill="#FFC845" filter="url(#hero-glow-filter)" />

                {/* Balcony railing */}
                <rect x="216" y="157" width="48" height="3" rx="1.5" fill="#EEF5FF" opacity="0.85" />

                {/* Lantern glow halo */}
                <ellipse cx="240" cy="167" rx="42" ry="20" fill="url(#hero-glow)" opacity="0.9">
                  <animate attributeName="opacity" values="0.9;1;0.7;1;0.9" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="rx" values="42;50;42" dur="2s" repeatCount="indefinite" />
                </ellipse>

                {/* ── Sea wave lines ── */}
                <path d="M30 322 Q 60 312, 90 322 T 150 322 T 210 322" stroke="#7BCEF5" strokeWidth="4" fill="none" opacity="0.6" strokeLinecap="round" />
                <path d="M270 322 Q 300 312, 330 322 T 390 322 T 450 322" stroke="#7BCEF5" strokeWidth="4" fill="none" opacity="0.6" strokeLinecap="round" />
                <path d="M10 345 Q 50 335, 90 345 T 170 345 T 250 345" stroke="#5BB8F0" strokeWidth="3" fill="none" opacity="0.4" strokeLinecap="round" />
                <path d="M230 345 Q 290 335, 350 345 T 470 345" stroke="#5BB8F0" strokeWidth="3" fill="none" opacity="0.4" strokeLinecap="round" />

                {/* ── Sparkle stars ── */}
                {/* Big top-left */}
                <g transform="translate(108, 72)">
                  <path d="M0,-10 L2.4,-2.4 L10,0 L2.4,2.4 L0,10 L-2.4,2.4 L-10,0 L-2.4,-2.4 Z" fill="#FFD86A">
                    <animateTransform attributeName="transform" type="scale" values="1;1.35;1" dur="2.2s" repeatCount="indefinite" additive="sum" />
                  </path>
                </g>
                {/* Big top-right */}
                <g transform="translate(372, 60)">
                  <path d="M0,-9 L2.1,-2.1 L9,0 L2.1,2.1 L0,9 L-2.1,2.1 L-9,0 L-2.1,-2.1 Z" fill="#FFD86A">
                    <animateTransform attributeName="transform" type="scale" values="1;1.4;1" dur="1.8s" repeatCount="indefinite" additive="sum" />
                  </path>
                </g>
                {/* Top center small */}
                <g transform="translate(240, 28)">
                  <path d="M0,-6 L1.4,-1.4 L6,0 L1.4,1.4 L0,6 L-1.4,1.4 L-6,0 L-1.4,-1.4 Z" fill="#FFF0A0">
                    <animateTransform attributeName="transform" type="scale" values="1;1.5;1" dur="2.8s" repeatCount="indefinite" additive="sum" />
                  </path>
                </g>
                {/* Small extras */}
                <g transform="translate(56, 148)">
                  <path d="M0,-5 L1.2,-1.2 L5,0 L1.2,1.2 L0,5 L-1.2,1.2 L-5,0 L-1.2,-1.2 Z" fill="#FFD86A" opacity="0.8">
                    <animateTransform attributeName="transform" type="scale" values="1;1.3;1" dur="3.2s" repeatCount="indefinite" additive="sum" />
                  </path>
                </g>
                <g transform="translate(424, 140)">
                  <path d="M0,-5 L1.2,-1.2 L5,0 L1.2,1.2 L0,5 L-1.2,1.2 L-5,0 L-1.2,-1.2 Z" fill="#FFD86A" opacity="0.8">
                    <animateTransform attributeName="transform" type="scale" values="1;1.3;1" dur="2.6s" repeatCount="indefinite" additive="sum" />
                  </path>
                </g>
                <g transform="translate(155, 38)">
                  <path d="M0,-4 L0.9,-0.9 L4,0 L0.9,0.9 L0,4 L-0.9,0.9 L-4,0 L-0.9,-0.9 Z" fill="#FFE090" opacity="0.7">
                    <animateTransform attributeName="transform" type="scale" values="1;1.4;1" dur="3.8s" repeatCount="indefinite" additive="sum" />
                  </path>
                </g>
                <g transform="translate(325, 44)">
                  <path d="M0,-4 L0.9,-0.9 L4,0 L0.9,0.9 L0,4 L-0.9,0.9 L-4,0 L-0.9,-0.9 Z" fill="#FFE090" opacity="0.7">
                    <animateTransform attributeName="transform" type="scale" values="1;1.4;1" dur="3.1s" repeatCount="indefinite" additive="sum" />
                  </path>
                </g>
              </svg>

              {/* Floating Cards */}
              <div className="absolute top-8 -left-4 bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-blue-100 animate-bounce" style={{animationDuration: '3s'}}>
                <div className="text-xs font-bold text-primary mb-1.5">AI 测评分析</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-muted-foreground w-8">执行力</span>
                    <div className="w-16 h-1.5 bg-primary/20 rounded-full"><div className="w-4/5 h-full bg-primary rounded-full" /></div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-muted-foreground w-8">创新力</span>
                    <div className="w-16 h-1.5 bg-amber-200 rounded-full"><div className="w-3/4 h-full bg-amber-400 rounded-full" /></div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-20 -right-4 bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-green-100 flex items-center gap-2 animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}}>
                <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                <span className="text-xs font-medium text-gray-700">找到行动方向</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain-point resonance strip */}
      <section className="py-14 bg-gradient-to-r from-blue-50 via-white to-teal-50 border-y">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-sm text-muted-foreground mb-8 font-medium tracking-wide uppercase">很多同学在灯塔计划前，都有过这些感受</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { emoji: '😮‍💨', text: '大三了，每天焦虑但不知道从哪里下手' },
              { emoji: '🤔', text: '考研还是工作？家里的想法跟我不一样' },
              { emoji: '😞', text: '简历投了几十份，感觉自己什么都不会' },
              { emoji: '😶', text: '不清楚自己的优势，也不知道喜欢什么' },
              { emoji: '😰', text: '室友都有规划了，就我还在原地踏步' },
              { emoji: '🌀', text: '每个方向都看起来可以，却又感觉都不对' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-blue-100 shadow-sm">
                <span className="text-xl shrink-0">{item.emoji}</span>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-primary font-semibold text-base">你不是一个人。迷茫是成长的起点，灯塔帮你把它变成方向。</p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">怎么用</p>
            <h2 className="text-3xl font-bold mb-4">三步，从迷茫到清晰</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">不是填表，不是刷题。是一次真正关于你自己的对话。</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Compass size={32} className="text-primary" />,
                step: '第一步',
                title: "先聊聊你现在的状态",
                desc: "AI 引航员不急着给建议，先听你说——你在困惑什么，你在意什么，你现在的生活是什么样的。没有标准答案，说真话就好。",
                tag: '约 5 分钟'
              },
              {
                icon: <Target size={32} className="text-brand-gold" />,
                step: '第二步',
                title: "了解真实的自己",
                desc: "根据你的对话，推荐一套专属测评。不是性格标签，是真正有用的能力画像：你的优势在哪，你适合什么节奏，你在意什么。",
                tag: '约 10 分钟'
              },
              {
                icon: <Map size={32} className="text-brand-teal" />,
                step: '第三步',
                title: "拿到你的专属行动路线",
                desc: "对比考研、就业、考公、出国等路径，算出你的匹配度，再把计划拆成本学期、下学期的具体行动——不是泛泛的建议，是能执行的清单。",
                tag: '终身可用'
              }
            ].map((step, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border shadow-sm hover:shadow-md transition-shadow relative group">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground">{step.tag}</span>
                </div>
                <p className="text-xs font-semibold text-primary/60 mb-1 tracking-wide uppercase">{step.step}</p>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{step.desc}</p>
                {i < 2 && (
                  <ArrowUpRight className="hidden md:block absolute top-1/2 -right-6 text-muted-foreground/30 h-8 w-8 -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">真实反馈</p>
            <h2 className="text-3xl font-bold mb-4">他们也曾和你一样迷茫</h2>
            <p className="text-muted-foreground">来自不同院校和专业的同学，在这里找到了属于自己的答案。</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                avatar: 5,
                name: '张同学',
                school: '某 985 大学 · 大三',
                major: '计算机专业',
                text: '做完测评才发现，我其实不排斥和人打交道，我以为自己只能搞技术。现在确定了走产品方向，整个人踏实多了。',
                highlight: '从"不知道要做什么"到有了明确方向',
              },
              {
                avatar: 8,
                name: '李同学',
                school: '某双非院校 · 大四',
                major: '汉语言文学',
                text: '家里一直催着考公，我自己其实想试试新媒体。引航员帮我把两条路都分析了一遍，我第一次觉得自己的想法是被认真对待的。',
                highlight: '找到了跟家人沟通的底气',
              },
              {
                avatar: 12,
                name: '王同学',
                school: '某 211 大学 · 大二',
                major: '经济学专业',
                text: '我很早就在用，大二就把大学四年的节奏大概规划出来了。不是死板的计划，是知道自己每个阶段该做什么、不慌。',
                highlight: '大二开始就有了清晰的四年规划',
              },
            ].map((t, i) => (
              <div key={i} className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border border-blue-100 flex flex-col gap-4">
                <Quote size={20} className="text-primary/30" />
                <p className="text-sm text-foreground leading-relaxed flex-1">"{t.text}"</p>
                <div className="pt-2 border-t border-blue-100">
                  <p className="text-xs font-semibold text-primary mb-1">✦ {t.highlight}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="w-9 h-9 rounded-full bg-muted border-2 border-white shadow-sm overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${t.avatar}&backgroundColor=dbeafe`} alt={t.name} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.school} · {t.major}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-teal-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-6">
            <Sparkles size={14} />
            完全免费，无需下载
          </div>
          <h2 className="text-4xl font-bold mb-5 leading-tight">
            你现在的迷茫，<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-brand-teal">可以是找到方向的起点</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-4 max-w-xl mx-auto leading-relaxed">
            不需要你"想清楚了再来"——带着你现在所有的疑问来就好。灯塔就是为了在你最模糊的时候，帮你看见前面的路。
          </p>
          <p className="text-sm text-muted-foreground mb-10">以灯塔之光 · 见未来之路</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full px-12 h-14 text-lg gap-2 shadow-xl shadow-primary/25" onClick={() => setLocation('/app')}>
              现在就开始 <ArrowRight size={20} />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base gap-2 border-blue-200 bg-white" onClick={handleGuestDemo}>
              <Play size={16} className="text-brand-gold" /> 先看示例
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-6">无需注册 · 3 分钟完成首次引航 · 数据仅保存在你的设备</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-muted-foreground text-sm">
          <div className="flex items-center gap-2">
            <LighthouseLogo size={22} showText />
          </div>
          <p>以灯塔之光 · 见未来之路</p>
          <p>© 2024 灯塔计划 · 专为中国大学生打造</p>
        </div>
      </footer>
    </div>
  );
}
