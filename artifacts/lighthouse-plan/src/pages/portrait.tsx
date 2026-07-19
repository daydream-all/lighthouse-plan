import { useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import { AppShell } from '@/components/layout/AppShell';
import { useUserStore } from '@/store/useUserStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Download, Share2, Sparkles, Brain, Briefcase, Zap, ArrowRight, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Portrait() {
  const { portrait } = useUserStore();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!portrait) {
      setLocation('/assessment');
    }
  }, [portrait, setLocation]);

  if (!portrait) return null;

  const radarData = [
    { subject: '学术能力', A: portrait.scores.academic, fullMark: 100 },
    { subject: '创新力', A: portrait.scores.innovation, fullMark: 100 },
    { subject: '执行力', A: portrait.scores.execution, fullMark: 100 },
    { subject: '抗压力', A: portrait.scores.pressure, fullMark: 100 },
    { subject: '社交力', A: portrait.scores.social, fullMark: 100 },
    { subject: '领导力', A: portrait.scores.leadership, fullMark: 100 },
  ];

  const MotionCard = motion(Card);

  return (
    <AppShell>
      <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">你的专属成长画像</h1>
            <p className="text-muted-foreground mt-1">基于AI对话与科学测评生成，匹配度 <span className="font-bold text-brand-teal">{portrait.reliability}%</span></p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Share2 size={16} /> 分享
            </Button>
            <Button variant="outline" className="gap-2">
              <Download size={16} /> 导出报告
            </Button>
            <Button asChild className="gap-2">
              <Link href="/paths">查看职业路径</Link>
            </Button>
          </div>
        </div>

        {/* Hero Result */}
        <MotionCard 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-none shadow-lg bg-gradient-to-br from-primary to-primary/80 text-white overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -mr-20 -mt-20" />
          <CardContent className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 relative z-10">
            <div className="w-32 h-32 md:w-48 md:h-48 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center shrink-0 shadow-2xl">
              <Sparkles className="w-16 h-16 md:w-24 md:h-24 text-brand-gold drop-shadow-lg" />
            </div>
            
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium mb-4 backdrop-blur-sm">
                <Brain size={14} /> 核心人格类型
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4">{portrait.title}</h2>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                {portrait.traits.map((trait, i) => (
                  <span key={i} className="px-3 py-1.5 bg-black/10 rounded-md text-sm font-medium border border-white/10">
                    {trait}
                  </span>
                ))}
              </div>
              <p className="text-primary-foreground/90 text-lg max-w-xl leading-relaxed">
                你拥有将想法转化为现实的强大驱动力。在面对不确定性时，比起按部就班，你更倾向于通过实践和试错来找到答案。
              </p>
            </div>
          </CardContent>
        </MotionCard>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Radar Chart */}
          <MotionCard 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="shadow-md"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="text-primary h-5 w-5" /> 能力雷达图
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 12, fontWeight: 500 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                      name="能力值"
                      dataKey="A"
                      stroke="hsl(209, 80%, 49%)"
                      strokeWidth={2}
                      fill="hsl(209, 80%, 49%)"
                      fillOpacity={0.3}
                      isAnimationActive={true}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </MotionCard>

          {/* Details */}
          <div className="space-y-8">
            <MotionCard 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="shadow-md border-t-4 border-t-brand-teal"
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Briefcase className="text-brand-teal h-5 w-5" /> 理想发展环境
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {portrait.environment}
                </p>
              </CardContent>
            </MotionCard>

            <MotionCard 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="shadow-md border-t-4 border-t-brand-gold"
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="text-brand-gold h-5 w-5" /> 潜在矛盾点
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {portrait.contradictions.map((item, i) => (
                    <li key={i} className="flex gap-3 text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </MotionCard>
          </div>
        </div>

        {/* Strategies */}
        <MotionCard 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="shadow-md bg-muted/30 border-dashed"
        >
          <CardHeader>
            <CardTitle>核心学习策略建议</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {portrait.strategies.map((strategy, i) => (
                <div key={i} className="bg-white p-5 rounded-xl shadow-sm border relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary/40 group-hover:bg-primary transition-colors" />
                  <div className="text-3xl font-black text-muted/30 absolute right-4 top-4 select-none">0{i+1}</div>
                  <p className="font-medium mt-6 relative z-10">{strategy}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Button size="lg" className="px-8 shadow-md" asChild>
                <Link href="/paths">匹配我的职业路径 <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </CardContent>
        </MotionCard>

      </div>
    </AppShell>
  );
}
