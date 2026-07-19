import { AppShell } from '@/components/layout/AppShell';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, LogOut, CheckCircle2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">系统设置</h1>
          <p className="text-muted-foreground mt-1">管理你的账号、偏好及AI大模型接入。</p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>个人资料</CardTitle>
              <CardDescription>管理你的基础信息和账户安全。</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">账号信息</p>
                  <p className="text-sm text-muted-foreground">当前绑定: user@example.com</p>
                </div>
                <Button variant="outline" size="sm">修改密码</Button>
              </div>
              <Button variant="destructive" className="w-full sm:w-auto">
                <LogOut className="mr-2 h-4 w-4" /> 退出登录
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>通知偏好</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/20">
                <div>
                  <p className="font-medium">任务提醒</p>
                  <p className="text-sm text-muted-foreground">每天早晨推送今日待办任务</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/20">
                <div>
                  <p className="font-medium">周报总结</p>
                  <p className="text-sm text-muted-foreground">每周日晚生成上周执行报告</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card className="border-brand-teal/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-teal inline-block"></span>
                AI 模型接入 (即将开放)
              </CardTitle>
              <CardDescription>连接你自己的大语言模型API，获取更强大的定制化能力。</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 opacity-70 pointer-events-none">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">OpenAI API Key</label>
                  <Input placeholder="sk-..." type="password" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">DeepSeek API Key</label>
                  <Input placeholder="sk-..." type="password" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">通义千问 API Key</label>
                  <Input placeholder="sk-..." type="password" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">自定义兼容端点 (URL)</label>
                  <Input placeholder="https://api.example.com/v1" />
                </div>
              </div>
              <div className="pt-4 flex justify-end border-t mt-4">
                <Button>保存配置</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
                云端同步 (即将开放)
              </CardTitle>
            </CardHeader>
            <CardContent className="opacity-70 pointer-events-none">
               <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Supabase 云端连接</p>
                  <p className="text-sm text-muted-foreground">开启后数据将跨设备实时同步</p>
                </div>
                <Button variant="outline">连接数据库</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
