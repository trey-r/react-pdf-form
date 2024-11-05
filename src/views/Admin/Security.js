import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { api } from "../../utils/utils";
import { useEffect, useState } from "react";

const Security = () => {
  const [users, setUsres] = useState([]);
  const [adminPwd, setAdminPwd] = useState("");
  const [studentPwd, setStudentPwd] = useState("");

  const fetchUsers = async () => {
    const { data } = await api.get("/auth");
    setUsres(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onUpdatePwd = async (username) => {
    const { data } = await api.post("/auth/update-password", {
      username,
      password: username === "student" ? studentPwd : adminPwd,
    });
    if (data.message === "success") {
        setAdminPwd("")
        setStudentPwd("")
        fetchUsers();
    }
  };

  return (
    <Flex padding="6" flexDirection="column">
      <Flex>
        <Text>
          Admin password:{" "}
          {users.find((user) => user.username === "admin")?.password}
        </Text>
      </Flex>
      <Flex my="12">
        <Text>
          Student password:{" "}
          {users.find((user) => user.username === "student")?.password}
        </Text>
      </Flex>
      <Flex alignItems="flex-end">
        <FormControl>
          <FormLabel>Admin password change</FormLabel>
          <Input
            value={adminPwd}
            onChange={(e) => setAdminPwd(e.target.value)}
          />
        </FormControl>
        <Button ml="12" onClick={() => onUpdatePwd("admin")}>
          Update
        </Button>
      </Flex>
      <Flex alignItems="flex-end" mt="12">
        <FormControl>
          <FormLabel>Student password change</FormLabel>
          <Input
            value={studentPwd}
            onChange={(e) => setStudentPwd(e.target.value)}
          />
        </FormControl>
        <Button ml="12" onClick={() => onUpdatePwd("student")}>
          Update
        </Button>
      </Flex>
    </Flex>
  );
};

export default Security;
