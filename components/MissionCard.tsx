'use client';

import { useState } from 'react';
import { Mission } from '@/lib/missions';

interface MissionCardProps {
  mission: Mission;
  currentUser: string;
  onComplete: (missionId: string) => void;
}

export default function MissionCard({ mission, currentUser, onComplete }: MissionCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [showEvidence, setShowEvidence] = useState(false);
  const [evidence, setEvidence] = useState('');

  const isCompleted      = mission.completedBy.includes(currentUser);
  const isDetective      = mission.category === 'detective';

  const handleComplete = () => {
    if (isDetective && !showEvidence) {
      setShowEvidence(true);
      return;
    }
    onComplete(mission.mission_id);
    setShowEvidence(false);
    setEvidence('');
  };

  return (
    <div className={`mission-card ${isCompleted ? 'completed' : 'available'}`}>
      <div className="mission-header">
        <div>
          <div className="mission-id">{mission.badge || mission.category.toUpperCase()} · {mission.mission_id}</div>
          <h3 className="mission-title">{mission.title}</h3>
        </div>
        {isCompleted
          ? <span className="status-badge status-completed">Completed</span>
          : <span className="status-badge status-available">Available</span>
        }
      </div>

      <p className="mission-description">{mission.description}</p>

      <div className="mission-meta">
        <span>Difficulty: {mission.difficulty}</span>
        {mission.completedBy.length > 0 && (
          <span style={{ color: '#4db8a8' }}>{mission.completedBy.length} completed</span>
        )}
      </div>

      {expanded && (
        <>
          {mission.whatYouLearn && (
            <div style={{ marginTop: '15px', padding: '15px', background: 'rgba(77,184,168,0.1)', border: '1px solid #4db8a8', borderRadius: '8px' }}>
              <strong style={{ display: 'block', marginBottom: '12px', color: '#5dd9c1', fontSize: '15px' }}>What You'll Learn:</strong>
              <div style={{ color: '#cbd5e0', fontSize: '14px', lineHeight: '1.8' }}>
                {mission.whatYouLearn.split('\n\n').map((part, idx) => {
                  const isWhat = part.startsWith('WHAT:');
                  const isWhy  = part.startsWith('WHY:');
                  if (isWhat || isWhy) {
                    const label   = isWhat ? 'WHAT:' : 'WHY:';
                    const content = part.substring(label.length).trim();
                    return (
                      <div key={idx} style={{ marginBottom: idx === 0 ? '12px' : '0' }}>
                        <strong style={{ color: '#5dd9c1' }}>{label}</strong> {content}
                      </div>
                    );
                  }
                  return <div key={idx}>{part}</div>;
                })}
              </div>
            </div>
          )}
          {mission.steps && (
            <div style={{ marginTop: '15px', padding: '15px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>
              <strong style={{ display: 'block', marginBottom: '8px', color: '#cbd5e0' }}>Steps:</strong>
              <ul style={{ paddingLeft: '20px', color: '#a0aec0', fontSize: '13px', lineHeight: '1.8' }}>
                {mission.steps.map((step, idx) => <li key={idx}>{step}</li>)}
              </ul>
            </div>
          )}
        </>
      )}

      {/* Evidence input for detective missions */}
      {showEvidence && isDetective && !isCompleted && (
        <div style={{ marginTop: '15px', padding: '15px', background: 'rgba(59,130,246,0.1)', border: '1px solid #3b82f6', borderRadius: '8px' }}>
          <strong style={{ display: 'block', marginBottom: '8px', color: '#cbd5e0' }}>Submit Evidence:</strong>
          <textarea
            value={evidence}
            onChange={e => setEvidence(e.target.value)}
            placeholder="Enter your evidence (commit hash, author name, what you found…)"
            style={{
              width: '100%', minHeight: '80px', padding: '10px',
              background: '#2d3748', border: '1px solid #4a5568',
              borderRadius: '6px', color: '#fff', fontSize: '14px',
              resize: 'vertical', marginBottom: '10px',
            }}
          />
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleComplete} className="btn btn-complete" style={{ flex: 1 }} disabled={!evidence.trim()}>
              Submit &amp; Complete
            </button>
            <button onClick={() => { setShowEvidence(false); setEvidence(''); }} className="btn" style={{ flex: 1, background: '#4a5568', color: '#fff' }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="mission-actions">
        {mission.steps && (
          <button onClick={() => setExpanded(!expanded)} className="btn" style={{ background: '#4a5568', color: '#fff' }}>
            {expanded ? 'Hide Details' : 'Show Details'}
          </button>
        )}

        {!isCompleted && !showEvidence && (
          <button onClick={handleComplete} className="btn btn-complete">
            {isDetective ? 'Submit Evidence' : 'Complete'}
          </button>
        )}

        {isCompleted && (
          <button disabled className="btn btn-completed">Quest Completed!</button>
        )}
      </div>
    </div>
  );
}
