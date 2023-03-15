import { chakra, Container, Heading, Button, useToast } from "@chakra-ui/react"
import { useAuthContext } from '../../feature/auth/provider/AuthProvider';
import { getAuth, signOut } from '@firebase/auth';
import { FirebaseError } from '@firebase/util';
import { useState } from 'react';
import { useRouter } from "next/router";

export const Header = () => {
  const { user } = useAuthContext()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const toast = useToast()
  const { push } = useRouter()

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      const auth = getAuth()
      await signOut(auth)
      toast({
        title: 'ログアウトしました。',
        status: 'success',
        position: 'top'
      })
      push('/signin')
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e)
      } 
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <chakra.header py={4} bgColor={'blue.600'}>
      <Container maxW={'container.lg'}>
        <Heading color={'white'}>
          {user ? (
            <Button colorScheme={'teal'} onClick={handleSignOut} isLoading={isLoading}>サインアウト</Button>
          ) : 'ログアウト'}
        </Heading>
      </Container>
    </chakra.header>
  )
}