/* ---------------------------------------------------------------------
   Minimal line-icon set for the admin back-office.
   Thin stroke, currentColor — no emojis, so every icon inherits the
   surrounding text/accent colour and stays crisp at any size.
------------------------------------------------------------------------ */
const base = {
  width: '1em',
  height: '1em',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const IconBox = (props) => (
  <svg {...base} {...props}>
    <path d="M12 3.5 20.5 8 12 12.5 3.5 8 12 3.5Z" />
    <path d="M3.5 8v8L12 20.5 20.5 16V8" />
    <path d="M12 12.5V20.5" />
  </svg>
)

export const IconReceipt = (props) => (
  <svg {...base} {...props}>
    <path d="M6 3h12v18l-2.5-1.6L13 21l-2.5-1.6L8 21l-2-1.6V3Z" />
    <path d="M9 8h6M9 11.5h6M9 15h4" />
  </svg>
)

export const IconChat = (props) => (
  <svg {...base} {...props}>
    <path d="M4 5.5h16v11H9.5L5 20v-3.5H4v-11Z" />
    <path d="M8 9.5h8M8 12.5h5" />
  </svg>
)

export const IconCheckCircle = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M8.5 12.2 11 14.7l4.5-5.4" />
  </svg>
)

export const IconBan = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M6.5 6.5 17.5 17.5" />
  </svg>
)

export const IconLayers = (props) => (
  <svg {...base} {...props}>
    <path d="M12 3.5 20.5 8 12 12.5 3.5 8 12 3.5Z" />
    <path d="M4 11.5 12 16l8-4.5" />
    <path d="M4 15.5 12 20l8-4.5" />
  </svg>
)

export const IconPlus = (props) => (
  <svg {...base} {...props}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)

export const IconTag = (props) => (
  <svg {...base} {...props}>
    <path d="M12.5 3.5H5a1.5 1.5 0 0 0-1.5 1.5v7.5L13.5 22.5a1.5 1.5 0 0 0 2.12 0l6.88-6.88a1.5 1.5 0 0 0 0-2.12L12.5 3.5Z" />
    <circle cx="8.2" cy="8.2" r="1.3" />
  </svg>
)

export const IconLock = (props) => (
  <svg {...base} {...props}>
    <rect x="5.5" y="10.5" width="13" height="9.5" rx="2" />
    <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
  </svg>
)

export const IconLogout = (props) => (
  <svg {...base} {...props}>
    <path d="M14.5 8V6a1.5 1.5 0 0 0-1.5-1.5H6A1.5 1.5 0 0 0 4.5 6v12A1.5 1.5 0 0 0 6 19.5h7a1.5 1.5 0 0 0 1.5-1.5v-2" />
    <path d="M10.5 12H20M20 12l-3-3M20 12l-3 3" />
  </svg>
)

export const IconTrash = (props) => (
  <svg {...base} {...props}>
    <path d="M5 7h14M9.5 7V5a1.5 1.5 0 0 1 1.5-1.5h2A1.5 1.5 0 0 1 14.5 5v2M18 7l-.8 12a2 2 0 0 1-2 1.9H8.8a2 2 0 0 1-2-1.9L6 7" />
    <path d="M10 11v6M14 11v6" />
  </svg>
)

export const IconSend = (props) => (
  <svg {...base} {...props}>
    <path d="M4.5 12 20 4.5 13 19.5l-2.4-6.1L4.5 12Z" />
    <path d="M10.6 13.4 20 4.5" />
  </svg>
)

export const IconSparkle = (props) => (
  <svg {...base} {...props}>
    <path d="M12 3.5c.5 3 2.3 4.8 5.3 5.3-3 .5-4.8 2.3-5.3 5.3-.5-3-2.3-4.8-5.3-5.3 3-.5 4.8-2.3 5.3-5.3Z" />
    <path d="M18.5 15c.3 1.5 1.1 2.4 2.6 2.7-1.5.3-2.4 1.1-2.7 2.6-.3-1.5-1.1-2.4-2.6-2.7 1.5-.3 2.4-1.1 2.7-2.6Z" />
  </svg>
)

export const IconInbox = (props) => (
  <svg {...base} {...props}>
    <path d="M4 12.5h4.2l1.4 2.5h4.8l1.4-2.5H20" />
    <path d="M6 5.5h12l2 7v6a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-6l2-7Z" />
  </svg>
)
