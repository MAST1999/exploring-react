import React, { useState } from 'react';
import {
  ChakraProvider,
  CSSReset,
  Divider,
  Flex,
  Grid,
  GridItem,
  theme,
} from '@chakra-ui/react';
import Navigation from './components/navigation/Navigation';
import './App.css';
import ImageCanvas from './components/mainPanel/ImageCanvas';
import LeftControls from './components/mainPanel/LeftControls';
import BottomTabs from './components/mainPanel/BottomTabs';

function App() {
  const [photo, setPhoto] = useState('');

  return (
    <ChakraProvider theme={theme} h="100%">
      <CSSReset />
      <Grid
        h="100vh"
        templateRows="45px 1fr 300px"
        templateColumns="1fr"
        gap={1}
        paddingTop={2}
        paddingX={1}
      >
        {/* Navigation */}
        <GridItem h={47}>
          <Navigation />
          <Divider orientation="horizontal" mt={2} />
        </GridItem>
        {/* Main Panel */}
        <GridItem>
          <Flex height="100%">
            <LeftControls setPhoto={setPhoto} />
            <ImageCanvas photo={photo} />
          </Flex>
        </GridItem>
        {/* Bottom Panel */}
        <GridItem>
          <BottomTabs />
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}

export default App;
