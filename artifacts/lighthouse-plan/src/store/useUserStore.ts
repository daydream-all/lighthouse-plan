import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserProfile {
  name: string;
  university: string;
  major: string;
  year: string;
  interests: string[];
  goals: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: number;
}

export interface AssessmentAnswers {
  [questionId: string]: string;
}

export interface GrowthPortrait {
  type: string;
  title: string;
  scores: {
    academic: number;
    social: number;
    innovation: number;
    execution: number;
    pressure: number;
    leadership: number;
  };
  traits: string[];
  contradictions: string[];
  environment: string;
  strategies: string[];
  reliability: number;
}

interface UserState {
  profile: Partial<UserProfile>;
  chatHistory: ChatMessage[];
  assessmentAnswers: AssessmentAnswers;
  portrait: GrowthPortrait | null;
  tasks: any[];
  
  updateProfile: (updates: Partial<UserProfile>) => void;
  addChatMessage: (msg: ChatMessage) => void;
  setAssessmentAnswer: (qId: string, answerId: string) => void;
  setPortrait: (portrait: GrowthPortrait) => void;
  setTasks: (tasks: any[]) => void;
  clearAssessment: () => void;
  loadDemoData: () => void;
}

const initialDemoData = {
  profile: {
    name: '李明',
    university: '北京大学',
    major: '计算机科学与技术',
    year: '大三',
    interests: ['人工智能', '开源社区', '心理学'],
    goals: ['获得顶级互联网公司Offer', '保持年级前10%'],
  },
  chatHistory: [
    {
      id: '1',
      role: 'ai',
      content: '你好，我是你的灯塔引航员。很高兴认识你。在开始为你规划之前，我想先了解一下你最近在大学里最关注的事情是什么？',
      timestamp: Date.now() - 100000,
    },
    {
      id: '2',
      role: 'user',
      content: '我马上大三下了，在犹豫是直接工作还是考研，挺迷茫的。',
      timestamp: Date.now() - 80000,
    },
    {
      id: '3',
      role: 'ai',
      content: '很多人在大三下学期都会面临这个十字路口。考虑到你的专业是计算机，无论是考研深造还是直接就业都有很好的前景。你平时在做项目时，更喜欢钻研底层原理，还是更享受把产品做出来被大家使用的成就感？',
      timestamp: Date.now() - 60000,
    }
  ] as ChatMessage[],
  assessmentAnswers: {},
  portrait: {
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
  }
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      profile: {},
      chatHistory: [],
      assessmentAnswers: {},
      portrait: null,
      tasks: [],
      
      updateProfile: (updates) => set((state) => ({ profile: { ...state.profile, ...updates } })),
      addChatMessage: (msg) => set((state) => ({ chatHistory: [...state.chatHistory, msg] })),
      setAssessmentAnswer: (qId, answerId) => set((state) => ({ 
        assessmentAnswers: { ...state.assessmentAnswers, [qId]: answerId } 
      })),
      setPortrait: (portrait) => set({ portrait }),
      setTasks: (tasks) => set({ tasks }),
      clearAssessment: () => set({ assessmentAnswers: {} }),
      loadDemoData: () => set(initialDemoData)
    }),
    {
      name: 'lighthouse-user-storage',
    }
  )
);
