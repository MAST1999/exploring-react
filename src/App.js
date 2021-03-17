import React from 'react';
import {
  ChakraProvider,
  CSSReset,
  Divider,
  Flex,
  Grid,
  GridItem,
  Text,
  theme,
} from '@chakra-ui/react';
import Navigation from './components/navigation/Navigation';
import './App.css';
import ImageCanvas from './components/mainPanel/ImageCanvas';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Grid
        h="100%"
        templateRows="45px 1fr"
        templateColumns="1fr"
        gap={1}
        marginTop={2}
        marginX={1}
      >
        {/* Navigation */}
        <GridItem h={47}>
          <Navigation />
          <Divider orientation="horizontal" mt={2} />
        </GridItem>
        {/* Main Panel */}
        <GridItem>
          <Flex>
            <Grid flexBasis="200px">
              <Text>Hello</Text>
            </Grid>
            <ImageCanvas />
          </Flex>
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}

export default App;
