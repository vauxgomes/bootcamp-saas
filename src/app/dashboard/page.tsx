import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import SignOutButton from './components/sign-out-button'

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session?.user) {
    redirect('/authentication')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-4">Bem-vindo, {session?.user?.name || 'Usuário'}!</p>
      <p className="mt-2">Seu e-mail: {session?.user?.email}</p>

      <SignOutButton />
    </div>
  )
}

export default DashboardPage
