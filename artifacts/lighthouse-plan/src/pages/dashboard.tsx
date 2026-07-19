import { useEffect, useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { useUserStore } from '@/store/useUserStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link } from 'wouter';
import { Compass, Target, ArrowRight, BookOpen, CheckCircle, Flame } from 'lucide-react';

export default function Dashboard() {
  const { profile, chatHistory, assessmentAnswers, portrait } = useUserStore();
  
  // Calculate completion
  let progress = 0;
  if (chatHistory.length > 0) progress += 20;
  if (Object.keys(assessmentAnswers).length > 0) progress += 30;
  if (portrait) progress += 50;

  return (
    <AppShell>
      <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              你好，{profile?.name || '同学'} <span className="inline-block animate-bounce ml-2">👋</span>
            </h1>
            <p className="text-muted-foreground mt-1">
              欢迎来到灯塔计划。今天是为你点亮方向的第1天。
            </p>
          </div>
          <Button asChild className="rounded-full shadow-md">
            <Link href={progress === 0 ? "/guide" : (portrait ? "/plan" : "/assessment")}>
              {progress === 0 ? "开始初次对话" : (portrait ? "查看行动计划" : "继续测评")}
            </Link>
          </Button>
        </div>

        {/* Progress Card */}
        <Card className="border-none shadow-md bg-gradient-to-br from-white to-primary/5">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle className="text-muted/30 stroke-current" strokeWidth="8" cx="50" cy="50" r="40" fill="transparent" />
                  <circle 
                    className="text-primary stroke-current transition-all duration-1000 ease-out" 
                    strokeWidth="8" strokeLinecap="round" cx="50" cy="50" r="40" fill="transparent" 
                    strokeDasharray="251.2" 
                    strokeDashoffset={251.2 - (251.2 * progress) / 100}
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-bold">{progress}%</span>
                  <span className="text-[10px] text-muted-foreground">探索进度</span>
                </div>
              </div>
              
              <div className="flex-1 space-y-6 w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className={`p-4 rounded-xl border ${progress >= 20 ? 'bg-primary/5 border-primary/20' : 'bg-muted/50 border-transparent'} transition-colors relative`}>
                    {progress >= 20 && <CheckCircle className="absolute top-3 right-3 text-primary h-5 w-5" />}
                    <Compass className={`h-6 w-6 mb-2 ${progress >= 20 ? 'text-primary' : 'text-muted-foreground'}`} />
                    <h3 className="font-semibold text-sm">1. 基础档案</h3>
                    <p className="text-xs text-muted-foreground mt-1">与AI引航员完成深度对话，建立初步认知。</p>
                  </div>
                  
                  <div className={`p-4 rounded-xl border ${progress >= 50 ? 'bg-brand-gold/10 border-brand-gold/30' : 'bg-muted/50 border-transparent'} transition-colors relative`}>
                    {progress >= 50 && <CheckCircle className="absolute top-3 right-3 text-brand-gold h-5 w-5" />}
                    <Target className={`h-6 w-6 mb-2 ${progress >= 50 ? 'text-brand-gold' : 'text-muted-foreground'}`} />
                    <h3 className="font-semibold text-sm">2. 启航测评</h3>
                    <p className="text-xs text-muted-foreground mt-1">多维度心理测评，生成你的专属成长画像。</p>
                  </div>
                  
                  <div className={`p-4 rounded-xl border ${progress >= 100 ? 'bg-brand-teal/10 border-brand-teal/30' : 'bg-muted/50 border-transparent'} transition-colors relative`}>
                    {progress >= 100 && <CheckCircle className="absolute top-3 right-3 text-brand-teal h-5 w-5" />}
                    <BookOpen className={`h-6 w-6 mb-2 ${progress >= 100 ? 'text-brand-teal' : 'text-muted-foreground'}`} />
                    <h3 className="font-semibold text-sm">3. 行动计划</h3>
                    <p className="text-xs text-muted-foreground mt-1">定制学期行动指南，拆解具体执行任务。</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Access */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Flame className="text-brand-gold h-5 w-5" /> 最新画像
                </CardTitle>
                {portrait && (
                  <Button variant="ghost" size="sm" asChild className="h-8">
                    <Link href="/portrait">查看完整 <ArrowRight className="ml-1 h-3 w-3" /></Link>
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {portrait ? (
                <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-lg">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border text-xl">
                    🌟
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{portrait.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-1">{portrait.traits.join(' · ')}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground text-sm mb-4">完成测评后将在这里展示你的成长画像</p>
                  <Button variant="outline" asChild size="sm">
                    <Link href="/assessment">去完成测评</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Compass className="text-brand-teal h-5 w-5" /> 待办任务
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {progress < 100 ? (
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-primary/20 bg-primary/5">
                    <div className="h-4 w-4 rounded border-2 border-primary" />
                    <span className="text-sm font-medium flex-1">
                      {progress === 0 ? '完成引航员初次对话' : (progress < 50 ? '完成全部启航测评' : '生成专属行动计划')}
                    </span>
                    <Button size="sm" asChild className="h-7 text-xs">
                       <Link href={progress === 0 ? "/guide" : (progress < 50 ? "/assessment" : "/plan")}>去完成</Link>
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="h-4 w-4 rounded border border-muted-foreground/30" />
                      <span className="text-sm flex-1">查阅期中考试相关学术资料</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="h-4 w-4 rounded border border-muted-foreground/30" />
                      <span className="text-sm flex-1">修改个人简历第一版</span>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
