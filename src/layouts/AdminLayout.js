import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HStack, Flex, IconButton, Button } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import Sidebar from "../components/Sidebar";
import { useUserContext } from "../contexts/userContext";

const AdminLayout = ({ children }) => {
  const [collapse, setCollapse] = useState(true);

  const navigate = useNavigate();
  const { onSetUser } = useUserContext();

  const onLogout = () => {
    onSetUser("");
    navigate("/login");
  };

  return (
    <HStack w="full" h="100vh" bg="gray.100" padding={10}>
      <Flex
        as="aside"
        w="full"
        h="full"
        maxW={collapse ? 350 : 100}
        bg="white"
        alignItems="start"
        padding={6}
        flexDirection="column"
        justifyContent="space-between"
        transition="ease-in-out .2s"
        borderRadius="3xl"
      >
        <Sidebar collapse={collapse} />
      </Flex>
      <Flex
        w="full"
        h="full"
        bg="white"
        flexDirection="column"
        borderRadius="3xl"
      >
        <Flex justifyContent="space-between" padding="6">
          <IconButton
            aria-label="Menu Colapse"
            icon={<HamburgerIcon />}
            color="blue"
            onClick={() => setCollapse(!collapse)}
            width="45px"
          />
          <Button colorScheme="orange" onClick={onLogout}>
            Logout
          </Button>
        </Flex>
        {children}
      </Flex>
    </HStack>
  );
};

export default AdminLayout;
