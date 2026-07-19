import { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Calendar, MoreHorizontal, Filter, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function Tasks() {
  const [tasks, setTasks] = useState([
    { id: 1, title: '重构个人博客，加入复杂状态管理', stage: '大三下', category: '技术提升', completed: false, priority: 'high' },
    { id: 2, title: '每天完成2道LeetCode中等难度题目', stage: '大三下', category: '算法准备', completed: true, priority: 'high' },
    { id: 3, title: '阅读《JavaScript高级程序设计》核心章节', stage: '大三下', category: '基础巩固', completed: false, priority: 'medium' },
    { id: 4, title: '准备并投递至少5家互联网公司的日常实习', stage: '大三下', category: '求职行动', completed: false, priority: 'high' },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const getPriorityColor = (p: string) => {
    switch(p) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-brand-gold/20 text-brand-gold border-brand-gold/30';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getCategoryColor = (c: string) => {
    if(c.includes('技术')) return 'bg-blue-100 text-blue-700';
    if(c.includes('求职')) return 'bg-emerald-100 text-emerald-700';
    return 'bg-purple-100 text-purple-700';
  };

  return (
    <AppShell>
      <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8 h-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">任务管理看板</h1>
            <p className="text-muted-foreground mt-1">执行是连接目标与现实的唯一桥梁。</p>
          </div>
          <Button className="rounded-full shadow-md">
            <Plus className="mr-2 h-4 w-4" /> 新建任务
          </Button>
        </div>

        <Tabs defaultValue="list" className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="list">列表视图</TabsTrigger>
              <TabsTrigger value="kanban" disabled className="opacity-50">看板视图 (Pro)</TabsTrigger>
            </TabsList>
            <Button variant="outline" size="sm" className="h-8">
              <Filter className="w-4 h-4 mr-2" /> 筛选
            </Button>
          </div>
          
          <TabsContent value="list" className="flex-1 mt-0 border rounded-xl bg-white shadow-sm overflow-hidden">
            <div className="divide-y">
              <AnimatePresence>
                {tasks.sort((a,b) => Number(a.completed) - Number(b.completed)).map((task) => (
                  <motion.div
                    key={task.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`p-4 flex items-center gap-4 group transition-colors hover:bg-slate-50 ${task.completed ? 'bg-slate-50/50' : ''}`}
                  >
                    <Checkbox 
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                      className="w-5 h-5 rounded-full data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500 transition-all duration-300"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <p className={`text-[15px] font-medium truncate transition-all duration-300 ${task.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                        {task.title}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-xs flex items-center text-slate-500">
                          <Calendar size={12} className="mr-1" /> {task.stage}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-sm font-medium ${getCategoryColor(task.category)}`}>
                          {task.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!task.completed && (
                        <Badge variant="outline" className={`text-[10px] uppercase border ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </Badge>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
                        <MoreHorizontal size={16} />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
