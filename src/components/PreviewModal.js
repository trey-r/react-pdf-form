import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { PDFViewer } from "@react-pdf/renderer";
import ReactPdf from "./ReactPdf";
import { useAreaContext } from "../contexts/areaContext";

const PreviewModal = ({
  isOpen,
  onClose,
  firstName,
  lastName,
  year,
  className,
  teacher,
  dob,
  isPhysical,
  isCognitive,
  isSocial,
  isSensory,
}) => {
  const { areas } = useAreaContext();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>PDF Preview</ModalHeader>
        <ModalCloseButton />
        <ModalBody height="100%">
          <PDFViewer width="100%" height={window.innerHeight}>
            <ReactPdf
              firstName={firstName}
              lastName={lastName}
              year={year}
              className={className}
              teacher={teacher}
              dob={dob}
              areas={areas}
              isPhysical={isPhysical}
              isCognitive={isCognitive}
              isSocial={isSocial}
              isSensory={isSensory}
            />
          </PDFViewer>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PreviewModal;
