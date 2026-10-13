import React from 'react';
import {
  Terminal,
  Layers,
  GitFork,
  Repeat,
  Boxes,
  Database,
  Wrench,
  ShieldCheck,
  Cpu,
  Sparkles,
  Trophy,
  Zap,
  Crown,
  Award,
  Lock,
} from 'lucide-react';

interface BadgeIconProps {
  iconName: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  unlocked?: boolean;
}

export const BadgeIcon: React.FC<BadgeIconProps> = ({
  iconName,
  className = '',
  size = 'md',
  unlocked = true,
}) => {
  const iconSizeClass =
    size === 'sm'
      ? 'w-3.5 h-3.5'
      : size === 'md'
      ? 'w-5 h-5'
      : size === 'lg'
      ? 'w-7 h-7'
      : 'w-10 h-10';

  if (!unlocked) {
    return <Lock className={`${iconSizeClass} text-slate-400 ${className}`} />;
  }

  switch (iconName) {
    case 'Terminal':
      return <Terminal className={`${iconSizeClass} ${className}`} />;
    case 'Layers':
      return <Layers className={`${iconSizeClass} ${className}`} />;
    case 'GitFork':
      return <GitFork className={`${iconSizeClass} ${className}`} />;
    case 'Repeat':
      return <Repeat className={`${iconSizeClass} ${className}`} />;
    case 'Boxes':
      return <Boxes className={`${iconSizeClass} ${className}`} />;
    case 'Database':
      return <Database className={`${iconSizeClass} ${className}`} />;
    case 'Wrench':
      return <Wrench className={`${iconSizeClass} ${className}`} />;
    case 'ShieldCheck':
      return <ShieldCheck className={`${iconSizeClass} ${className}`} />;
    case 'Cpu':
      return <Cpu className={`${iconSizeClass} ${className}`} />;
    case 'Sparkles':
      return <Sparkles className={`${iconSizeClass} ${className}`} />;
    case 'Trophy':
      return <Trophy className={`${iconSizeClass} ${className}`} />;
    case 'Zap':
      return <Zap className={`${iconSizeClass} ${className}`} />;
    case 'Crown':
      return <Crown className={`${iconSizeClass} ${className}`} />;
    default:
      return <Award className={`${iconSizeClass} ${className}`} />;
  }
};
