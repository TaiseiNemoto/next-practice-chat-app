import {
  Container,
  Heading,
  Spacer,
  chakra,
  Input,
  Button,
  Flex,
  Avatar,
  Box,
  Text,
} from '@chakra-ui/react'
import { useState, FormEvent, useEffect, useRef } from 'react'
import { getDatabase, onChildAdded, push, ref } from '@firebase/database'
import { FirebaseError } from '@firebase/util'
import { AuthGuard } from '@src/feature/auth/component/AuthGuard'

type MessageProps = {
  message: string
}

const Message = ({ message }: MessageProps) => {
  return (
    <Flex alignItems={'start'}>
      <Avatar />
      <Box ml={2}>
        <Text bgColor={'gray.200'} rounded={'md'} px={2} py={1}>
          {message}
        </Text>
      </Box>
    </Flex>
  )
}

export const Page = () => {
  const [message, setMessage] = useState<string>('')
  const messageElementRef = useRef<HTMLDivElement | null>(null)

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const db = getDatabase()
      const dbRef = ref(db, 'chat')
      await push(dbRef, {
        message,
      })
      setMessage('')
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e)
      }
    }
  }

  const [chats, setChats] = useState<{ message: string }[]>([])

  useEffect(() => {
    try {
      const db = getDatabase()
      const dbRef = ref(db, 'chat')
      return onChildAdded(dbRef, (snapshot) => {
        const message = String(snapshot.val()['message'] ?? '')
        setChats((prev) => [...prev, { message }])
      })
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e)
      }
    }
  }, [])

  useEffect(() => {
    messageElementRef.current?.scrollTo({
      top: messageElementRef.current.scrollHeight,
    })
  }, [chats])

  return (
    <AuthGuard>
      <Container
        py={14}
        flex={1}
        display={'flex'}
        flexDirection={'column'}
        minHeight={0}
      >
        <Heading>チャット</Heading>
        <Spacer flex={'none'} height={4} aria-hidden />
        <Flex
          flexDirection={'column'}
          overflowY={'auto'}
          gap={2}
          height={400}
          ref={messageElementRef}
        >
          {chats.map((chat, index) => (
            <Message message={chat.message} key={`ChatMessage_${index}`} />
          ))}
        </Flex>
        <Spacer height={2} aria-hidden flex={'none'} />
        <chakra.form display={'flex'} gap={2} onSubmit={handleSendMessage}>
          <Input value={message} onChange={(e) => setMessage(e.target.value)} />
          <Button type={'submit'}>送信</Button>
        </chakra.form>
      </Container>
    </AuthGuard>
  )
}

export default Page
