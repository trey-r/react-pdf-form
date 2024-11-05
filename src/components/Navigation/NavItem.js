import {
  ListIcon,
  Link,
  Box,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const NavItem = ({ item, isActive, collapse }) => {
  const navigate = useNavigate();
  const { label } = item;

    const { icon, path} = item;
    return (
      <Box display="flex" alignItems="center" my={6} justifyContent="center">
        <Link
          gap={4}
          onClick={() => navigate(`/admin${path}`)}
          display="flex"
          alignItems="center"
          _hover={{ textDecoration: "none", color: "black" }}
          fontWeight="medium"
          color={isActive ? "black" : "gray.400"}
          w="full"
          justifyContent={!collapse ? "center" : ""}
        >
          <ListIcon as={icon} fontSize={22} m="0" />
          {collapse && <Text>{label}</Text>}
        </Link>
      </Box>
    );
};
