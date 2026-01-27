// Connected Apps data
// Icons are referenced by their Iconify name instead of React elements
export type ConnectedApp = {
  name: string
  logoIcon: string
  connected: boolean
  desc: string
}

export const connectedApps: ConnectedApp[] = [
  {
    name: "Telegram",
    logoIcon: "logos:telegram",
    connected: false,
    desc: "Connect with Telegram for real-time communication.",
  },
  {
    name: "Notion",
    logoIcon: "logos:notion-icon",
    connected: true,
    desc: "Effortlessly sync Notion pages for seamless collaboration.",
  },
  {
    name: "Figma",
    logoIcon: "logos:figma",
    connected: true,
    desc: "View and collaborate on Figma designs in one place.",
  },
  {
    name: "Trello",
    logoIcon: "logos:trello",
    connected: false,
    desc: "Sync Trello cards for streamlined project management.",
  },
  {
    name: "Slack",
    logoIcon: "logos:slack-icon",
    connected: false,
    desc: "Integrate Slack for efficient team communication",
  },
  {
    name: "Zoom",
    logoIcon: "logos:zoom-icon",
    connected: true,
    desc: "Host Zoom meetings directly from the dashboard.",
  },
  {
    name: "Stripe",
    logoIcon: "logos:stripe",
    connected: false,
    desc: "Easily manage Stripe transactions and payments.",
  },
  {
    name: "Gmail",
    logoIcon: "logos:google-gmail",
    connected: true,
    desc: "Access and manage Gmail messages effortlessly.",
  },
  {
    name: "Medium",
    logoIcon: "logos:medium-icon",
    connected: false,
    desc: "Explore and share Medium stories on your dashboard.",
  },
  {
    name: "Skype",
    logoIcon: "logos:skype",
    connected: false,
    desc: "Connect with Skype contacts seamlessly.",
  },
  {
    name: "Docker",
    logoIcon: "logos:docker-icon",
    connected: false,
    desc: "Effortlessly manage Docker containers on your dashboard.",
  },
  {
    name: "GitHub",
    logoIcon: "logos:github-icon",
    connected: false,
    desc: "Streamline code management with GitHub integration.",
  },
  {
    name: "GitLab",
    logoIcon: "logos:gitlab-icon",
    connected: false,
    desc: "Efficiently manage code projects with GitLab integration.",
  },
  {
    name: "Discord",
    logoIcon: "logos:discord-icon",
    connected: false,
    desc: "Connect with Discord for seamless team communication.",
  },
  {
    name: "WhatsApp",
    logoIcon: "logos:whatsapp-icon",
    connected: false,
    desc: "Easily integrate WhatsApp for direct messaging.",
  },
]

export const getConnectedApps = () => connectedApps
