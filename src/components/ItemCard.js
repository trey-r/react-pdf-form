import { Card, CardBody, Flex, IconButton, Text } from "@chakra-ui/react";
import { EditIcon, DeleteIcon, ArrowRightIcon } from "@chakra-ui/icons";
import {
  HEALTH_AND_DISABILITY,
  LEARNING_TRAITS,
} from "../constants/global.constants";

const ItemCard = ({ title, type, onRemove, onEdit, onDetails }) => {
  return (
    <Card w="full">
      <CardBody>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex flexDirection="column">
            <Text fontSize="16">{title}</Text>
            {type && (
              <Text fontSize="14">
                {type === "1" ? LEARNING_TRAITS : HEALTH_AND_DISABILITY}
              </Text>
            )}
          </Flex>
          <Flex>
            <IconButton
              colorScheme="blue"
              icon={<EditIcon />}
              onClick={onEdit}
            />
            {onDetails && (
              <IconButton
                ml="4"
                colorScheme="purple"
                icon={<ArrowRightIcon />}
                onClick={onDetails}
              />
            )}

            <IconButton
              ml="4"
              colorScheme="yellow"
              icon={<DeleteIcon />}
              onClick={onRemove}
            />
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ItemCard;
