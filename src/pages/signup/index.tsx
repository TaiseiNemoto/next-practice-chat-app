import { Container, Heading, chakra, Spacer, Grid, Box, FormControl, FormLabel, Input, Center, Button } from '@chakra-ui/react';
import { useState } from 'react';

export const Page = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSubmit = () => {
    console.log({ email, password });
  }

  return (
    <Container py={14}>
      <Heading>サインアップ</Heading>
      <chakra.form  onSubmit={handleSubmit}>
        <Spacer  height={8} aria-hidden />
        <Grid gap={4}>
          <Box display={'contents'}>
            <FormControl>
              <FormLabel>メールアドレス</FormLabel>
              <Input type={'email'} />
            </FormControl>
            <FormControl>
              <FormLabel>パスワード</FormLabel>
              <Input type={'password'} />
            </FormControl>
          </Box>
        </Grid>
        <Spacer  height={4} aria-hidden />
        <Center>
          <Button type={'submit'}>アカウントを作成</Button>
        </Center>
      </chakra.form>
    </Container>
  )
}

export default Page