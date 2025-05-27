'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { authClient } from '@/lib/auth-client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const signUpSchema = z.object({
  name: z.string().trim().min(1, { message: 'Nome é obrigatório' }),
  email: z.string().trim().email({ message: 'E-mail inválido' }),
  password: z
    .string()
    .trim()
    .min(6, { message: 'Senha deve ter pelo menos 6 caracteres' })
})

const SignUpForm = () => {
  const router = useRouter()

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    await authClient.signUp.email(
      {
        email: values.email,
        password: values.password,
        name: values.name
      },
      {
        onSuccess: () => {
          router.push('/dashboard')
        }
      }
    )
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Header */}
          <CardHeader>
            <CardTitle>Criar conta</CardTitle>
            <CardDescription>
              Crie uma nova conta para acessar nossos serviços.
            </CardDescription>
          </CardHeader>

          {/* Form Fields */}
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu e-mail" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite sua senha"
                      {...field}
                      type="password"
                      autoComplete="false"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          {/* Footer */}
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Criar conta'
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

export default SignUpForm
