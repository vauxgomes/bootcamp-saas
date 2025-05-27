import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import SignInForm from './components/sign-in-form'
import SignUpForm from './components/sign-up-form'

const AuthenticationPage = async () => {
  const seession = await auth.api.getSession({
    headers: await headers()
  })

  if (seession?.user) {
    return redirect('/dashboard')
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Criar conta</TabsTrigger>
        </TabsList>

        {/* Login */}
        <TabsContent value="login">
          <SignInForm />
        </TabsContent>

        {/* Register */}
        <TabsContent value="register">
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AuthenticationPage
