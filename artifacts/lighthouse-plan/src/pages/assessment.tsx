import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { AppShell } from '@/components/layout/AppShell';
import { useUserStore } from '@/store/useUserStore';
import { MOCK_ASSESSMENT_QUESTIONS } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Assessment() {
  const [, setLocation] = useLocation();
  const { assessmentAnswers, setAssessmentAnswer, setPortrait } = useUserStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Find first unanswered question to resume, or 0
  useEffect(() => {
    let firstUnanswered = 0;
    for (let i = 0; i < MOCK_ASSESSMENT_QUESTIONS.length; i++) {
      if (!assessmentAnswers[MOCK_ASSESSMENT_QUESTIONS[i].id]) {
        firstUnanswered = i;
        break;
      }
    }
    setCurrentIndex(firstUnanswered);
  }, []);

  const currentQuestion = MOCK_ASSESSMENT_QUESTIONS[currentIndex];
  const isLast = currentIndex === MOCK_ASSESSMENT_QUESTIONS.length - 1;
  const progress = ((currentIndex) / MOCK_ASSESSMENT_QUESTIONS.length) * 100;

  const handleSelect = (optionId: string) => {
    if (isAnimating) return;
    
    setAssessmentAnswer(currentQuestion.id, optionId);
    
    if (!isLast) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setIsAnimating(false);
      }, 400); // Wait for visual feedback
    } else {
      generateAndNavigatePortrait();
    }
  };

  const generateAndNavigatePortrait = () => {
    // Generate mock portrait based on some logic (mocked)
    setPortrait({
      type: 'explorer',
      title: '探索型实践者',
      scores: {
        academic: 85,
        social: 60,
        innovation: 92,
        execution: 88,
        pressure: 75,
        leadership: 65
      },
      traits: ['强大的动手实现能力', '对新技术的敏锐嗅觉', '注重结果导向'],
      contradictions: ['追求完美主义导致进度拖延', '技术深度与业务广度的精力分配平衡'],
      environment: '适合节奏较快、鼓励试错和创新的环境，如初创技术团队或大厂的创新业务部门。',
      strategies: ['建立以周为单位的技术输出习惯', '刻意练习系统架构设计思维', '参加一次跨专业的黑客松'],
      reliability: 92
    });
    setLocation('/portrait');
  };

  if (!currentQuestion) return null;

  return (
    <AppShell>
      <div className="min-h-full bg-slate-50 flex flex-col pt-6 md:pt-12 px-4 pb-12">
        <div className="max-w-2xl mx-auto w-full">
          {/* Header & Progress */}
          <div className="mb-10 text-center space-y-4">
            <h1 className="text-2xl font-bold tracking-tight">启航测评</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground justify-center">
              <span>{currentIndex + 1} / {MOCK_ASSESSMENT_QUESTIONS.length}</span>
              <Progress value={progress} className="w-48 h-2" />
            </div>
          </div>

          {/* Question Card */}
          <div className="relative min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Card className="p-6 md:p-10 shadow-lg border-none bg-white">
                  <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-6">
                    {currentQuestion.category}
                  </div>
                  
                  <h2 className="text-xl md:text-2xl font-medium leading-relaxed mb-8">
                    {currentQuestion.text}
                  </h2>

                  <div className="space-y-3">
                    {currentQuestion.options.map((option) => {
                      const isSelected = assessmentAnswers[currentQuestion.id] === option.id;
                      return (
                        <button
                          key={option.id}
                          onClick={() => handleSelect(option.id)}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ${
                            isSelected 
                              ? 'border-primary bg-primary/5 text-primary' 
                              : 'border-muted hover:border-primary/40 hover:bg-slate-50 text-foreground'
                          }`}
                        >
                          <span className="font-medium">{option.text}</span>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected ? 'border-primary bg-primary text-white' : 'border-muted-foreground/30 group-hover:border-primary/50'
                          }`}>
                            {isSelected && <CheckCircle2 size={14} />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 flex justify-between">
            <Button
              variant="ghost"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(prev => prev - 1)}
              className="text-muted-foreground"
            >
              <ArrowLeft size={16} className="mr-2" /> 上一题
            </Button>
            
            {currentIndex < MOCK_ASSESSMENT_QUESTIONS.length - 1 && assessmentAnswers[currentQuestion.id] && (
              <Button
                variant="ghost"
                onClick={() => setCurrentIndex(prev => prev + 1)}
                className="text-primary"
              >
                下一题 <ArrowRight size={16} className="ml-2" />
              </Button>
            )}
            
            {isLast && assessmentAnswers[currentQuestion.id] && (
              <Button onClick={generateAndNavigatePortrait} className="bg-brand-gold hover:bg-brand-gold/90 text-white">
                生成报告
              </Button>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
