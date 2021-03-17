import { Button, IconButton } from '@chakra-ui/button';
import {
  AddIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  CopyIcon,
  HamburgerIcon,
  MinusIcon,
  PlusSquareIcon,
  RepeatIcon,
} from '@chakra-ui/icons';
import { Box, Flex, Grid, HStack } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import React from 'react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

function Navigation() {
  return (
    <Grid templateRows="1fr" templateColumns="1fr 70px">
      <HStack spacing="18px">
        <Button colorScheme="blue">Home</Button>
        <Box w="100px" minW="70px">
          <Select
            colorScheme="blue"
            placeholder="Image"
            variant="filled"
          ></Select>
        </Box>
        <Box w="140px" minW="70px">
          <Select
            colorScheme="blue"
            placeholder="Annotation"
            variant="filled"
          ></Select>
        </Box>
        <Box w="90px" minW="70px">
          <Select
            colorScheme="blue"
            placeholder="View"
            variant="filled"
          ></Select>
        </Box>
        <Box w="90px" minW="70px">
          <Select
            colorScheme="blue"
            placeholder="Help"
            variant="filled"
          ></Select>
        </Box>
        <Flex w={135} direction="row" justifyContent="space-evenly">
          <IconButton
            variant="outline"
            colorScheme="blue"
            aria-label="Call Sage"
            fontSize="20px"
            icon={<ChevronLeftIcon />}
          />
          <IconButton
            variant="outline"
            colorScheme="blue"
            aria-label="Call Sage"
            fontSize="20px"
            icon={<ChevronRightIcon />}
          />
          <IconButton
            variant="outline"
            colorScheme="blue"
            aria-label="Call Sage"
            fontSize="20px"
            icon={<HamburgerIcon />}
          />
        </Flex>
        <Flex w={135} direction="row" justifyContent="space-evenly">
          <IconButton
            variant="outline"
            colorScheme="blue"
            aria-label="Call Sage"
            fontSize="20px"
            icon={<AddIcon />}
          />
          <IconButton
            variant="outline"
            colorScheme="blue"
            aria-label="Call Sage"
            fontSize="20px"
            icon={<MinusIcon />}
          />
          <IconButton
            variant="outline"
            colorScheme="blue"
            aria-label="Call Sage"
            fontSize="20px"
            icon={<RepeatIcon />}
          />
        </Flex>
        <Flex w={180} direction="row" justifyContent="space-evenly">
          <IconButton
            variant="outline"
            colorScheme="blue"
            aria-label="Call Sage"
            fontSize="20px"
            icon={<CopyIcon />}
          />
          <IconButton
            variant="outline"
            colorScheme="blue"
            aria-label="Call Sage"
            fontSize="20px"
            icon={<PlusSquareIcon />}
          />
          <IconButton
            variant="outline"
            colorScheme="blue"
            aria-label="Call Sage"
            fontSize="20px"
            icon={<CheckIcon />}
          />
          <IconButton
            variant="outline"
            colorScheme="blue"
            aria-label="Call Sage"
            fontSize="20px"
            icon={<CloseIcon />}
          />
        </Flex>
      </HStack>
      <ColorModeSwitcher />
    </Grid>
  );
}

export default Navigation;
