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
import React from 'react';
import { useForm } from 'react-hook-form';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import PropTypes from 'prop-types';

function Navigation({ useRefresh }) {
  const { register, handleSubmit } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [refresh, setRefresh] = useRefresh;

  const onSubmit = async data => {
    const formData = new FormData();

    for (let i = 0; i < data.picture.length; i++) {
      formData.append(`picture${i}`, data.picture[i]);
      formData.append(`name${i}`, data.picture[i].name);
      formData.append(
        `path${i}`,
        `http://localhost:4000/${data.picture[i].name}`
      );
    }

    const res = await fetch('http://localhost:4000/api/photos', {
      method: 'POST',
      body: formData,
    }).then(res => res.json());
    console.log(res);

    onClose();
    setRefresh(!refresh);
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
              <Box onClick={onOpen}>Upload Image</Box>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Modal Title</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Box
                        as="input"
                        multiple
                        ref={register}
                        type="file"
                        name="picture"
                        maxW="100%"
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

Navigation.propTypes = {
  useRefresh: PropTypes.array,
};
