import { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { useUserStore } from '@/store/useUserStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { UserCircle, Save } from 'lucide-react';

export default function Profile() {
  const { profile, updateProfile } = useUserStore();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    university: profile?.university || '',
    major: profile?.major || '',
    year: profile?.year || '',
    interests: profile?.interests?.join(', ') || '',
    goals: profile?.goals?.join(', ') || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateProfile({
      name: formData.name,
      university: formData.university,
      major: formData.major,
      year: formData.year,
      interests: formData.interests.split(',').map(i => i.trim()).filter(Boolean),
      goals: formData.goals.split(',').map(i => i.trim()).filter(Boolean)
    });
    toast({
      title: "保存成功",
      description: "你的个人档案已更新",
    });
  };

  return (
    <AppShell>
      <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-brand-teal/20 text-brand-teal flex items-center justify-center">
            <UserCircle className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">个人档案</h1>
            <p className="text-muted-foreground mt-1">越详细的信息，AI引航员就能提供越精准的建议。</p>
          </div>
        </div>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>基础信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">姓名/昵称</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="如：李明" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="university">就读高校</Label>
                <Input id="university" name="university" value={formData.university} onChange={handleChange} placeholder="如：北京大学" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="major">专业方向</Label>
                <Input id="major" name="major" value={formData.major} onChange={handleChange} placeholder="如：计算机科学与技术" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">当前年级</Label>
                <Input id="year" name="year" value={formData.year} onChange={handleChange} placeholder="如：大三下" />
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t">
              <Label htmlFor="interests">兴趣倾向 (用逗号分隔)</Label>
              <Input id="interests" name="interests" value={formData.interests} onChange={handleChange} placeholder="如：人工智能, 摄影, 剧本杀" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="goals">当前核心目标 (用逗号分隔)</Label>
              <Input id="goals" name="goals" value={formData.goals} onChange={handleChange} placeholder="如：保研边缘想冲刺, 找一份大厂日常实习" />
            </div>

            <div className="pt-6 flex justify-end">
              <Button onClick={handleSave} className="gap-2">
                <Save size={16} /> 保存档案
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
