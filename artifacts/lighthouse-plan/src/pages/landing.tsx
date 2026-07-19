import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowRight, Compass, Target, Map, ArrowUpRight, Play, CheckCircle2 } from 'lucide-react';
import { LighthouseLogo } from '@/components/LighthouseLogo';
import { useUserStore } from '@/store/useUserStore';
import { useLocation } from 'wouter';

export default function LandingPage() {
  const { loadDemoData } = useUserStore();
  const [, setLocation] = useLocation();

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
              专属中国大学生的AI成长引擎
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              在迷茫中找准 <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-brand-teal to-primary">你的航向</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto md:mx-0">
              打破千篇一律的职业规划。通过深度对话与科学测评，为你生成独一无二的成长画像，规划最适合你的大学发展路径。
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start pt-4">
              <Button size="lg" className="rounded-full px-8 h-14 text-base gap-2 w-full sm:w-auto shadow-lg shadow-primary/20" onClick={() => setLocation('/app')}>
                开始免费探索 <ArrowRight size={18} />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base gap-2 w-full sm:w-auto border-border bg-white" onClick={handleGuestDemo}>
                <Play size={18} className="text-brand-gold" /> 查看演示报告
              </Button>
            </div>
            
            <div className="flex items-center gap-4 justify-center md:justify-start text-sm text-muted-foreground pt-4">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-muted flex items-center justify-center text-xs overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}&backgroundColor=e2e8f0`} alt="avatar" />
                  </div>
                ))}
              </div>
              <p>已有 <span className="font-bold text-foreground">12,400+</span> 名大学生在这里找到方向</p>
            </div>
          </div>
          
          <div className="flex-1 relative w-full max-w-[500px] aspect-square">
            {/* Lighthouse Animation SVG */}
            <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl border flex items-center justify-center p-8 relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
              
              <svg viewBox="0 0 400 400" className="w-full h-full relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Lighthouse Body */}
                <path d="M170 320 L230 320 L210 120 L190 120 Z" fill="hsl(209, 80%, 49%)" />
                <path d="M190 120 L210 120 L205 90 L195 90 Z" fill="#F5A623" />
                {/* Light Dome */}
                <path d="M195 90 C 195 80, 205 80, 205 90" fill="#fff" stroke="#F5A623" strokeWidth="4" />
                {/* Base */}
                <path d="M150 320 C 150 310, 250 310, 250 320 L 250 350 L 150 350 Z" fill="hsl(220, 30%, 20%)" />
                {/* Waves */}
                <path d="M100 340 Q 125 320, 150 340 T 200 340 T 250 340 T 300 340" stroke="#00B5C8" strokeWidth="4" strokeLinecap="round" />
                <path d="M80 355 Q 115 335, 150 355 T 220 355 T 290 355 T 320 355" stroke="hsl(209, 80%, 49%)" strokeWidth="6" strokeLinecap="round" />
                {/* Light Beam */}
                <g className="animate-sweep">
                  <path d="M200 100 L 50 0 L 350 0 Z" fill="url(#beam-gradient)" opacity="0.8" />
                </g>
                <defs>
                  <linearGradient id="beam-gradient" x1="200" y1="100" x2="200" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F5A623" stopOpacity="0.6"/>
                    <stop offset="1" stopColor="#F5A623" stopOpacity="0"/>
                  </linearGradient>
                </defs>
              </svg>

              {/* Floating Cards */}
              <div className="absolute top-12 -left-6 bg-white p-3 rounded-xl shadow-lg border animate-bounce" style={{animationDuration: '3s'}}>
                <div className="text-xs font-bold text-primary mb-1">AI 测评分析</div>
                <div className="flex gap-1">
                  <div className="w-12 h-1 bg-primary/20 rounded-full"><div className="w-3/4 h-full bg-primary rounded-full" /></div>
                  <div className="w-12 h-1 bg-brand-teal/20 rounded-full"><div className="w-full h-full bg-brand-teal rounded-full" /></div>
                </div>
              </div>

              <div className="absolute bottom-24 -right-4 bg-white p-3 rounded-xl shadow-lg border flex items-center gap-2 animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}}>
                <CheckCircle2 size={16} className="text-green-500" />
                <span className="text-xs font-medium">找到行动方向</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">三步清晰规划你的大学生活</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">不只是冰冷的测试题，而是一次深度的自我对话。</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Compass size={32} className="text-primary" />,
                title: "1. 深度对话引航",
                desc: "AI引航员通过自然的聊天，了解你的困惑、兴趣和现状，为你建立基础档案。"
              },
              {
                icon: <Target size={32} className="text-brand-gold" />,
                title: "2. 科学成长测评",
                desc: "基于对话结果推荐专属测评，多维度解析你的能力雷达图，生成深度成长画像。"
              },
              {
                icon: <Map size={32} className="text-brand-teal" />,
                title: "3. 专属路径规划",
                desc: "对比不同出路（考研/就业/考公），生成具体的学期行动计划并拆解为可执行任务。"
              }
            ].map((step, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border shadow-sm hover:shadow-md transition-shadow relative">
                <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                {i < 2 && (
                  <ArrowUpRight className="hidden md:block absolute top-1/2 -right-6 text-muted-foreground/30 h-8 w-8 -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">准备好点亮你的灯塔了吗？</h2>
          <p className="text-xl text-muted-foreground mb-10">
            已有超过1万名大学生在这里找到了属于自己的方向。加入他们，开始你的蜕变之旅。
          </p>
          <Button size="lg" className="rounded-full px-12 h-14 text-lg gap-2 shadow-xl shadow-primary/25" onClick={() => setLocation('/app')}>
            立即免费加入 <ArrowRight size={20} />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-12 text-center text-muted-foreground">
        <div className="flex items-center justify-center gap-2 mb-4">
          <LighthouseLogo size={20} className="opacity-50" />
          <span className="font-semibold">灯塔计划 Lighthouse Plan</span>
        </div>
        <p className="text-sm">© 2024 灯塔计划. All rights reserved. 专为中国大学生打造的AI成长引擎。</p>
      </footer>
    </div>
  );
}
