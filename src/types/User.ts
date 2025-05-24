export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface Recording {
  id: string
  title: string
  duration: string
  date: string
  type: "video" | "audio"
  thumbnail?: string
  filePath: string
}

export interface Script {
  id: string
  content: string
  title?: string
  createdAt: string
}
