import { useState, useRef, useEffect } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { useUserStore } from '@/store/useUserStore';
import { generateAIResponse } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, User, Bot, PlayCircle, Loader2, Target } from 'lucide-react';
import { Link } from 'wouter';
import { useToast } from '@/hooks/use-toast';

export default function Guide() {
  const { chatHistory, addChatMessage, profile, loadDemoData } = useUserStore();
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const round = Math.floor(chatHistory.length / 2) + 1;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, streamingText]);

  // Initial greeting if empty
  useEffect(() => {
    if (chatHistory.length === 0 && !isTyping) {
      const initGreeting = async () => {
        setIsTyping(true);
        await generateAIResponse('', 1, (text) => setStreamingText(text));
        addChatMessage({
          id: Date.now().toString(),
          role: 'ai',
          content: '你好！我是你的灯塔引航员。很高兴认识你。在开始为你规划之前，我想先了解一下你最近在大学里最关注的事情是什么？或者你有什么具体的困惑吗？',
          timestamp: Date.now()
        });
        setStreamingText('');
        setIsTyping(false);
      };
      initGreeting();
    }
  }, [chatHistory.length, addChatMessage, isTyping]);

  const handleSend = async (text: string = inputValue) => {
    if (!text.trim() || isTyping) return;
    
    setInputValue('');
    
    // User message
    addChatMessage({
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: Date.now()
    });

    setIsTyping(true);
    setStreamingText('');
    
    // Determine context for AI response
    const currentRound = Math.floor(chatHistory.length / 2) + 1;
    
    await generateAIResponse(text, currentRound + 1, (partial) => {
      setStreamingText(partial);
    });
    
    // Save AI message
    addChatMessage({
      id: (Date.now() + 1).toString(),
      role: 'ai',
      content: streamingText, // Will be replaced in real impl, mockData already resolves to full string inside generateAIResponse visually, but we need the final text. Actually generateAIResponse streams it, so we need a way to get final. 
      // Workaround: We know what it returns based on round.
      timestamp: Date.now()
    });
    
    // Re-fetch final text properly based on round (Mock workaround)
    let finalText = '';
    if (currentRound + 1 === 2) finalText = '了解了！这些兴趣点展现了你很好的潜力。你在遇到困难和挑战时，通常会倾向于自己钻研解决，还是更愿意寻求他人的合作？';
    else if (currentRound + 1 >= 3) finalText = '谢谢你的分享！我已经初步了解了你的情况。为了给你提供最精准的发展路径和建议，我推荐你完成一下【启航测评】。只需要几分钟，我们就能生成专属你的成长画像。';
    
    // overwrite the last added message with actual final text
    useUserStore.setState(state => {
      const newHistory = [...state.chatHistory];
      newHistory[newHistory.length - 1].content = finalText;
      return { chatHistory: newHistory };
    });

    setStreamingText('');
    setIsTyping(false);
  };

  const suggestions = [
    "我最近在思考毕业后是考研还是工作...",
    "我对现在的专业不太感兴趣，想转行。",
    "我希望能多参加一些竞赛，但不知道从何开始。",
    "感觉大学生活有点迷茫，每天都很空虚。"
  ];

  return (
    <AppShell>
      <div className="flex h-full max-h-screen overflow-hidden flex-col md:flex-row">
        {/* Left: Chat Area */}
        <div className="flex-1 flex flex-col h-full bg-white relative">
          {/* Header */}
          <div className="h-14 border-b flex items-center px-6 justify-between bg-white/80 backdrop-blur-sm z-10 sticky top-0">
            <div className="flex items-center gap-2">
              <Bot className="text-primary h-5 w-5" />
              <h2 className="font-semibold">灯塔引航员</h2>
            </div>
            <Button variant="outline" size="sm" onClick={() => {
              loadDemoData();
              toast({ title: "已加载演示数据", description: "档案和对话记录已更新" });
            }} className="text-xs h-8">
              <PlayCircle className="w-4 h-4 mr-1" /> 使用演示数据
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4 md:p-6" ref={scrollRef}>
            <div className="space-y-6 max-w-3xl mx-auto pb-4">
              {chatHistory.map((msg, i) => (
                <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === 'user' ? 'bg-brand-teal text-white' : 'bg-primary/10 text-primary'
                  }`}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`p-4 rounded-2xl max-w-[80%] ${
                    msg.role === 'user' 
                      ? 'bg-brand-teal text-white rounded-tr-sm' 
                      : 'bg-muted/50 border rounded-tl-sm'
                  }`}>
                    <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && streamingText && (
                <div className="flex gap-4 flex-row">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-primary/10 text-primary">
                    <Bot size={16} />
                  </div>
                  <div className="p-4 rounded-2xl max-w-[80%] bg-muted/50 border rounded-tl-sm">
                    <p className="text-[15px] leading-relaxed">{streamingText}<span className="inline-block w-1.5 h-4 ml-1 bg-primary animate-pulse align-middle"></span></p>
                  </div>
                </div>
              )}
              
              {!isTyping && chatHistory.length === 0 && (
                <div className="flex gap-4 flex-row">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-primary/10 text-primary">
                    <Loader2 size={16} className="animate-spin" />
                  </div>
                </div>
              )}

              {round >= 3 && !isTyping && chatHistory.length > 0 && chatHistory[chatHistory.length - 1].role === 'ai' && (
                <Card className="mt-8 border-primary/20 bg-primary/5 shadow-md max-w-sm mx-auto overflow-hidden animate-in fade-in slide-in-from-bottom-4">
                  <div className="p-6 text-center space-y-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                      <Target className="text-brand-gold w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">基础档案已建立</h3>
                      <p className="text-sm text-muted-foreground mt-1">推荐进行深度测评，获取你的专属成长画像。</p>
                    </div>
                    <Button className="w-full rounded-full" asChild>
                      <Link href="/assessment">立即启航测评</Link>
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 md:p-6 bg-white border-t">
            <div className="max-w-3xl mx-auto space-y-4">
              {chatHistory.length <= 1 && !isTyping && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {suggestions.map((text, i) => (
                    <Button 
                      key={i} 
                      variant="outline" 
                      size="sm" 
                      className="rounded-full text-xs text-muted-foreground hover:text-primary bg-muted/30"
                      onClick={() => handleSend(text)}
                    >
                      {text}
                    </Button>
                  ))}
                </div>
              )}
              
              <div className="relative flex items-center">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={round >= 3 ? "对话已完成阶段目标，建议进行测评..." : "输入你的想法..."}
                  className="pr-12 py-6 rounded-full bg-muted/30 border-transparent focus-visible:ring-primary/20 focus-visible:bg-white transition-all shadow-inner-sm"
                  disabled={isTyping || round >= 3}
                />
                <Button 
                  size="icon" 
                  className="absolute right-2 rounded-full w-9 h-9 shadow-md"
                  disabled={!inputValue.trim() || isTyping || round >= 3}
                  onClick={() => handleSend()}
                >
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Profile Card (hidden on mobile, visible on desktop) */}
        <div className="hidden lg:block w-[320px] border-l bg-muted/10 p-6 overflow-y-auto">
          <div className="sticky top-6 space-y-6">
            <h3 className="font-semibold flex items-center gap-2">
              <User size={18} className="text-primary" /> 实时提取档案
            </h3>
            
            <Card className="border-none shadow-sm bg-white overflow-hidden">
              <div className="h-1.5 w-full bg-gradient-to-r from-primary via-brand-teal to-brand-gold" />
              <div className="p-5 space-y-5">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">姓名</div>
                  <div className="font-medium">{profile?.name || <span className="text-muted-foreground/50 italic">对话中提取...</span>}</div>
                </div>
                
                <div className="pt-3 border-t">
                  <div className="text-xs text-muted-foreground mb-2">关注焦点</div>
                  <div className="flex flex-wrap gap-2">
                    {profile?.goals?.length ? (
                      profile.goals.map((g, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-md bg-brand-gold/10 text-brand-gold text-xs font-medium">
                          {g}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground/50 italic">等待提取...</span>
                    )}
                  </div>
                </div>
                
                <div className="pt-3 border-t">
                  <div className="text-xs text-muted-foreground mb-2">兴趣倾向</div>
                  <div className="flex flex-wrap gap-2">
                    {profile?.interests?.length ? (
                      profile.interests.map((t, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-md bg-brand-teal/10 text-brand-teal text-xs font-medium">
                          {t}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground/50 italic">等待提取...</span>
                    )}
                  </div>
                </div>
                
                <div className="pt-4 mt-2 border-t">
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="text-muted-foreground">档案完整度</span>
                    <span className="font-bold text-primary">{Math.min(chatHistory.length * 15, 45)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-1000" 
                      style={{ width: `${Math.min(chatHistory.length * 15, 45)}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>
            
            <div className="bg-primary/5 rounded-lg p-4 text-sm text-primary/80 flex gap-3">
              <Bot className="shrink-0 mt-0.5" size={16} />
              <p>我会根据我们的对话，自动提取关键信息填充你的个人档案。这有助于后续生成更准确的报告。</p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
