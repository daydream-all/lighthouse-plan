import { AppShell } from '@/components/layout/AppShell';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Download, Share2, CalendarClock } from 'lucide-react';
import { useUserStore } from '@/store/useUserStore';

export default function Reports() {
  const { portrait } = useUserStore();

  return (
    <AppShell>
      <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">报告中心</h1>
          <p className="text-muted-foreground mt-1">查看和下载你所有的分析报告与规划档案。</p>
        </div>

        <div className="grid gap-4">
          {portrait ? (
            <Card className="hover:shadow-md transition-shadow group border-l-4 border-l-brand-teal">
              <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-brand-teal/10 flex items-center justify-center shrink-0">
                  <FileText className="h-8 w-8 text-brand-teal" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center gap-2 mb-1 justify-center md:justify-start">
                    <h3 className="font-bold text-lg">{portrait.title} - 深度成长画像报告</h3>
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">最新</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center justify-center md:justify-start gap-2">
                    <CalendarClock size={14} /> 2024-05-20 生成 · 基于20题启航测评
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Share2 size={16} className="mr-2" /> 分享
                  </Button>
                  <Button size="sm">
                    <Download size={16} className="mr-2" /> 下载 PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
             <div className="text-center py-20 bg-muted/30 rounded-xl border border-dashed">
                <p className="text-muted-foreground">暂无生成的报告，请先完成启航测评</p>
             </div>
          )}

          {portrait && (
            <Card className="hover:shadow-md transition-shadow group border-l-4 border-l-primary">
              <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center gap-2 mb-1 justify-center md:justify-start">
                    <h3 className="font-bold text-lg">大三下学期 - AI行动计划指南</h3>
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center justify-center md:justify-start gap-2">
                    <CalendarClock size={14} /> 2024-05-20 生成 · 匹配职业路径：企业求职
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Share2 size={16} className="mr-2" /> 分享
                  </Button>
                  <Button size="sm">
                    <Download size={16} className="mr-2" /> 下载 PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AppShell>
  );
}
