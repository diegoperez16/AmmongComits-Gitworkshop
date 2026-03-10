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
  
  const revealedParts = new Set<string>();
  userCompletedMissions.forEach(mission => {
    if (mission.storyPart) {
      revealedParts.add(mission.storyPart);
    }
  });

  const storyOrder = ['intro', 'team', 'tension', 'sabotage', 'evidence', 'resolution'];
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
      {!collapsed && <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {storyOrder.map((part) => {
          const isRevealed = revealedParts.has(part);
          return (
            <div 
              key={part}
              style={{
                background: isRevealed ? 'rgba(59, 130, 246, 0.1)' : 'rgba(0,0,0,0.2)',
                border: `1px solid ${isRevealed ? '#3b82f6' : '#4a5568'}`,
                borderRadius: '8px',
                padding: '15px',
                transition: 'all 0.3s ease'
              }}
            >
              {isRevealed ? (
                <p style={{ 
                  color: '#cbd5e0', 
                  lineHeight: '1.6',
                  margin: 0,
                  fontSize: '15px'
                }}>
                  {STORY_PARTS[part as keyof typeof STORY_PARTS]}
                </p>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: '2px solid #4a5568',
                    background: '#2d3748'
                  }}></div>
                  <p style={{ 
                    color: '#718096', 
                    margin: 0,
                    fontStyle: 'italic',
                    fontSize: '14px'
                  }}>
                    Locked - Complete more missions to reveal
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>}

      {!collapsed && progress === 100 && (
        <div style={{
          marginTop: '20px',
          padding: '20px',
          background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h3 style={{ 
            color: '#fff', 
            fontSize: '20px', 
            fontWeight: 'bold',
            marginBottom: '10px' 
          }}>
            CASE CLOSED
          </h3>
          <p style={{ color: '#fff', margin: 0 }}>
            You've uncovered the whole story! All bugs are fixed and the truth has been revealed.
          </p>
        </div>
      )}
    </div>
  );
}
