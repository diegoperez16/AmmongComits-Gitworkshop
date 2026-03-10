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

export default function MissionBoard({ user, missions, onCompleteMission }: MissionBoardProps) {
  const [showDefaultMissions, setShowDefaultMissions] = useState(true);

  const defaultMissions   = missions.filter(m => m.category === 'default');
  const detectiveMissions = missions.filter(m => m.category === 'detective');
  const completedCount    = missions.filter(m => m.completedBy.includes(user)).length;

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

      {/* Git Basics — collapsible */}
      <div style={{ marginBottom: '40px' }}>
        <div
          onClick={() => setShowDefaultMissions(!showDefaultMissions)}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}
        >
          <span style={{ fontSize: '18px', color: '#4db8a8' }}>{showDefaultMissions ? '▼' : '▶'}</span>
          <h2 style={{ fontSize: '22px', fontWeight: '700', margin: 0, color: '#fff' }}>
            Git Basics
          </h2>
        </div>
        <p style={{ color: '#a0aec0', marginBottom: '20px', fontSize: '14px' }}>
          Start here — learn the fundamentals before diving into detective missions
        </p>
        {showDefaultMissions && (
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
        )}
      </div>

      {/* Detective Missions */}
      <div>
        <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '10px', color: '#fff' }}>
          Detective Missions
        </h2>
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
    </div>
  );
}
