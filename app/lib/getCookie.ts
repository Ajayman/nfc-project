import {cookies} from 'next/headers'

export function getCookie(name: string){
    const cookieStore = cookies()
  const theme = cookieStore.get(name)
  return theme
}