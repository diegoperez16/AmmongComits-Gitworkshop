'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface ScoreEntry {
  id: string;
  username: string;
  score: number;
  game_time: number;
  created_at: string;
}

const s = {
  wrap:       { maxWidth: 640, margin: '0 auto', padding: '40px 24px' } as React.CSSProperties,
  heading:    { fontSize: 28, fontWeight: 800, color: '#4db8a8', marginBottom: 4, textAlign: 'center' as const },
  sub:        { fontSize: 13, color: '#6b7280', textAlign: 'center' as const, marginBottom: 4 },
  refresh:    { fontSize: 11, color: '#4b5563', textAlign: 'center' as const, marginBottom: 32 },
  card:       { background: 'rgba(20,20,36,0.95)', border: '1px solid #2d3748', borderRadius: 12, overflow: 'hidden' } as React.CSSProperties,
  headerRow:  { display: 'grid', gridTemplateColumns: '40px 1fr 100px 80px 100px', gap: 8, padding: '10px 20px', borderBottom: '1px solid #2d3748', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#4b5563' },
  row:        { display: 'grid', gridTemplateColumns: '40px 1fr 100px 80px 100px', gap: 8, padding: '14px 20px', borderBottom: '1px solid #1a1a2e', alignItems: 'center' } as React.CSSProperties,
  rank:       { fontWeight: 700, fontSize: 15 } as React.CSSProperties,
  name:       { fontFamily: 'monospace', fontWeight: 600, color: '#e8e8f0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const },
  score:      { fontFamily: 'monospace', fontWeight: 700, fontSize: 17, color: '#4db8a8', textAlign: 'right' as const },
  time:       { fontFamily: 'monospace', fontSize: 13, color: '#6b7280', textAlign: 'right' as const },
  date:       { fontSize: 11, color: '#4b5563', textAlign: 'right' as const },
  empty:      { padding: '48px 24px', textAlign: 'center' as const, color: '#4b5563', fontSize: 14 },
  footer:     { fontSize: 11, color: '#374151', textAlign: 'center' as const, marginTop: 20 },
  loading:    { padding: '48px 24px', textAlign: 'center' as const, color: '#4db8a8', fontSize: 15 },
};

const rankColor = (i: number) => i === 0 ? '#FFD700' : i === 1 ? '#C0C0C0' : i === 2 ? '#CD7F32' : '#4b5563';

const fmt = {
  time: (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`,
  date: (iso: string) => new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
};

export default function Leaderboard() {
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const load = async () => {
    const { data, error } = await supabase.from('scores').select('*').order('score', { ascending: false });
    if (!error && data) {
      // Keep only the top score per user
      const seen = new Set<string>();
      const deduped: ScoreEntry[] = [];
      for (const entry of data as ScoreEntry[]) {
        if (!seen.has(entry.username)) {
          seen.add(entry.username);
          deduped.push(entry);
          if (deduped.length === 10) break;
        }
      }
      setScores(deduped);
    }
    setLoading(false);
    setLastRefresh(new Date());
  };

  useEffect(() => { load(); const t = setInterval(load, 30000); return () => clearInterval(t); }, []);

  return (
    <div style={s.wrap}>
      <h2 style={s.heading}>GAME LEADERBOARD</h2>
      <p style={s.sub}>Top scores from Neon Runner: Artifact Heist</p>
      <p style={s.refresh}>Refreshes every 30s · Last update: {lastRefresh.toLocaleTimeString()}</p>

      {loading ? (
        <div style={s.card}><div style={s.loading}>Loading scores…</div></div>
      ) : scores.length === 0 ? (
        <div style={s.card}>
          <div style={s.empty}>
            <div style={{ fontSize: 13, marginBottom: 8 }}>No scores yet</div>
            <div style={{ color: '#374151' }}>Play the game to get on the board. Make sure <code style={{ color: '#4db8a8' }}>supabase_config.json</code> is set up.</div>
          </div>
        </div>
      ) : (
        <div style={s.card}>
          <div style={s.headerRow}>
            <span>#</span><span>Player</span>
            <span style={{ textAlign: 'right' }}>Score</span>
            <span style={{ textAlign: 'right' }}>Time</span>
            <span style={{ textAlign: 'right' }}>Date</span>
          </div>
          {scores.map((entry, i) => (
            <div key={entry.id} style={{ ...s.row, background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)' }}>
              <span style={{ ...s.rank, color: rankColor(i) }}>{i + 1}</span>
              <span style={s.name}>{entry.username}</span>
              <span style={s.score}>{entry.score.toLocaleString()}</span>
              <span style={s.time}>{fmt.time(entry.game_time)}</span>
              <span style={s.date}>{fmt.date(entry.created_at)}</span>
            </div>
          ))}
        </div>
      )}
      <p style={s.footer}>Scores submit automatically when the game ends.</p>
    </div>
  );
}
