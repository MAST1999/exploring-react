import { Box, List, ListItem, UnorderedList } from "@chakra-ui/react";
import React, { useState } from "react";

function Labels({ setTheLabel }) {
  const [labels, setLabels] = useState([
    { name: "Truck", color: "#fff444" },
    { name: "Excavator", color: "#444fff" },
  ]);

  return (
    <List spacing={3}>
      {labels.map((label) => (
        <ListItem
          _before={{
            content: '" "',
            backgroundColor: label.color,
            display: "inline-block",
            width: "13px",
            height: "13px",
          }}
          onClick={() => setTheLabel(label)}
        >
          <Box ml={1} as="span" border={` 2px solid ${label.color}`}>
            {label.name}
          </Box>
        </ListItem>
      ))}
    </List>
  );
}

export default Labels;
