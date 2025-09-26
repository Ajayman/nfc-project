import { cookies } from 'next/headers'
import ClientComponent from '@components/cookieClient'

export function getAuthorizationCookie() {
  const cookieStore = cookies()
  const theme = cookieStore.get("Authorization")
  return <ClientComponent theme={theme} />
}