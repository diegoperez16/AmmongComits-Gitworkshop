'use client';

import { useState } from 'react';
import { Mission } from '@/lib/missions';
import MissionCard from './MissionCard';
import StoryPanel from './StoryPanel';

interface MissionBoardProps {
  user: string;
  missions: Mission[];
  onCompleteMission: (missionId: string) => void;
}

type Tab = 'default' | 'detective';

export default function MissionBoard({ user, missions, onCompleteMission }: MissionBoardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('default');

  const defaultMissions   = missions.filter(m => m.category === 'default');
  const detectiveMissions = missions.filter(m => m.category === 'detective');
  const completedCount    = missions.filter(m => m.completedBy.includes(user)).length;

  const tabs: { key: Tab; label: string; count: number; color: string }[] = [
    { key: 'default',   label: 'Git Basics',         count: defaultMissions.length,   color: '#4db8a8' },
    { key: 'detective', label: 'Detective Missions',  count: detectiveMissions.length, color: '#f59e0b' },
  ];

  return (
    <div className="board-container">
      {/* Minimal header — just links and progress */}
      <div className="board-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
            <a
              href={process.env.NEXT_PUBLIC_GAME_REPO_URL || '#'}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#4db8a8', textDecoration: 'none', fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              Game Repository <span style={{ fontSize: '12px' }}>↗</span>
            </a>
            <a
              href="https://education.github.com/git-cheat-sheet-education.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#5dd9c1', textDecoration: 'none', fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              Git Cheat Sheet <span style={{ fontSize: '12px' }}>↗</span>
            </a>
          </div>
          <span style={{ color: '#4db8a8', fontSize: '14px' }}>
            Completed: <strong>{completedCount}</strong> / {missions.length}
          </span>
        </div>
      </div>

      {/* Story Panel */}
      <StoryPanel missions={missions} currentUser={user} />

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', borderBottom: '2px solid #2d3748' }}>
        {tabs.map(tab => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '10px 22px',
                border: 'none',
                borderBottom: isActive ? `3px solid ${tab.color}` : '3px solid transparent',
                background: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
                color: isActive ? tab.color : '#6b7280',
                fontSize: '15px',
                fontWeight: isActive ? 700 : 400,
                cursor: 'pointer',
                marginBottom: '-2px',
                transition: 'all 0.15s',
              }}
            >
              {tab.label}
              <span style={{
                marginLeft: '8px',
                fontSize: '11px',
                background: isActive ? tab.color : '#374151',
                color: isActive ? '#000' : '#9ca3af',
                borderRadius: '999px',
                padding: '1px 7px',
                fontWeight: 600,
              }}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      {activeTab === 'default' && (
        <div>
          <p style={{ color: '#a0aec0', marginBottom: '20px', fontSize: '14px' }}>
            Start here — learn the fundamentals before diving into detective missions
          </p>
          <div className="missions-grid">
            {defaultMissions.map(mission => (
              <MissionCard
                key={mission.id}
                mission={mission}
                currentUser={user}
                onComplete={onCompleteMission}
              />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'detective' && (
        <div>
          <p style={{ color: '#a0aec0', marginBottom: '20px', fontSize: '14px' }}>
            Investigate the git history and fix the sabotaged bugs
          </p>
          <div className="missions-grid">
            {detectiveMissions.map(mission => (
              <MissionCard
                key={mission.id}
                mission={mission}
                currentUser={user}
                onComplete={onCompleteMission}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
