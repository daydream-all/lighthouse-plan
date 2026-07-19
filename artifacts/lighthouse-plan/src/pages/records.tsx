import { AppShell } from '@/components/layout/AppShell';
import { Card, CardContent } from '@/components/ui/card';
import { Target, MessageSquare, Briefcase, Award } from 'lucide-react';

export default function Records() {
  const records = [
    { id: 1, date: '2024-05-20', type: 'assessment', title: '完成《启航测评》', desc: '生成了【探索型实践者】专属画像', icon: <Target className="w-4 h-4 text-brand-gold" />, color: 'bg-brand-gold/10 border-brand-gold/30' },
    { id: 2, date: '2024-05-19', type: 'chat', title: '初次对话引航员', desc: '建立了基础档案，记录了考研与就业的困惑', icon: <MessageSquare className="w-4 h-4 text-primary" />, color: 'bg-primary/10 border-primary/30' },
    { id: 3, date: '2024-05-18', type: 'milestone', title: '加入灯塔计划', desc: '开启大学成长新篇章', icon: <Award className="w-4 h-4 text-brand-teal" />, color: 'bg-brand-teal/10 border-brand-teal/30' }
  ];

  return (
    <AppShell>
      <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">成长记录</h1>
          <p className="text-muted-foreground mt-1">走过的每一步，都算数。</p>
        </div>

        {/* Heatmap Placeholder */}
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold mb-4 text-muted-foreground">活跃热力图</h3>
            <div className="flex gap-1 overflow-x-auto pb-2">
              {Array.from({ length: 52 }).map((_, col) => (
                <div key={col} className="flex flex-col gap-1">
                  {Array.from({ length: 7 }).map((_, row) => {
                    // Randomly color some squares for demo
                    const isColored = Math.random() > 0.8;
                    const opacity = Math.random();
                    return (
                      <div 
                        key={row} 
                        className={`w-3 h-3 rounded-sm ${isColored ? 'bg-primary' : 'bg-muted'}`}
                        style={{ opacity: isColored ? Math.max(0.3, opacity) : 1 }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="flex justify-end items-center gap-2 mt-4 text-xs text-muted-foreground">
              <span>少</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-sm bg-muted"></div>
                <div className="w-3 h-3 rounded-sm bg-primary/40"></div>
                <div className="w-3 h-3 rounded-sm bg-primary/70"></div>
                <div className="w-3 h-3 rounded-sm bg-primary"></div>
              </div>
              <span>多</span>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <div className="mt-8 ml-4 border-l-2 border-muted pl-6 space-y-8 py-4 relative">
          {records.map((record) => (
            <div key={record.id} className="relative">
              <div className={`absolute -left-[35px] top-1 w-6 h-6 rounded-full flex items-center justify-center border-2 bg-white ${record.color}`}>
                {record.icon}
              </div>
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold">{record.title}</h4>
                    <span className="text-xs text-muted-foreground font-mono bg-muted/50 px-2 py-1 rounded">{record.date}</span>
                  </div>
                  <p className="text-sm text-slate-600">{record.desc}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
