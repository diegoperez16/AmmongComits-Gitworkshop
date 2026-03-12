'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { MISSIONS } from '@/lib/missions';

interface UserProgress {
  username: string;
  default: number;
  detective: number;
  total: number;
}

const TOTAL_DEFAULT   = MISSIONS.filter(m => m.category === 'default').length;
const TOTAL_DETECTIVE = MISSIONS.filter(m => m.category === 'detective').length;
const TOTAL_MISSIONS  = TOTAL_DEFAULT + TOTAL_DETECTIVE;

const s = {
  wrap:        { maxWidth: 760, margin: '0 auto', padding: '40px 24px' } as React.CSSProperties,
  heading:     { fontSize: 28, fontWeight: 800, color: '#a855f7', marginBottom: 4, textAlign: 'center' as const },
  sub:         { fontSize: 13, color: '#6b7280', textAlign: 'center' as const, marginBottom: 4 },
  refresh:     { fontSize: 11, color: '#4b5563', textAlign: 'center' as const, marginBottom: 32 },
  summaryGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 } as React.CSSProperties,
  summaryCard: { background: 'rgba(20,20,36,0.95)', border: '1px solid #2d3748', borderRadius: 10, padding: '12px 16px', textAlign: 'center' as const } as React.CSSProperties,
  summaryNum:  { fontSize: 26, fontWeight: 800 } as React.CSSProperties,
  summaryLbl:  { fontSize: 11, color: '#6b7280', marginTop: 2 } as React.CSSProperties,
  sortRow:     { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 } as React.CSSProperties,
  sortLabel:   { fontSize: 13, color: '#6b7280' } as React.CSSProperties,
  card:        { background: 'rgba(20,20,36,0.95)', border: '1px solid #2d3748', borderRadius: 12, overflow: 'hidden' } as React.CSSProperties,
  headerRow:   { display: 'grid', gridTemplateColumns: '180px 1fr 1fr 1fr', gap: 8, padding: '10px 20px', borderBottom: '1px solid #2d3748', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#4b5563' },
  row:         { display: 'grid', gridTemplateColumns: '180px 1fr 1fr 1fr', gap: 8, padding: '12px 20px', borderBottom: '1px solid #1a1a2e', alignItems: 'center' } as React.CSSProperties,
  name:        { fontFamily: 'monospace', fontWeight: 600, color: '#e8e8f0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const, fontSize: 13 },
  empty:       { padding: '48px 24px', textAlign: 'center' as const, color: '#4b5563', fontSize: 14 },
  loading:     { padding: '48px 24px', textAlign: 'center' as const, color: '#a855f7', fontSize: 15 },
};

function ProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1, height: 6, borderRadius: 9999, background: '#2d3748', overflow: 'hidden' }}>
        <div style={{ height: '100%', borderRadius: 9999, backgroundColor: color, width: `${pct}%`, transition: 'width 0.3s' }} />
      </div>
      <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#6b7280', width: 36, textAlign: 'right' }}>
        {value}/{max}
      </span>
    </div>
  );
}

export default function ProgressPanel() {
  const [progress, setProgress]       = useState<UserProgress[]>([]);
  const [loading, setLoading]         = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [sortBy, setSortBy]           = useState<'total' | 'detective'>('total');

  const loadProgress = async () => {
    const { data: missionData } = await supabase.from('missions').select('mission_id, completed_by, category');
    const { data: userData }    = await supabase.from('users').select('username') as { data: { username: string }[] | null };
    if (!userData) { setLoading(false); return; }

    const userMap: Record<string, UserProgress> = {};
    for (const u of userData) {
      userMap[u.username] = { username: u.username, default: 0, detective: 0, total: 0 };
    }

    for (const dbM of (missionData || [])) {
      const completed_by: string[] = dbM.completed_by || [];
      const cat: string = dbM.category;
      if (cat !== 'default' && cat !== 'detective') continue;
      for (const username of completed_by) {
        if (!userMap[username]) userMap[username] = { username, default: 0, detective: 0, total: 0 };
        userMap[username][cat as 'default' | 'detective']++;
        userMap[username].total++;
      }
    }

    const sorted = Object.values(userMap).sort((a, b) => b[sortBy] - a[sortBy]);
    setProgress(sorted);
    setLoading(false);
    setLastRefresh(new Date());
  };

  useEffect(() => {
    loadProgress();
    const interval = setInterval(loadProgress, 30000);
    return () => clearInterval(interval);
  }, [sortBy]);

  return (
    <div style={s.wrap}>
      <h2 style={s.heading}>EXERCISE PROGRESS</h2>
      <p style={s.sub}>Mission completions per participant</p>
      <p style={s.refresh}>Refreshes every 30s · Last update: {lastRefresh.toLocaleTimeString()}</p>

      <div style={s.summaryGrid}>
        {[
          { label: 'Git Basics missions', total: TOTAL_DEFAULT,   color: '#4db8a8' },
          { label: 'Detective missions',   total: TOTAL_DETECTIVE, color: '#f59e0b' },
        ].map(({ label, total, color }) => (
          <div key={label} style={s.summaryCard}>
            <div style={{ ...s.summaryNum, color }}>{total}</div>
            <div style={s.summaryLbl}>{label}</div>
          </div>
        ))}
      </div>

      <div style={s.sortRow}>
        <span style={s.sortLabel}>Sort by:</span>
        {(['total', 'detective'] as const).map(key => (
          <button
            key={key}
            onClick={() => setSortBy(key)}
            style={{
              padding: '4px 14px', borderRadius: 6, border: 'none', cursor: 'pointer',
              fontSize: 12, fontWeight: 600,
              background: sortBy === key ? '#a855f7' : 'rgba(255,255,255,0.05)',
              color:      sortBy === key ? '#fff'    : '#9ca3af',
            }}
          >
            {key === 'total' ? 'Total' : 'Detective'}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={s.card}><div style={s.loading}>Loading progress…</div></div>
      ) : progress.length === 0 ? (
        <div style={s.card}><div style={s.empty}>No participants yet.</div></div>
      ) : (
        <div style={s.card}>
          <div style={s.headerRow}>
            <span>Participant</span>
            <span>Git Basics</span>
            <span>Detective</span>
            <span>Total</span>
          </div>
          {progress.map((u, i) => (
            <div key={u.username} style={{ ...s.row, background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)' }}>
              <div style={s.name}>
                <span style={{ color: '#4b5563', marginRight: 8 }}>{i + 1}.</span>
                {u.username}
              </div>
              <ProgressBar value={u.default}   max={TOTAL_DEFAULT}   color="#4db8a8" />
              <ProgressBar value={u.detective} max={TOTAL_DETECTIVE} color="#f59e0b" />
              <ProgressBar value={u.total}     max={TOTAL_MISSIONS}  color="#a855f7" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
