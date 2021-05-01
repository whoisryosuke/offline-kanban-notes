import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box } from '@chakra-ui/layout';
import React from 'react';

interface Props {
  width?: string | number;
}

const Column = ({
  width,
  children,
  ...restProps
}: React.PropsWithChildren<Props>) => {
  const borderColor = useColorModeValue('gray.500', 'gray.700');
  return (
    <Box width={width ?? '250px'} height="100%" p={2} mr={4} {...restProps}>
      {children}
    </Box>
  );
};

export default Column;
