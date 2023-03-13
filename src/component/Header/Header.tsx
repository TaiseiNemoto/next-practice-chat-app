import { chakra, Container, Heading } from "@chakra-ui/react"
import { useAuthContext } from '../../feature/auth/provider/AuthProvider';

export const Header = () => {
  const { user } = useAuthContext()

  return (
    <chakra.header py={4} bgColor={'blue.600'}>
      <Container maxW={'container.lg'}>
        <Heading color={'white'}>
          {user ? 'ログイン中' : 'ログアウト'}
        </Heading>
      </Container>
    </chakra.header>
  )
}