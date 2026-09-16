import { useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import './SupportChat.css'

function getSessionId() {
  let id = localStorage.getItem('hjz_chat_session')
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem('hjz_chat_session', id)
  }
  return id
}

export default function SupportChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [draft, setDraft] = useState('')
  const [sending, setSending] = useState(false)
  const sessionId = useRef(getSessionId())
  const bottomRef = useRef(null)

  const loadMessages = async () => {
    const { data } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('session_id', sessionId.current)
      .order('created_at', { ascending: true })
    if (data) setMessages(data)
  }

  useEffect(() => {
    if (!open) return
    loadMessages()

    const channel = supabase
      .channel(`chat-${sessionId.current}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `session_id=eq.${sessionId.current}`,
        },
        (payload) => setMessages((prev) => [...prev, payload.new])
      )
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async (e) => {
    e.preventDefault()
    const text = draft.trim()
    if (!text || sending) return
    setSending(true)
    setDraft('')
    await supabase.from('chat_messages').insert({
      session_id: sessionId.current,
      sender: 'client',
      message: text,
    })
    setSending(false)
  }

  return (
    <>
      <button className="support-fab" onClick={() => setOpen((v) => !v)} aria-label="Assistance">
        {open ? '✕' : '💬'}
      </button>

      {open && (
        <div className="support-panel">
          <div className="support-panel__header">
            <h4>Assistance HJZ</h4>
            <p>Une question sur une commande ou un produit ? Écrivez-nous.</p>
          </div>

          <div className="support-panel__messages">
            {messages.length === 0 && (
              <p className="support-panel__empty">Aucun message pour l'instant. Dites-nous bonjour !</p>
            )}
            {messages.map((m) => (
              <div key={m.id} className={`support-msg support-msg--${m.sender}`}>
                {m.message}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <form className="support-panel__form" onSubmit={send}>
            <input
              type="text"
              placeholder="Votre message..."
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
            <button type="submit" className="btn btn-solid" disabled={sending || !draft.trim()}>
              Envoyer
            </button>
          </form>
        </div>
      )}
    </>
  )
}
