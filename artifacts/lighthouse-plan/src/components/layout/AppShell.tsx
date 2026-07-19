import React from 'react';
import { Link, useLocation } from 'wouter';
import { 
  LayoutDashboard, 
  Compass, 
  Target, 
  Map, 
  CheckSquare, 
  Calendar,
  FileText,
  Settings,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { LighthouseLogo } from '@/components/LighthouseLogo';
import { useUserStore } from '@/store/useUserStore';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ icon, label, href, isActive, onClick }: SidebarItemProps) => {
  return (
    <Link href={href}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start h-11 px-4 text-left font-medium transition-all",
          isActive 
            ? "bg-primary/10 text-primary hover:bg-primary/15" 
            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
        )}
        onClick={onClick}
      >
        <div className="flex items-center gap-3">
          <span className={cn(
            "p-1.5 rounded-md transition-colors", 
            isActive ? "bg-primary text-white" : "text-muted-foreground bg-muted"
          )}>
            {icon}
          </span>
          {label}
        </div>
      </Button>
    </Link>
  );
};

export const Sidebar = ({ isMobile = false, closeMenu }: { isMobile?: boolean, closeMenu?: () => void }) => {
  const [location] = useLocation();
  const { profile } = useUserStore();

  const navItems = [
    { label: '仪表盘', href: '/app', icon: <LayoutDashboard size={18} /> },
    { label: '灯塔引航员', href: '/guide', icon: <Compass size={18} /> },
    { label: '成长画像', href: '/portrait', icon: <Target size={18} /> },
    { label: '职业路径', href: '/paths', icon: <Map size={18} /> },
    { label: 'AI规划', href: '/plan', icon: <Calendar size={18} /> },
    { label: '任务管理', href: '/tasks', icon: <CheckSquare size={18} /> },
    { label: '成长记录', href: '/records', icon: <Calendar size={18} /> },
    { label: '报告中心', href: '/reports', icon: <FileText size={18} /> },
  ];

  const content = (
    <div className="flex flex-col h-full bg-sidebar border-r border-sidebar-border">
      <div className="p-6">
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer">
            <LighthouseLogo size={32} showText />
          </div>
        </Link>
      </div>
      
      <div className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <SidebarItem
            key={item.href}
            label={item.label}
            href={item.href}
            icon={item.icon}
            isActive={location === item.href}
            onClick={closeMenu}
          />
        ))}
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-10 h-10 rounded-full bg-brand-teal/20 text-brand-teal flex items-center justify-center font-bold text-lg">
            {profile?.name ? profile.name.charAt(0) : 'U'}
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="font-semibold text-sm truncate">{profile?.name || '未登录用户'}</div>
            <div className="text-xs text-muted-foreground truncate">{profile?.university || '完成测评解锁画像'}</div>
          </div>
        </div>
        <div className="space-y-1">
          <Link href="/profile">
            <Button variant="ghost" className="w-full justify-start h-9 text-xs text-muted-foreground hover:text-foreground">
              <Settings size={14} className="mr-2" /> 个人档案
            </Button>
          </Link>
          <Link href="/settings">
            <Button variant="ghost" className="w-full justify-start h-9 text-xs text-muted-foreground hover:text-foreground">
              <Settings size={14} className="mr-2" /> 系统设置
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return content;
  }

  return (
    <aside className="hidden md:block w-[260px] h-screen sticky top-0 bg-sidebar z-30">
      {content}
    </aside>
  );
};

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b bg-background sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <LighthouseLogo size={24} showText />
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[260px]">
              <Sidebar isMobile closeMenu={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
