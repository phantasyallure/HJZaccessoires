import { useEffect, useMemo, useRef, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { IconChat, IconSend, IconX } from '../../components/AdminIcons.jsx'

const DISMISSED_KEY = 'hjz_admin_dismissed_chats'

function loadDismissed() {
  try {
    return JSON.parse(localStorage.getItem(DISMISSED_KEY) || '{}')
  } catch {
    return {}
  }
}

export default function ChatTab() {
  const [messages, setMessages] = useState([])
  const [activeSession, setActiveSession] = useState(null)
  const [draft, setDraft] = useState('')
  const [dismissed, setDismissed] = useState(loadDismissed)
  const bottomRef = useRef(null)

  const loadAll = async () => {
    const { data } = await supabase
      .from('chat_messages')
      .select('*')
      .order('created_at', { ascending: true })
    setMessages(data || [])
  }

  useEffect(() => {
    loadAll()
    const channel = supabase
      .channel('admin-chat')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages' }, (payload) => {
        setMessages((prev) => [...prev, payload.new])
      })
      .subscribe()
    return () => supabase.removeChannel(channel)
  }, [])

  const allSessions = useMemo(() => {
    const map = new Map()
    for (const m of messages) {
      const existing = map.get(m.session_id) || { session_id: m.session_id, count: 0 }
      existing.last = m
      existing.count += 1
      map.set(m.session_id, existing)
    }
    return [...map.values()].sort(
      (a, b) => new Date(b.last.created_at) - new Date(a.last.created_at)
    )
  }, [messages])

  // A closed chat stays hidden unless the client sends a new message after it was closed.
  const sessions = useMemo(
    () => allSessions.filter((s) => {
      const closedAt = dismissed[s.session_id]
      return !closedAt || new Date(s.last.created_at) > new Date(closedAt)
    }),
    [allSessions, dismissed]
  )

  useEffect(() => {
    if (activeSession && !sessions.some((s) => s.session_id === activeSession)) {
      setActiveSession(sessions[0]?.session_id || null)
    } else if (!activeSession && sessions.length > 0) {
      setActiveSession(sessions[0].session_id)
    }
  }, [sessions, activeSession])

  const conversation = messages.filter((m) => m.session_id === activeSession)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversation.length])

  const reply = async (e) => {
    e.preventDefault()
    const text = draft.trim()
    if (!text || !activeSession) return
    setDraft('')
    await supabase.from('chat_messages').insert({
      session_id: activeSession,
      sender: 'admin',
      message: text,
    })
  }

  const closeChat = (sessionId) => {
    setDismissed((prev) => {
      const next = { ...prev, [sessionId]: new Date().toISOString() }
      localStorage.setItem(DISMISSED_KEY, JSON.stringify(next))
      return next
    })
    if (activeSession === sessionId) setActiveSession(null)
  }

  const activeLabel = activeSession ? `Client ${activeSession.slice(0, 8)}` : ''

  return (
    <div className="admin-card admin-chat">
      <div className="admin-chat__sessions">
        <h3><IconChat /> Conversations ({sessions.length})</h3>
        {sessions.length === 0 && <p className="admin-hint">Aucun message reçu.</p>}
        {sessions.map((s) => (
          <div
            key={s.session_id}
            className={`admin-chat__session ${s.session_id === activeSession ? 'is-active' : ''}`}
          >
            <button
              type="button"
              className="admin-chat__session__main"
              onClick={() => setActiveSession(s.session_id)}
            >
              <span className="admin-chat__session__avatar" aria-hidden="true">
                {s.session_id.slice(0, 2).toUpperCase()}
              </span>
              <span className="admin-chat__session__body">
                <span>Client {s.session_id.slice(0, 8)}</span>
                <small>{s.last.message.slice(0, 34)}{s.last.message.length > 34 ? '…' : ''}</small>
              </span>
            </button>
            <button
              type="button"
              className="admin-chat__session__close"
              onClick={(e) => { e.stopPropagation(); closeChat(s.session_id) }}
              aria-label="Fermer la conversation"
              title="Fermer la conversation"
            >
              <IconX />
            </button>
          </div>
        ))}
      </div>

      <div className="admin-chat__thread">
        {!activeSession && <p className="admin-hint">Sélectionnez une conversation.</p>}
        {activeSession && (
          <>
            <div className="admin-chat__thread-header">
              <span>{activeLabel}</span>
              <button
                type="button"
                className="btn admin-chat__close-btn"
                onClick={() => closeChat(activeSession)}
              >
                <IconX /> Fermer le chat
              </button>
            </div>
            <div className="admin-chat__messages">
              {conversation.map((m) => (
                <div key={m.id} className={`support-msg support-msg--${m.sender}`}>
                  {m.message}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
            <form className="admin-chat__form" onSubmit={reply}>
              <input
                type="text"
                placeholder="Répondre au client..."
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
              />
              <button type="submit" className="btn btn-solid" disabled={!draft.trim()}><IconSend /> Envoyer</button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
