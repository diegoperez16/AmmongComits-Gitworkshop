'use client';

import { useState } from 'react';
import { Mission, STORY_PARTS } from '@/lib/missions';

interface StoryPanelProps {
  missions: Mission[];
  currentUser: string;
}

export default function StoryPanel({ missions, currentUser }: StoryPanelProps) {
  const [collapsed, setCollapsed] = useState(false);
  const userCompletedMissions = missions.filter(m => m.completedBy.includes(currentUser));
  
  const completedStoryParts = new Set<string>();
  userCompletedMissions.forEach(mission => {
    if (mission.storyPart) completedStoryParts.add(mission.storyPart);
  });

  const storyOrder: Array<{ key: keyof typeof STORY_PARTS; label: string; unlockedBy: string }> = [
    { key: 'team',          label: 'The Team',           unlockedBy: 'List All Collaborators' },
    { key: 'sabotage',      label: 'The Sabotage',       unlockedBy: 'Fix: Coins Not Visible or Enemies Too Fast' },
    { key: 'culprit',       label: 'A Suspect Emerges',  unlockedBy: 'Identify the Saboteur' },
    { key: 'evidence',      label: 'The Evidence',       unlockedBy: 'Fix: Score Goes Down or Player Never Dies' },
    { key: 'secretMessage', label: 'The Hidden Message', unlockedBy: 'The Hidden Message' },
    { key: 'tension',       label: 'The Motive',         unlockedBy: 'Fix: Backwards Controls' },
    { key: 'resolution',    label: 'Case Closed',        unlockedBy: 'The Pattern Emerges' },
  ];

  // A part is only revealed if its mission is done AND all previous parts are also revealed
  const revealedParts = new Set<string>();
  for (const { key } of storyOrder) {
    const allPreviousRevealed = storyOrder
      .slice(0, storyOrder.findIndex(s => s.key === key))
      .every(s => revealedParts.has(s.key));
    if (completedStoryParts.has(key) && allPreviousRevealed) {
      revealedParts.add(key);
    } else {
      break; // chain breaks — no point checking further
    }
  }

  const progress = (revealedParts.size / storyOrder.length) * 100;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)',
      border: '2px solid #4a5568',
      borderRadius: '12px',
      padding: '25px',
      marginBottom: '30px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
    }}>
      <div style={{ marginBottom: collapsed ? 0 : '20px' }}>
        <h2
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#fff',
            marginBottom: collapsed ? 0 : '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <span style={{ fontSize: '14px', color: '#6b7280' }}>{collapsed ? '▶' : '▼'}</span>
          THE CASE FILE
          <span style={{
            fontSize: '14px',
            background: '#4a5568',
            padding: '4px 12px',
            borderRadius: '12px',
            fontWeight: 'normal'
          }}>
            {Math.round(progress)}% Complete
          </span>
        </h2>
        
        {/* Progress Bar */}
        {!collapsed && (
          <div style={{
            width: '100%',
            height: '8px',
            background: '#2d3748',
            borderRadius: '4px',
            overflow: 'hidden',
            marginBottom: '20px'
          }}>
            <div style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
              transition: 'width 0.5s ease'
            }}></div>
          </div>
        )}
      </div>

      {/* Story Parts */}
      {!collapsed && <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {storyOrder.map(({ key, label, unlockedBy }, idx) => {
          const isRevealed = revealedParts.has(key);
          const prevUnlocked = idx === 0 || revealedParts.has(storyOrder[idx - 1].key);
          const blockingPart = !prevUnlocked ? storyOrder[idx - 1].label : null;
          return (
            <div
              key={key}
              style={{
                background: isRevealed ? 'rgba(59, 130, 246, 0.1)' : 'rgba(0,0,0,0.2)',
                border: `1px solid ${isRevealed ? '#3b82f6' : '#4a5568'}`,
                borderRadius: '8px',
                padding: '14px 16px',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: isRevealed ? '8px' : 0 }}>
                <div style={{
                  width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0,
                  background: isRevealed ? '#3b82f6' : '#4a5568',
                }} />
                <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: isRevealed ? '#60a5fa' : '#6b7280' }}>
                  {label}
                </span>
                {!isRevealed && (
                  <span style={{ fontSize: '11px', color: '#4b5563', marginLeft: 'auto' }}>
                    Unlock: {unlockedBy}
                  </span>
                )}
              </div>
              {isRevealed ? (
                <p style={{ color: '#cbd5e0', lineHeight: '1.6', margin: 0, fontSize: '14px' }}>
                  {STORY_PARTS[key]}
                </p>
              ) : (
                <p style={{ color: '#4b5563', margin: 0, fontStyle: 'italic', fontSize: '13px' }}>
                  {blockingPart
                    ? `Reveal "${blockingPart}" first.`
                    : `Complete "${unlockedBy}" to reveal this part of the story.`}
                </p>
              )}
            </div>
          );
        })}
      </div>}

    </div>
  );
}
