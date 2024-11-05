import { useEffect, useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import ItemCard from "../../components/ItemCard";
import { api } from "../../utils/utils";

const Strategies = () => {
  const [strategyname, setStrategyname] = useState("");
  const [isAdd, setIsAdd] = useState(true);
  const [strategies, setStrategies] = useState([]);
  const [selectedStrategyId, setSelectedStrategyId] = useState();
  const [areaname, setAreaname] = useState("");

  const { areaId } = useParams();

  const fetchArea = async () => {
    const { data } = await api.get(`/area/${areaId}`);
    setAreaname(data[0].areaname);
  };

  const fetchStrategies = async () => {
    const { data } = await api.get(`/strategy/${areaId}`);
    setStrategies(data);
  };

  useEffect(() => {
    fetchStrategies();
    fetchArea();
  }, []);

  const onEdit = async () => {
    const { data } = await api.post("/strategy/update", {
      strategyId: selectedStrategyId,
      strategyname,
    });
    if (data.message === "success") {
      setStrategyname("");
      setIsAdd(true);
      fetchStrategies();
    }
  };

  const onRemove = async (strategyId) => {
    const { data } = await api.post("/strategy/delete", { strategyId });
    if (data.message === "success") {
      fetchStrategies();
    }
  };

  const onAdd = async () => {
    const { data } = await api.post("/strategy/add", { strategyname, areaId });
    if (data.message === "success") {
      setStrategyname("");
      fetchStrategies();
    }
  };

  return (
    <Flex padding="6" flexDirection="column" overflowY="auto">
      <Text fontSize="18" fontWeight="bold" textAlign="center" pb="8">
        Strategies for {areaname}
      </Text>
      <Flex justifyContent="space-around" w="full" alignItems="flex-end">
        <FormControl>
          <FormLabel>Please input strategy to add</FormLabel>
          <Input
            value={strategyname}
            onChange={(e) => setStrategyname(e.target.value)}
          />
        </FormControl>
        {!isAdd && (
          <Button
            ml="6"
            minWidth="100"
            colorScheme="red"
            onClick={() => {
              setIsAdd(true);
              setStrategyname("");
            }}
          >
            Cancel
          </Button>
        )}
        <Button
          ml="6"
          minWidth="100"
          colorScheme="blue"
          onClick={() => {
            if (isAdd) {
              onAdd();
            } else {
              onEdit();
            }
          }}
          disabled={!strategyname}
        >
          {isAdd ? "Add" : "Edit"}
        </Button>
      </Flex>
      <SimpleGrid mt="12" columns={1} spacing={4}>
        {strategies.map(({ strategyId, strategyname }) => (
          <ItemCard
            key={strategyId}
            title={strategyname}
            onEdit={() => {
              setIsAdd(false);
              setStrategyname(strategyname);
              setSelectedStrategyId(strategyId);
            }}
            onRemove={() => onRemove(strategyId)}
          />
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default Strategies;
