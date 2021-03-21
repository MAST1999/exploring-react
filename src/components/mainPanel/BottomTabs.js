import { TabList } from '@chakra-ui/tabs';
import { TabPanels } from '@chakra-ui/tabs';
import { TabPanel } from '@chakra-ui/tabs';
import { Tab } from '@chakra-ui/tabs';
import { Tabs } from '@chakra-ui/tabs';
import React from 'react';

function BottomTabs() {
  return (
    <Tabs variant="enclosed">
      <TabList>
        <Tab>Region Attributes</Tab>
        <Tab>File Attributes</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <p>Region Attributes will be here</p>
        </TabPanel>
        <TabPanel>
          <p>File Attributes will be here</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default BottomTabs;
