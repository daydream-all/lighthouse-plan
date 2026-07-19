import { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Building2, Briefcase, GraduationCap, CheckCircle2, ArrowRight } from 'lucide-react';
import { useUserStore } from '@/store/useUserStore';
import { Link } from 'wouter';

const PATHS = [
  {
    id: 'enterprise',
    title: '企业求职',
    icon: <Briefcase className="h-5 w-5" />,
    matchScore: 92,
    color: 'text-brand-teal',
    bgColor: 'bg-brand-teal/10',
    pros: ['高成长性与薪资天花板', '技术应用落地快', '工作节奏紧凑充实'],
    cons: ['竞争激烈，需持续学习', '存在一定年龄焦虑'],
    milestones: [
      { time: '大三上', desc: '确定目标岗位，完成1个核心项目' },
      { time: '大三下', desc: '投递日常实习，刷LeetCode/准备面试' },
      { time: '大四上', desc: '参加秋招，争取大厂Offer' }
    ]
  },
  {
    id: 'postgrad',
    title: '国内考研',
    icon: <BookOpen className="h-5 w-5" />,
    matchScore: 75,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    pros: ['提升学历，增加大厂敲门砖', '有更多时间缓冲和试错', '可深入研究某一领域'],
    cons: ['备考压力大，机会成本高', '研究方向可能与业务脱节'],
    milestones: [
      { time: '大三上', desc: '确定报考院校及专业，收集资料' },
      { time: '大三下', desc: '进入第一轮全面复习' },
      { time: '大四上', desc: '冲刺阶段，参加12月统考' }
    ]
  },
  {
    id: 'abroad',
    title: '出国留学',
    icon: <GraduationCap className="h-5 w-5" />,
    matchScore: 68,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    pros: ['拓宽国际视野', '学制相对较短', '体验不同文化'],
    cons: ['经济成本高', '申请过程繁琐'],
    milestones: [
      { time: '大三上', desc: '准备语言考试(雅思/托福)' },
      { time: '大三下', desc: '提升GPA，找推荐人，准备文书' },
      { time: '大四上', desc: '递交申请材料，等待Offer' }
    ]
  },
  {
    id: 'civil',
    title: '考公/国企',
    icon: <Building2 className="h-5 w-5" />,
    matchScore: 55,
    color: 'text-brand-gold',
    bgColor: 'bg-brand-gold/10',
    pros: ['稳定性极高，福利保障好', '工作生活平衡较好', '社会认可度高'],
    cons: ['晋升慢，论资排辈', '工作内容可能较为机械'],
    milestones: [
      { time: '大三下', desc: '了解招考政策，准备行测申论' },
      { time: '大四上', desc: '参加国考/秋季国企招聘' },
      { time: '大四下', desc: '参加省考/春季国企招聘' }
    ]
  }
];

export default function Paths() {
  const { portrait } = useUserStore();
  const [activeTab, setActiveTab] = useState('enterprise');

  // If no portrait, sort normally. If portrait, we pretend we adjusted matchScores.
  const sortedPaths = [...PATHS].sort((a, b) => b.matchScore - a.matchScore);
  const bestMatch = sortedPaths[0];

  return (
    <AppShell>
      <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">职业路径对比</h1>
          <p className="text-muted-foreground mt-1">
            基于你的【{portrait?.title || '探索型实践者'}】画像，为你推荐最匹配的发展方向。
          </p>
        </div>

        {/* Best Match Highlight */}
        <Card className="border-none shadow-lg bg-gradient-to-r from-slate-900 to-slate-800 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
          <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle className="text-white/10 stroke-current" strokeWidth="8" cx="50" cy="50" r="40" fill="transparent" />
                <circle 
                  className="text-primary stroke-current" 
                  strokeWidth="8" strokeLinecap="round" cx="50" cy="50" r="40" fill="transparent" 
                  strokeDasharray="251.2" 
                  strokeDashoffset={251.2 - (251.2 * bestMatch.matchScore) / 100}
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-bold">{bestMatch.matchScore}%</span>
                <span className="text-[10px] text-white/70">匹配度</span>
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-medium mb-3">
                ⭐ 最佳推荐路径
              </div>
              <h2 className="text-3xl font-bold mb-3">{bestMatch.title}</h2>
              <p className="text-slate-300 mb-6 leading-relaxed">
                你的超强执行力和创新精神非常适合{bestMatch.title}环境。你能快速适应变化，在实战中学习，这将是你在竞争中脱颖而出的核心优势。
              </p>
              <Button asChild className="bg-primary hover:bg-primary/90 text-white rounded-full">
                <Link href="/plan">一键生成专属行动计划</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Comparison */}
        <div className="mt-12">
          <h3 className="text-xl font-bold mb-6">全路径详细对比</h3>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto p-1 mb-8">
              {sortedPaths.map(path => (
                <TabsTrigger 
                  key={path.id} 
                  value={path.id}
                  className="flex items-center gap-2 py-3 data-[state=active]:shadow-sm"
                >
                  <div className={`p-1.5 rounded-md ${path.bgColor} ${path.color}`}>
                    {path.icon}
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-semibold">{path.title}</span>
                    <span className="text-xs opacity-70">匹配度 {path.matchScore}%</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>

            {sortedPaths.map(path => (
              <TabsContent key={path.id} value={path.id} className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-6">
                    <Card className="shadow-sm">
                      <CardHeader className="pb-4 border-b">
                        <CardTitle className="text-lg">核心优劣势</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0 flex flex-col sm:flex-row">
                        <div className="flex-1 p-6 border-b sm:border-b-0 sm:border-r border-border bg-emerald-50/30">
                          <h4 className="font-semibold text-emerald-700 mb-4 flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">+</div> 
                            优势匹配点
                          </h4>
                          <ul className="space-y-3">
                            {path.pros.map((p, i) => (
                              <li key={i} className="flex gap-2 text-sm text-emerald-800/80">
                                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" /> {p}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex-1 p-6 bg-red-50/30">
                          <h4 className="font-semibold text-red-700 mb-4 flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">-</div> 
                            潜在挑战
                          </h4>
                          <ul className="space-y-3">
                            {path.cons.map((c, i) => (
                              <li key={i} className="flex gap-2 text-sm text-red-800/80">
                                <div className="w-4 h-4 shrink-0 rounded-full bg-red-200 mt-0.5" /> {c}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-sm">
                      <CardHeader className="pb-3 border-b">
                        <CardTitle className="text-lg">关键时间节点</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-muted before:to-transparent">
                          {path.milestones.map((m, i) => (
                            <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-xs font-bold">
                                {i+1}
                              </div>
                              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border bg-card shadow-sm group-hover:border-primary/50 transition-colors">
                                <div className="font-bold text-primary mb-1">{m.time}</div>
                                <div className="text-sm text-muted-foreground">{m.desc}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="md:col-span-1 space-y-6">
                    <Card className="shadow-sm bg-primary/5 border-primary/20">
                      <CardHeader>
                        <CardTitle className="text-lg text-primary">选择此路径</CardTitle>
                        <CardDescription>生成具体的周度可执行计划，并同步至任务管理器。</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full shadow-md" asChild>
                           <Link href="/plan">生成详细计划 <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </AppShell>
  );
}
