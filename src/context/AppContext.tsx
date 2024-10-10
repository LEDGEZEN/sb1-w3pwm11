import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Section {
  title: string;
  content: string;
}

interface Project {
  id: number;
  title: string;
  icon: string;
  description: string;
  sections: Section[];
  visualsUrls: string[];
}

interface BlogPost {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

interface AppContextType {
  projects: Project[];
  blogPosts: BlogPost[];
  isAuthenticated: boolean;
  login: (password: string) => void;
  logout: () => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  addBlogPost: (post: Omit<BlogPost, 'id'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: 'NBA Player Performance Analysis',
      icon: 'BarChart',
      description: 'In-depth analysis of NBA player statistics and performance metrics.',
      sections: [
        { title: 'Methodology', content: 'We used advanced statistical models...' },
        { title: 'Key Findings', content: 'Our analysis revealed significant correlations between...' },
      ],
      visualsUrls: [
        'https://via.placeholder.com/400x300?text=NBA+Stats+Chart',
        'https://via.placeholder.com/400x300?text=Player+Performance+Graph',
      ],
    },
    // Add more initial projects here...
  ]);

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    { 
      id: 1, 
      title: 'The Impact of Analytics in Modern Sports', 
      date: '2023-03-15', 
      excerpt: 'Exploring how data-driven decisions are reshaping the sports industry...', 
      content: '<h2>The Rise of Analytics in Sports</h2><p>In recent years, the sports industry has witnessed a significant shift towards data-driven decision-making. This article explores the profound impact of analytics on various aspects of modern sports, from player recruitment to in-game strategies.</p><h3>Key Areas of Impact</h3><ul><li>Player Performance Evaluation</li><li>Team Strategy and Tactics</li><li>Injury Prevention and Management</li><li>Fan Engagement and Marketing</li></ul><p>As we delve deeper into each of these areas, we\'ll see how analytics is revolutionizing the way sports are played, managed, and experienced.</p>' 
    },
    { 
      id: 2, 
      title: 'Breaking Down the NBA\'s Three-Point Revolution', 
      date: '2023-03-22', 
      excerpt: 'A deep dive into the increasing importance of three-pointers in basketball...', 
      content: '<h2>The Three-Point Revolution</h2><p>The NBA has undergone a dramatic transformation in recent years, with the three-point shot becoming an increasingly crucial element of the game. This article examines the factors behind this shift and its impact on team strategies and player skills.</p><h3>Key Factors</h3><ul><li>Rule Changes and Their Effects</li><li>Evolution of Player Skills</li><li>Analytics-Driven Strategies</li><li>Impact on Traditional Positions</li></ul><p>By analyzing these factors, we can gain a deeper understanding of how the three-point shot has reshaped modern basketball.</p>' 
    },
    { 
      id: 3, 
      title: 'Machine Learning in Player Recruitment', 
      date: '2023-03-29', 
      excerpt: 'How AI is changing the way teams scout and recruit new talent...', 
      content: '<h2>AI Revolution in Sports Recruitment</h2><p>Artificial Intelligence and Machine Learning are transforming the way sports teams identify and recruit new talent. This article explores the innovative ways AI is being used in player scouting and evaluation.</p><h3>AI Applications in Recruitment</h3><ul><li>Predictive Analytics for Player Potential</li><li>Video Analysis and Pattern Recognition</li><li>Data-Driven Performance Metrics</li><li>Risk Assessment in Player Acquisition</li></ul><p>We\'ll examine case studies and real-world examples of how AI is enhancing the recruitment process in various sports.</p>' 
    },
  ]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (password: string) => {
    // In a real application, you would validate the password against a secure backend
    if (password === 'your_secure_password') {
      setIsAuthenticated(true);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    setProjects(prev => [...prev, { ...project, id: prev.length + 1 }]);
  };

  const addBlogPost = (post: Omit<BlogPost, 'id'>) => {
    setBlogPosts(prev => [...prev, { ...post, id: prev.length + 1 }]);
  };

  return (
    <AppContext.Provider value={{ projects, blogPosts, isAuthenticated, login, logout, addProject, addBlogPost }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};