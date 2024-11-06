import { useEffect, useState } from "react";
import {
  Flex,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import FileInput from "../../components/ReadExcelFile/FileInput";
import readExcel from "../../components/ReadExcelFile/readExcel";
import { api } from "../../utils/utils";
import { DeleteIcon } from "@chakra-ui/icons";

const Students = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const { data } = await api.get("/student");
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const onFileSelect = async (file) => {
    try {
      const data = await readExcel(file);
      data.shift();
      const { data: apiRes } = await api.post("/student/add", {
        firstName: data[0][0],
        lastName: data[0][1],
        year: data[0][2],
        class: data[0][3],
        teacher: data[0][4],
        dob: data[0][5],
      });
      if (apiRes.message === "success") {
        fetchStudents();
      }
    } catch (error) {
      console.error("Error reading Excel file", error);
    }
  };

  const onRemove = async (studentId) => {
    const { data } = await api.post("/student/delete", { studentId });
    if (data.message === "success") {
      fetchStudents();
    }
  };

  return (
    <Flex padding="6" flexDirection="column" overflowY="auto">
      <FileInput onFileSelect={onFileSelect} />
      <TableContainer mt="12">
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>Year</Th>
              <Th>Class</Th>
              <Th>Class Teacher</Th>
              <Th>Dob</Th>
            </Tr>
          </Thead>
          <Tbody>
            {students.map(
              (
                {
                  studentId,
                  firstName,
                  lastName,
                  year,
                  class: className,
                  teacher,
                  dob
                },
                index
              ) => {
                return (
                  <Tr key={index}>
                    <Td>{firstName}</Td>
                    <Td>{lastName}</Td>
                    <Td>{year}</Td>
                    <Td>{className}</Td>
                    <Td>{teacher}</Td>
                    <Td>{dob}</Td>
                    <Td>
                      <IconButton
                        size="sm"
                        colorScheme="yellow"
                        icon={<DeleteIcon />}
                        onClick={() => onRemove(studentId)}
                      />
                    </Td>
                  </Tr>
                );
              }
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default Students;
