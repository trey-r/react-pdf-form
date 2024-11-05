import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { api } from "../utils/utils";
import { useUserContext } from "../contexts/userContext";

function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { onSetUser} = useUserContext();

  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");

  const onLogin = async () => {
    const { data } = await api.post("/auth/login", { pwd: password });
    if (data.message === "success") {
      
      onSetUser(data.username)
      if (data.username === "student") {
        navigate("/");
      } else {
        navigate("/admin")
      }
    } else {
      setError(data.message);
    }
  };

  return (
    <Container maxWidth="450px">
      <Flex
        direction="column"
        w="100%"
        background="transparent"
        p="60px 40px"
        mt="200px"
        borderRadius="15px"
        boxShadow="rgba(0, 0, 0, 0.05) 0px 5px 14px"
      >
        <Heading color={titleColor} fontSize="32px" mb="10px">
          Welcome Back
        </Heading>
        <Text
          mb="36px"
          ms="4px"
          color={textColor}
          fontWeight="bold"
          fontSize="14px"
        >
          Enter your password to sign in
        </Text>
        <FormControl>
          <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
            Password
          </FormLabel>
          <Input
            borderRadius="15px"
            mb="36px"
            fontSize="sm"
            type="password"
            placeholder="Your password"
            size="lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Text color="tomato">{error}</Text>}
          <Button
            fontSize="10px"
            type="submit"
            bg="teal.300"
            w="100%"
            h="45"
            mb="20px"
            color="white"
            mt="20px"
            _hover={{
              bg: "teal.200",
            }}
            _active={{
              bg: "teal.400",
            }}
            disabled={!password}
            onClick={onLogin}
          >
            SIGN IN
          </Button>
        </FormControl>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start"
          maxW="100%"
          mt="0px"
        >
          <Text color={textColor} fontWeight="medium">
            Forgot password?
          </Text>
          <Text color={textColor} fontWeight="medium">
            Please contact administrator
          </Text>
        </Flex>
      </Flex>
    </Container>
  );
}

export default Login;
