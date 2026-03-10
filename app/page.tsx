'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { MISSIONS, Mission } from '@/lib/missions';
import LoginScreen from '@/components/LoginScreen';
import MissionBoard from '@/components/MissionBoard';
import Leaderboard from '@/components/Leaderboard';
import ProgressPanel from '@/components/ProgressPanel';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'colorstack';

type View = 'missions' | 'leaderboard' | 'admin';

const bg = { minHeight: '100vh', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' };

const navStyle: React.CSSProperties = {
  position: 'sticky', top: 0, zIndex: 50,
  borderBottom: '1px solid #2d3748',
  background: 'rgba(10,10,20,0.97)',
  backdropFilter: 'blur(8px)',
};

const navInner: React.CSSProperties = {
  maxWidth: 1280, margin: '0 auto', padding: '0 24px',
  display: 'flex', alignItems: 'center', gap: 4, height: 48,
};

function tabBtn(active: boolean, accent: string): React.CSSProperties {
  return {
    padding: '6px 16px', borderRadius: '6px 6px 0 0',
    border: 'none', borderBottom: active ? `2px solid ${accent}` : '2px solid transparent',
    cursor: 'pointer', fontSize: 14, fontWeight: 600,
    background: active ? accent + '22' : 'transparent',
    color: active ? accent : '#6b7280',
    transition: 'all 0.2s',
  };
}

export default function Home() {
  const [user, setUser]       = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [missions, setMissions] = useState<Mission[]>(MISSIONS.filter(m => m.category !== 'unlocked'));
  const [loading, setLoading] = useState(true);
  const [view, setView]       = useState<View>('missions');

  // Admin password gate — shown right after "admin" logs in
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);
  const [adminInput, setAdminInput]           = useState('');
  const [adminError, setAdminError]           = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('workshop_user');
    const savedAdmin = localStorage.getItem('workshop_is_admin') === 'true';
    if (saved) { setUser(saved); if (savedAdmin) { setIsAdmin(true); setView('admin'); } }
    loadMissions();
    const interval = setInterval(loadMissions, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadMissions = async () => {
    try {
      const { data, error } = await supabase.from('missions').select('*');
      const base = MISSIONS.filter(m => m.category !== 'unlocked');
      if (!error && data && data.length > 0) {
        setMissions(base.map(m => {
          const db: any = data.find((d: any) => d.mission_id === m.mission_id);
          return { ...m, completedBy: db?.completed_by || m.completedBy };
        }));
      } else {
        setMissions(base);
      }
    } catch {
      setMissions(MISSIONS.filter(m => m.category !== 'unlocked'));
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (username: string) => {
    try {
      // Upsert user in DB
      const { data: existing } = await supabase.from('users').select('*').eq('username', username).single();
      if (!existing) {
        const { error } = await supabase.from('users').insert({ username } as any).select().single();
        if (error) { alert('Error connecting to database.'); return; }
      }
      localStorage.setItem('workshop_user', username);
      setUser(username);
      await loadMissions();

      // If admin username, immediately prompt for password
      if (username === ADMIN_USERNAME) {
        setShowAdminPrompt(true);
      }
    } catch {
      alert('Error connecting to database. Please check your Supabase configuration.');
    }
  };

  const handleAdminUnlock = () => {
    if (adminInput === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setView('admin');
      setShowAdminPrompt(false);
      setAdminInput('');
      setAdminError('');
      localStorage.setItem('workshop_is_admin', 'true');
    } else {
      setAdminError('Incorrect password.');
      setAdminInput('');
    }
  };

  const handleAdminCancel = () => {
    // Cancel = log out (don't let "admin" linger as a regular user)
    handleLogout();
    setShowAdminPrompt(false);
    setAdminInput('');
    setAdminError('');
  };

  const handleLogout = () => {
    localStorage.removeItem('workshop_user');
    localStorage.removeItem('workshop_is_admin');
    setUser(null);
    setIsAdmin(false);
    setView('missions');
  };

  const handleCompleteMission = async (missionId: string) => {
    if (!user) return;
    const mission = missions.find(m => m.mission_id === missionId);
    const newCompletedBy = [...(mission?.completedBy || []), user];
    const { error } = await supabase.from('missions').upsert({
      mission_id: missionId,
      title: mission?.title || '',
      description: mission?.description || '',
      category: mission?.category || 'default',
      difficulty: mission?.difficulty || '',
      claimed_by: null, claimed_at: null,
      completed_by: newCompletedBy,
    } as any, { onConflict: 'mission_id' });
    if (error) { alert('Error updating mission.'); return; }
    await loadMissions();
  };

  if (loading) {
    return (
      <div style={{ ...bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#4db8a8', fontSize: 22 }}>Loading Mission Board…</div>
      </div>
    );
  }

  if (!user) return <LoginScreen onLogin={handleLogin} />;

  // ── Admin view ──────────────────────────────────────────
  if (isAdmin) {
    return (
      <div style={bg}>
        <div style={navStyle}>
          <div style={navInner}>
            <button style={tabBtn(view === 'admin', '#a855f7')} onClick={() => setView('admin')}>Progress</button>
            <button style={tabBtn(view === 'leaderboard', '#f59e0b')} onClick={() => setView('leaderboard')}>Leaderboard</button>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ color: '#a855f7', fontSize: 13, fontWeight: 600 }}>Admin</span>
              <button onClick={handleLogout} style={{ color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12 }}>logout</button>
            </div>
          </div>
        </div>
        {view === 'admin'       && <ProgressPanel />}
        {view === 'leaderboard' && <Leaderboard />}
      </div>
    );
  }

  // ── Regular user view ────────────────────────────────────
  return (
    <div style={bg}>
      {/* Admin password prompt */}
      {showAdminPrompt && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.75)' }}>
          <div style={{ background: '#1a1a2e', borderRadius: 12, padding: 28, width: 320, border: '1px solid #2d3748' }}>
            <h3 style={{ color: '#a855f7', fontWeight: 700, marginBottom: 8, fontSize: 18 }}>Admin Access</h3>
            <p style={{ color: '#9ca3af', fontSize: 14, marginBottom: 16 }}>Enter the facilitator password to continue.</p>
            <input
              type="password"
              value={adminInput}
              onChange={e => { setAdminInput(e.target.value); setAdminError(''); }}
              onKeyDown={e => e.key === 'Enter' && handleAdminUnlock()}
              placeholder="Password"
              autoFocus
              style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: `1px solid ${adminError ? '#f87171' : '#4a5568'}`, color: '#fff', fontSize: 14, marginBottom: 6, outline: 'none', boxSizing: 'border-box' }}
            />
            {adminError && <p style={{ color: '#f87171', fontSize: 12, marginBottom: 10 }}>{adminError}</p>}
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <button onClick={handleAdminUnlock} style={{ flex: 1, padding: 10, borderRadius: 8, background: '#a855f7', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                Unlock
              </button>
              <button onClick={handleAdminCancel} style={{ padding: '10px 16px', borderRadius: 8, background: 'rgba(255,255,255,0.05)', color: '#9ca3af', border: 'none', cursor: 'pointer', fontSize: 14 }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={navStyle}>
        <div style={navInner}>
          <button style={tabBtn(view === 'missions',    '#4db8a8')} onClick={() => setView('missions')}>Missions</button>
          <button style={tabBtn(view === 'leaderboard', '#f59e0b')} onClick={() => setView('leaderboard')}>Leaderboard</button>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: '#9ca3af', fontSize: 13 }}>{user}</span>
            <button onClick={handleLogout} style={{ color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12 }}>logout</button>
          </div>
        </div>
      </div>

      {view === 'missions'    && <MissionBoard user={user} missions={missions} onCompleteMission={handleCompleteMission} />}
      {view === 'leaderboard' && <Leaderboard />}
    </div>
  );
}
