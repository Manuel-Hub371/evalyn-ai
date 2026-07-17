import { redirect } from 'next/navigation'

export default function Home() {
  // Redirect to invitation page (in real app, would check for invite token)
  redirect('/invitation')
}
