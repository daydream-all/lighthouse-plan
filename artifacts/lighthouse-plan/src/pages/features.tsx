import { AppShell } from '@/components/layout/AppShell';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Compass, Target, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function Features() {
  const features = [
    {
      icon: <Compass className="w-10 h-10 text-primary" />,
      title: "AI 深度对话引擎",
      desc: "不再是冷冰冰的问卷。我们的AI引航员通过自然对话层层递进，捕捉你真实的情绪和深层动机，比你更懂你自己。",
      bg: "bg-primary/5"
    },
    {
      icon: <Target className="w-10 h-10 text-brand-gold" />,
      title: "动态成长画像",
      desc: "结合对话与科学量表，多维度解析你的学术力、创新力、执行力等核心指标，生成专属成长雷达图与性格优势报告。",
      bg: "bg-brand-gold/5"
    },
    {
      icon: <Map className="w-10 h-10 text-brand-teal" />,
      title: "多路径智能推演",
      desc: "考研？考公？就业？输入你的画像，AI将为你演算各个路线的匹配度、优劣势，并标识出关键里程碑节点。",
      bg: "bg-brand-teal/5"
    },
    {
      icon: <Zap className="w-10 h-10 text-purple-500" />,
      title: "可执行任务拆解",
      desc: "拒绝空洞的建议。灯塔计划能将宏大目标拆解为以「周」为单位的具体行动清单，直达你的任务看板，并督促执行。",
      bg: "bg-purple-500/5"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="h-16 border-b bg-white flex items-center px-6">
        <Link href="/" className="font-bold text-lg flex items-center gap-2">
           <span className="text-xl">灯塔计划</span>
        </Link>
      </nav>
      
      <div className="pt-20 pb-32 max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">不只是测试，而是你的<span className="text-primary">数字大脑</span></h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            从迷茫期的倾听者，到决策期的参谋，再到执行期的督工。
            灯塔计划将前沿AI技术与大学生生涯规划深度融合。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <Card key={idx} className={`${feature.bg} border-none shadow-none hover:shadow-md transition-all duration-300`}>
              <CardContent className="p-8 md:p-12">
                <div className="mb-6 bg-white w-20 h-20 rounded-2xl flex items-center justify-center shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {feature.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-24 text-center">
          <Button size="lg" className="rounded-full px-12 h-14 text-lg" asChild>
            <Link href="/">返回首页体验</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
