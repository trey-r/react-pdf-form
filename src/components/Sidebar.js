import React from "react";
import { Box } from "@chakra-ui/react";
import { Navigation } from "./Navigation";

const Sidebar = ({ collapse }) => (
  <React.Fragment>
    <Box w="full">
      LOGO
      <Navigation collapse={collapse} />
    </Box>
  </React.Fragment>
);

export default Sidebar;