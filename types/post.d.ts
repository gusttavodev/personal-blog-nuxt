export interface Profile {
  id: uuid
  updated_at: string,
  username: string,
  avatar_url: string
  website: string
}

export interface Post {
  id: number
  title: string,
  description: string,
  read_time: string
  path: string
  categories: array<object>
  profiles: Profile
  created_at: string
  user: string
}
