import React from 'react';
import { Award, X, Sparkles, ArrowRight } from 'lucide-react';
import { Badge } from '../types';
import { BadgeIcon } from './BadgeIcon';

interface BadgeToastProps {
  badge: Badge | null;
  onClose: () => void;
  onOpenBadges: () => void;
}

export const BadgeToast: React.FC<BadgeToastProps> = ({
  badge,
  onClose,
  onOpenBadges,
}) => {
  if (!badge) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-amber-400/40 animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-start gap-3">
        <div
          className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${badge.gradient} text-white flex items-center justify-center shrink-0 shadow-md`}
        >
          <BadgeIcon iconName={badge.icon} size="md" unlocked={true} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-amber-400 text-2xs font-bold uppercase tracking-wider mb-0.5">
            <Sparkles className="w-3 h-3" />
            <span>Digital Badge Unlocked!</span>
          </div>
          <h4 className="text-sm font-bold text-white truncate">{badge.name}</h4>
          <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
            {badge.description}
          </p>

          <div className="mt-3 flex items-center gap-3">
            <button
              onClick={() => {
                onOpenBadges();
                onClose();
              }}
              className="text-xs font-semibold text-amber-300 hover:text-amber-200 flex items-center gap-1 transition-colors"
            >
              <span>View All Badges</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
          title="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
