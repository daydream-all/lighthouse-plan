import { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Calendar, Target, Plus, Check, Download, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'wouter';

export default function Plan() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const { toast } = useToast();

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
      toast({
        title: "计划生成成功",
        description: "你的专属学期行动计划已就绪。",
      });
    }, 2000);
  };

  const planStages = [
    {
      stage: '大三下学期 (核心蓄力期)',
      goals: ['完成1个核心业务线项目', '熟练掌握React/Vue生态', '开始刷算法题积累'],
      tasks: [
        '重构个人博客，加入复杂状态管理',
        '每天完成2道LeetCode中等难度题目',
        '阅读《JavaScript高级程序设计》核心章节',
        '准备并投递至少5家互联网公司的日常实习'
      ]
    },
    {
      stage: '大四上学期 (冲刺收获期)',
      goals: ['参加秋招获取大厂Offer', '完成高质量毕业设计选题'],
      tasks: [
        '完善个人简历，突出实习/项目亮点',
        '每周进行1次模拟面试练习',
        '关注企业秋招提前批信息',
        '确定毕设课题并完成开题报告'
      ]
    }
  ];

  return (
    <AppShell>
      <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">AI专属行动计划</h1>
            <p className="text-muted-foreground mt-1">
              将宏大的职业目标，拆解为每一个切实可行的学期任务。
            </p>
          </div>
          {isGenerated && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm"><Download size={14} className="mr-2" /> 导出PDF</Button>
              <Button variant="outline" size="sm"><Share2 size={14} className="mr-2" /> 分享</Button>
            </div>
          )}
        </div>

        {!isGenerated && !isGenerating ? (
          <Card className="border-dashed border-2 bg-muted/30 text-center py-20 shadow-none">
            <CardContent className="flex flex-col items-center justify-center space-y-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <Calendar className="w-10 h-10 text-primary" />
              </div>
              <div className="max-w-md">
                <h3 className="text-xl font-bold mb-2">一键生成你的大学路线图</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  基于你的个人档案、心理画像和倾向路径，AI将为你定制未来1-2年的核心任务拆解。
                </p>
                <Button size="lg" onClick={handleGenerate} className="px-8 shadow-md rounded-full text-base">
                  <SparklesIcon className="mr-2 h-5 w-5" /> 立即生成专属计划
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : isGenerating ? (
          <Card className="border-none shadow-lg overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 animate-pulse" />
            <CardContent className="flex flex-col items-center justify-center py-20 relative z-10 space-y-6">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <div className="text-center">
                <h3 className="text-lg font-bold">AI正在为你演算最优路径...</h3>
                <p className="text-sm text-muted-foreground mt-2">正在拆解目标 · 分配时间权重 · 匹配相关资源</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            <AnimatePresence>
              {planStages.map((stage, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                >
                  <Card className="shadow-md border-t-4 border-t-primary overflow-hidden">
                    <CardHeader className="bg-muted/30 pb-4 border-b">
                      <CardTitle className="text-xl">{stage.stage}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <Target size={16} className="text-primary" /> 
                        核心目标: {stage.goals.join(' / ')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        {stage.tasks.map((task, j) => (
                          <div key={j} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors group">
                            <div className="flex items-center gap-3">
                              <div className="w-5 h-5 rounded border border-muted-foreground/30 flex items-center justify-center">
                              </div>
                              <span className="font-medium text-[15px]">{task}</span>
                            </div>
                            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity text-xs h-7 text-primary">
                              <Plus size={14} className="mr-1" /> 添加至待办
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center pt-4"
            >
              <Button asChild size="lg" className="px-10 rounded-full shadow-lg">
                <Link href="/tasks">前往任务看板开始执行</Link>
              </Button>
            </motion.div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  );
}
