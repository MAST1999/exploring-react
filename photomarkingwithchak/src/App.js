import "./App.css";
import React, { useState } from "react";
import {
  Button,
  Center,
  ChakraProvider,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import PhotoNav from "./components/PhotoNav";
import MarkingComponent from "./components/MarkingComponent";

function App() {
  const [selectedPhoto, setSelectedPhoto] = useState("");

  const newPhotoSelection = (photoAddress) => {
    console.log(photoAddress);
    setSelectedPhoto(photoAddress);
  };

  return (
    <div className="App" style={{ height: "100%" }}>
      <ChakraProvider>
        <Grid templateColumns="5fr 14fr 1fr" templateRows="7% 87% 6%" h="100%">
          <GridItem
            bg="green.200"
            borderBottom="1px solid"
            borderColor="green.500"
            rowSpan={1}
            colSpan={3}
          >
            <Flex>
              <Center>
                <Heading ml="4px" size="md">
                  Photo Marking App
                </Heading>
              </Center>
              <Spacer />
              <HStack spacing="24px" p="4px" mt="4px">
                <Button colorScheme="blue">Load Photos</Button>
                <Button colorScheme="green">Instructions</Button>
              </HStack>
            </Flex>
          </GridItem>
          <GridItem colspan={1} rowStart={2} rowEnd={3}>
            <Flex direction="column" h="100%" overflow="auto">
              <Tabs mt="4px" ml="4px" isFitted variant="enclosed">
                <TabList>
                  <Tab>Select Photo</Tab>
                  <Tab>Labels</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <PhotoNav flex="1" setPhoto={newPhotoSelection} />
                  </TabPanel>
                  <TabPanel>Labels here</TabPanel>
                </TabPanels>
              </Tabs>
            </Flex>
          </GridItem>
          <GridItem
            colStart={2}
            colEnd={4}
            rowStart={2}
            rowEnd={3}
            h="100%"
            overflow="auto"
          >
            <MarkingComponent photo={selectedPhoto} />
          </GridItem>
          <GridItem
            colStart={1}
            colEnd={4}
            rowStart={3}
            rowEnd={4}
            border="1px solid black"
          >
            Footer
          </GridItem>
        </Grid>
      </ChakraProvider>
    </div>
  );
}

export default App;
