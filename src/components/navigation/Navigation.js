import { Button, IconButton } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import {
  AddIcon,
  CheckIcon,
  ChevronDownIcon,
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
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ColorModeSwitcher } from './ColorModeSwitcher';

function Navigation() {
  const { register, handleSubmit } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fileName, setFileName] = useState(null);

  const getFileName = value => {
    const correctName = value.slice(12);
    setFileName(correctName);
  };

  const onSubmit = data => {
    const formData = new FormData();

    formData.append('picture', data.picture[0]);
    formData.append('name', fileName);
    formData.append('path', `http://localhost:4000/uploads/${fileName}`);
    console.log(
      formData.getAll('name'),
      formData.getAll('path'),
      formData.getAll('picture')
    );
    axios({
      method: 'POST',
      url: 'http://localhost:4000/api/photos/',
      data: formData,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers':
          'Content-Type, Access-Control-Allow-Origin',
      },
    })
      .then(res => {
        res.json();
        alert(JSON.stringify(res));
      })
      .catch(error => console.log(error));
  };

  return (
    <Grid templateRows="1fr" templateColumns="1fr 70px">
      <HStack spacing="18px">
        <Button colorScheme="blue">Home</Button>

        <Menu m="0px">
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            colorScheme="cyan"
          >
            Images
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Button onClick={onOpen}>Open Modal</Button>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Modal Title</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Box
                        as="input"
                        ref={register}
                        type="file"
                        name="picture"
                        maxW="100%"
                        onChange={event => getFileName(event.target.value)}
                      />
                      <Button colorScheme="blue" type="submit" mt={3}>
                        Upload Photos
                      </Button>
                    </form>
                  </ModalBody>

                  <ModalFooter>
                    <Button variant="outline" mr={3} onClick={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </MenuItem>
          </MenuList>
        </Menu>

        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            colorScheme="cyan"
          >
            Annotation
          </MenuButton>
          <MenuList>
            <MenuItem>View Annotation</MenuItem>
          </MenuList>
        </Menu>

        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            colorScheme="cyan"
          >
            View
          </MenuButton>
          <MenuList>
            <MenuItem>Do Something</MenuItem>
          </MenuList>
        </Menu>

        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            colorScheme="cyan"
          >
            Help
          </MenuButton>
          <MenuList>
            <MenuItem>Getting Started</MenuItem>
          </MenuList>
        </Menu>

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
