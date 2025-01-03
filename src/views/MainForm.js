import { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Text,
  Checkbox,
  Container,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DatePicker from "react-datepicker";
import { DateTime } from "luxon";

import ReactPdf from "../components/ReactPdf";
import PreviewModal from "../components/PreviewModal";
import { useUserContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/utils";
import AreaSection from "../components/AreaSection";
import { useAreaContext } from "../contexts/areaContext";

import "react-datepicker/dist/react-datepicker.css";

const MainForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [year, setYear] = useState("");
  const [className, setClassName] = useState("");
  const [teacher, setTeacher] = useState("");
  const [dob, setDOB] = useState("");
  const [submitDate, setSubmitDate] = useState("");
  const [isPhysical, setIsPhysical] = useState(false);
  const [isCognitive, setIsCognitive] = useState(false);
  const [isSocial, setIsSocial] = useState(false);
  const [isSensory, setIsSensory] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [learningStrategies, setLearningStrategies] = useState([]);
  const [healthStrategies, setHealthStrategies] = useState([]);

  const { onSetUser } = useUserContext();
  const { areas, onResetAreas } = useAreaContext();
  const navigate = useNavigate();

  const onLogout = () => {
    onSetUser("");
    navigate("/login");
  };

  const fetchStrategies = async () => {
    const { data } = await api.get("/strategy");
    setLearningStrategies(data.filter((e) => e.areaType === "1"));
    setHealthStrategies(data.filter((e) => e.areaType === "2"));
  };

  const uniqueAreas = (strategies) => {
    return Object.values(
      strategies.reduce((acc, curr) => {
        if (!acc[curr.areaId]) {
          acc[curr.areaId] = { areaId: curr.areaId, areaname: curr.areaname };
        }
        return acc;
      }, {})
    );
  };

  useEffect(() => {
    fetchStrategies();

    return () => {
      onResetAreas();
    }
  }, []);

  const onAutoGenerate = async () => {
    const { data } = await api.get(`/student/${firstName}`);
    if (data.length > 0) {
      setFirstName(data[0].firstName);
      setLastName(data[0].lastName);
      setYear(data[0].year);
      setClassName(data[0].class);
      setTeacher(data[0].teacher);
      const dobToUpdate = DateTime.fromFormat(data[0].dob, "dd/MM/yyyy").toJSDate()
      setDOB(dobToUpdate);
    }
  };

  return (
    <Container padding="40px" flexDirection="column" maxWidth="1000px">
      <Flex>
        <Heading fontSize="32px" mb="20px" textAlign="center" width="100%">
          Student IEP
        </Heading>
        <Button colorScheme="orange" onClick={onLogout}>
          Logout
        </Button>
      </Flex>
      <SimpleGrid columns={{ sm: 1, md: 3 }} spacing={5}>
        <FormControl>
          <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
            First Name
          </FormLabel>
          <Input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
            Last Name
          </FormLabel>
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
            Date
          </FormLabel>
          <DatePicker
            selected={submitDate}
            onChange={(date) => setSubmitDate(date)}
            dateFormat="dd/MM/yyyy"
            customInput={<Input />}
          />
        </FormControl>
        <FormControl>
          <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
            Class
          </FormLabel>
          <Input
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
            Class Teacher
          </FormLabel>
          <Input value={teacher} onChange={(e) => setTeacher(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
            DOB
          </FormLabel>
          <DatePicker
            selected={dob}
            onChange={(date) => setDOB(date)}
            dateFormat="dd/MM/yyyy"
            customInput={<Input />}
          />
        </FormControl>
        <FormControl>
          <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
            Year
          </FormLabel>
          <Input value={year} onChange={(e) => setYear(e.target.value)} />
        </FormControl>
      </SimpleGrid>
      <Tooltip label="After fill First Name" placement="top-start">
          <Text
            cursor="pointer"
            _hover={{ textDecoration: "underline" }}
            onClick={onAutoGenerate}
            maxWidth="110px"
            color="blue.500"
            mt="4"
          >
            Auto Generate
          </Text>
        </Tooltip>
      <Text textAlign="center" fontSize="20" fontWeight="bold" mt="8">
        Disability Category(if applicable)
      </Text>
      <SimpleGrid columns={{ sm: 2, md: 4 }} spacing={5} mt="6">
        <Checkbox
          value={isPhysical}
          onChange={(e) => setIsPhysical(e.target.checked)}
        >
          Physical
        </Checkbox>
        <Checkbox
          value={isCognitive}
          onChange={(e) => setIsCognitive(e.target.checked)}
        >
          Cognitive
        </Checkbox>
        <Checkbox
          value={isSocial}
          onChange={(e) => setIsSocial(e.target.checked)}
        >
          Social/Emotional
        </Checkbox>
        <Checkbox
          value={isSensory}
          onChange={(e) => setIsSensory(e.target.checked)}
        >
          Sensory
        </Checkbox>
      </SimpleGrid>
      <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={5} mt="12">
        <Flex flexDirection="column">
          <Text fontSize="xl" fontWeight="bold" textAlign="center" mb="8">
            Learning Traits
          </Text>
          {uniqueAreas(learningStrategies).map(({ areaname, areaId }) => {
            return (
              <AreaSection
                key={areaname}
                areaname={areaname}
                strategies={learningStrategies.filter(
                  (e) => e.areaId === areaId
                )}
              />
            );
          })}
        </Flex>
        <Flex flexDirection="column">
          <Text fontSize="xl" fontWeight="bold" textAlign="center" mb="8">
            Health and Disability
          </Text>
          {uniqueAreas(healthStrategies).map(({ areaname, areaId }) => {
            return (
              <AreaSection
                key={areaname}
                areaname={areaname}
                strategies={healthStrategies.filter((e) => e.areaId === areaId)}
              />
            );
          })}
        </Flex>
      </SimpleGrid>
      <Flex justifyContent="space-around" pt="6">
        <Button
          colorScheme="purple"
          variant="solid"
          mt="4"
          onClick={() => setIsPreviewOpen(true)}
        >
          Preview PDF
        </Button>
        <PDFDownloadLink
          document={
            <ReactPdf
              firstName={firstName}
              lastName={lastName}
              year={year}
              className={className}
              teacher={teacher}
              dob={DateTime.fromJSDate(dob).toFormat("dd/MM/yyyy")}
              submitDate={DateTime.fromJSDate(submitDate).toFormat(
                "dd/MM/yyyy"
              )}
              areas={areas}
              isPhysical={isPhysical}
              isCognitive={isCognitive}
              isSocial={isSocial}
              isSensory={isSensory}
            />
          }
          fileName={`${firstName}.pdf`}
        >
          {({ blob, url, loading, error }) => {
            return loading ? (
              "Loading document..."
            ) : (
              <Button colorScheme="teal" variant="solid" mt="4">
                Download PDF
              </Button>
            );
          }}
        </PDFDownloadLink>
      </Flex>
      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        firstName={firstName}
        lastName={lastName}
        year={year}
        className={className}
        teacher={teacher}
        dob={DateTime.fromJSDate(dob).toFormat("dd/MM/yyyy")}
        submitDate={DateTime.fromJSDate(submitDate).toFormat("dd/MM/yyyy")}
        isPhysical={isPhysical}
        isCognitive={isCognitive}
        isSocial={isSocial}
        isSensory={isSensory}
      />
    </Container>
  );
};

export default MainForm;
