import { useState } from "react";
import {
  Flex,
  Heading,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Text,
  Checkbox,
  CheckboxGroup,
  Container,
  Radio,
  RadioGroup,
  Stack,
  Button,
} from "@chakra-ui/react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";

import ReactPdf from "../components/ReactPdf";

const MainForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [year, setYear] = useState("");
  const [className, setClassName] = useState("");
  const [teacher, setTeacher] = useState("");

  return (
    <Container padding="40px" flexDirection="column" maxWidth="1000px">
      <Heading fontSize="32px" mb="20px" textAlign="center" width="100%">
        Student IEP
      </Heading>
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
          <Input value={lastName} />
        </FormControl>
        <FormControl>
          <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
            Year
          </FormLabel>
          <Input value={year} type="date" />
        </FormControl>
        <FormControl>
          <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
            Class
          </FormLabel>
          <Input value={className} />
        </FormControl>
        <FormControl>
          <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
            Class Teacher
          </FormLabel>
          <Input value={teacher} />
        </FormControl>
      </SimpleGrid>
      <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={5} mt="12">
        <Flex flexDirection="column">
          <Text fontSize="xl" fontWeight="bold" textAlign="center" mb="8">
            Learning Traits
          </Text>
          <Text fontWeight="bold">Academic</Text>
          <CheckboxGroup>
            <Checkbox>A1 Reading problems</Checkbox>
            <Checkbox>A2 Low engagement</Checkbox>
            <Checkbox>A3 Problems with task completion</Checkbox>
            <Checkbox>A4 Numeracy difficulties</Checkbox>
            <Checkbox>A5 Poor planning / Disorganished</Checkbox>
            <Checkbox>A6 Handwriting issues</Checkbox>
            <Checkbox>A7 Comprehension difficulties</Checkbox>
            <Checkbox>A8 Poor recall of information</Checkbox>
          </CheckboxGroup>
          <Text fontWeight="bold" mt="4">
            Behaviour
          </Text>
          <CheckboxGroup>
            <Checkbox>B1 Inattentive or easily distracted</Checkbox>
            <Checkbox>B2 Compulsive or overactive behaviours</Checkbox>
            <Checkbox>B3 Low-level distraction of peers</Checkbox>
            <Checkbox>B4 Poor adult interactions</Checkbox>
            <Checkbox>B5 Has behavioural 'meltdowns'</Checkbox>
            <Checkbox>B6 Lethargic / unmotivated</Checkbox>
            <Checkbox>B7 Difficulty with transitions</Checkbox>
            <Checkbox>B8 Attention-seeking behaviours</Checkbox>
          </CheckboxGroup>
          <Text fontWeight="bold" mt="4">
            Communication
          </Text>
          <CheckboxGroup>
            <Checkbox>C1 Difficulty expressing ideas</Checkbox>
            <Checkbox>C2 Interrupts others</Checkbox>
            <Checkbox>C3 Pragmatic Language problems</Checkbox>
            <Checkbox>C4 Speech impairment</Checkbox>
            <Checkbox>C5 Information overload</Checkbox>
            <Checkbox>C6 Doesn't 'get the gist'</Checkbox>
            <Checkbox>C7 Difficulty following instructions</Checkbox>
            <Checkbox>C8 Receptive language problems</Checkbox>
          </CheckboxGroup>
          <Text fontWeight="bold" mt="4">
            Development
          </Text>
          <CheckboxGroup>
            <Checkbox>D1 Sensory issues</Checkbox>
            <Checkbox>D2 Anxious</Checkbox>
            <Checkbox>D3 Difficulty managing frustration</Checkbox>
            <Checkbox>D4 Socially isolated</Checkbox>
            <Checkbox>D5 Depressed mood</Checkbox>
            <Checkbox>D6 Overly competitive</Checkbox>
            <Checkbox>D7 Self-esteem issues</Checkbox>
            <Checkbox>D8 Difficulty working with others</Checkbox>
          </CheckboxGroup>
        </Flex>
        <Flex flexDirection="column">
          <Text fontSize="xl" fontWeight="bold" textAlign="center" mb="8">
            Health and Disability
          </Text>
          <Text fontWeight="bold">Social / Emotional</Text>
          <CheckboxGroup>
            <Checkbox>Anxiety & Depression</Checkbox>
            <Checkbox>Obsessive Compulsive Disorder</Checkbox>
            <Checkbox>Oppositional Defiance Disorder</Checkbox>
          </CheckboxGroup>
          <Text fontWeight="bold" mt="4">
            Cognitive
          </Text>
          <CheckboxGroup>
            <Checkbox>Asperger's Syndrome</Checkbox>
            <Checkbox>Attention Deficit Disorder</Checkbox>
            <Checkbox>Autism</Checkbox>
            <Checkbox>Expressive Language Disorder</Checkbox>
            <Checkbox>Intellectual Disability - Mild</Checkbox>
            <Checkbox>Intellectual Disability - Moderate</Checkbox>
            <Checkbox>Tourette Syndrome</Checkbox>
          </CheckboxGroup>
          <Text fontWeight="bold" mt="4">
            Physical
          </Text>
          <CheckboxGroup>
            <Checkbox>Cerebral Palsy</Checkbox>
            <Checkbox>Down Syndrome</Checkbox>
            <Checkbox>Dyspraxia</Checkbox>
            <Checkbox>Epilepsy</Checkbox>
            <Checkbox>Muscular Dystrophy</Checkbox>
            <Checkbox>Spina Bifida</Checkbox>
          </CheckboxGroup>
          <Text fontWeight="bold" mt="4">
            Sensory
          </Text>
          <CheckboxGroup>
            <Checkbox>Hearing</Checkbox>
            <Checkbox>Receptive Language Disorder</Checkbox>
            <Checkbox>Vision</Checkbox>
          </CheckboxGroup>
        </Flex>
      </SimpleGrid>
      <Flex flexDirection="column" alignItems="flex-start" mt="12" gap="6">
        <RadioGroup>
          <Stack direction="column">
            <Radio>Preview in my web browser</Radio>
            <Radio>Save to my computer</Radio>
          </Stack>
        </RadioGroup>
      </Flex>
      {/* <PDFViewer width="100%" height="100px">
        <ReactPdf />
      </PDFViewer> */}
      <PDFDownloadLink document={<ReactPdf firstName={firstName} />} fileName={`${firstName}.pdf`}>
        {({ blob, url, loading, error }) => {
            console.log("blob", blob);
            console.log("url", url);
            console.log("error", error);
            return loading ? (
                "Loading document..."
              ) : (
                <Button colorScheme="teal" variant="solid" mt="4">
                  Generate PDF
                </Button>
              )
        }
        }
      </PDFDownloadLink>
    </Container>
  );
};

export default MainForm;
