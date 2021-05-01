import React, { ReactNode } from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';

type Props = {
  children: ReactNode;
};

export default function App(props: Props) {
  const { children } = props;
  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode="dark" />
      {children}
    </ChakraProvider>
  );
}
