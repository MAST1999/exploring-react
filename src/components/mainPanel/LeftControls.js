import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/accordion';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Text } from '@chakra-ui/layout';
import { Box, Grid } from '@chakra-ui/layout';
import React from 'react';

function LeftControls() {
  return (
    <Grid flexBasis="300px" mt={5}>
      <Accordion allowToggle allowMultiple>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Region Shape
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" />
                  ) : (
                    <AddIcon fontSize="12px" />
                  )}
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>Shapes Will be here</AccordionPanel>
            </>
          )}
        </AccordionItem>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Loaded Images
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" />
                  ) : (
                    <AddIcon fontSize="12px" />
                  )}
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>Images Will Be here</AccordionPanel>
            </>
          )}
        </AccordionItem>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Keyboard Shortcuts
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" />
                  ) : (
                    <AddIcon fontSize="12px" />
                  )}
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Text>n/p (←/→) Next/Previous image</Text>
                <Text>+ / - / = Zoom in/out/reset</Text>
                <Text>Ctrl + c Copy sel. regions</Text>
                <Text>Ctrl + v Paste sel. regions</Text>
                <Text>Ctrl + a Select all regions</Text>
                <Text>Del, Bkspc Delete image region</Text>
                <Text>Esc Cancel operation</Text>
                <Text>Ctrl + s Download annotations</Text>
                <Text>Spacebar Toggle image list</Text>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </Grid>
  );
}

export default LeftControls;
