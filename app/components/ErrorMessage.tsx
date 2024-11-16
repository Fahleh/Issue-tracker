import { Text } from '@radix-ui/themes';
import { PropsWithChildren } from 'react';

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;

  return (
    <Text color="red" size="1" align="center" as="p">
      {children}
    </Text>
  );
};

export default ErrorMessage;
