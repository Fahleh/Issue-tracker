'use client';

import {
  Box,
  Button,
  Callout,
  Card,
  Container,
  Flex,
  Heading,
  TextField,
} from '@radix-ui/themes';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ErrorMessage, Spinner } from '../components';
import { registerSchema } from '../validationSchema';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { parseError } from '@/app/util';

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegInput {
  item: 'name' | 'email' | 'password' | 'confirmPassword';
  type: string;
  placeholder: string;
}

const RegisterationPage = () => {
  const router = useRouter();

  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = handleSubmit(async (data: RegisterFormData) => {
    try {
      setSubmitting(true);

      await axios.post('/api/register', data);

      router.push('/api/auth/signin');
    } catch (error) {
      setSubmitting(false);

      const errorMessage = parseError(error);

      setError(errorMessage);
    }
  });

  return (
    <Container mt="9" className="  ">
      <Card mx="auto" className=" md:max-w-xl">
        <Heading size="6" mb="5">
          Registeration Form
        </Heading>

        {error && (
          <Callout.Root color="red" className="mb-3" size="1">
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}

        <form className=" space-y-5  px-2 py-5" onSubmit={onSubmit}>
          {regInputs.map((input) => (
            <div key={input.item}>
              <TextField.Root>
                <TextField.Input
                  type={input.type}
                  placeholder={input.placeholder}
                  {...register(input.item)}
                />
              </TextField.Root>

              <ErrorMessage>{errors[input.item]?.message}</ErrorMessage>
            </div>
          ))}

          <Button disabled={isSubmitting}>
            Register
            {isSubmitting && <Spinner />}
          </Button>
        </form>
      </Card>
    </Container>
  );
};

const regInputs: RegInput[] = [
  { item: 'name', type: 'text', placeholder: 'Name' },
  { item: 'email', type: '', placeholder: 'Email' },
  { item: 'password', type: 'password', placeholder: 'Password' },
  {
    item: 'confirmPassword',
    type: 'password',
    placeholder: 'Confirm password',
  },
];

export default RegisterationPage;
