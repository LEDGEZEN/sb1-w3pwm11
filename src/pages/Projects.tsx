import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, PieChart, TrendingUp, Activity, Target, Users, Upload, Eye, Check } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const iconMap: { [key: string]: React.ReactNode } = {
  BarChart: <BarChart className="w-8 h-8 text-blue-400" />,
  PieChart: <PieChart className="w-8 h-8 text-green-400" />,
  TrendingUp: <TrendingUp className="w-8 h-8 text-red-400" />,
  Activity: <Activity className="w-8 h-8 text-yellow-400" />,
  Target: <Target className="w-8 h-8 text-purple-400" />,
  Users: <Users className="w-8 h-8 text-indigo-400" />,
};

const Projects: React.FC = () => {
  const { projects, addProject, isAuthenticated } = useAppContext();
  const [newProject, setNewProject] = useState({
    title: '',
    icon: 'BarChart',
    description: '',
    sections: [{ title: '', content: '' }],
    visualsUrls: [''],
  });
  const [isPreview, setIsPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProject(newProject);
    setNewProject({
      title: '',
      icon: 'BarChart',
      description: '',
      sections: [{ title: '', content: '' }],
      visualsUrls: [''],
    });
    setIsPreview(false);
  };

  const addSection = () => {
    setNewProject({
      ...newProject,
      sections: [...newProject.sections, { title: '', content: '' }],
    });
  };

  const updateSection = (index: number, field: 'title' | 'content', value: string) => {
    const updatedSections = [...newProject.sections];
    updatedSections[index][field] = value;
    setNewProject({ ...newProject, sections: updatedSections });
  };

  const addVisual = () => {
    setNewProject({
      ...newProject,
      visualsUrls: [...newProject.visualsUrls, ''],
    });
  };

  const updateVisual = (index: number, value: string) => {
    const updatedVisuals = [...newProject.visualsUrls];
    updatedVisuals[index] = value;
    setNewProject({ ...newProject, visualsUrls: updatedVisuals });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setNewProject({
          ...newProject,
          visualsUrls: [...newProject.visualsUrls, base64String],
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Rest of the component code remains the same
  // ...
};

export default Projects;