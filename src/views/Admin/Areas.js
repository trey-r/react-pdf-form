import { useEffect, useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import ItemCard from "../../components/ItemCard";
import { api } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

const Areas = () => {
  const [areaname, setAreaname] = useState("");
  const [areas, setAreas] = useState([]);
  const [isAdd, setIsAdd] = useState(true);
  const [selectedAreaId, setSelectedAreaId] = useState(null);
  const [areaType, setAreaType] = useState("");

  const navigate = useNavigate();

  const fetchAreas = async () => {
    const { data } = await api.get("/area");
    setAreas(data);
  };

  useEffect(() => {
    fetchAreas();
  }, []);

  const onEdit = async () => {
    const { data } = await api.post("/area/update", {
      areaId: selectedAreaId,
      areaname,
      areaType,
    });
    if (data.message === "success") {
      setAreaname("");
      setAreaType("");
      setIsAdd(true);
      fetchAreas();
    }
  };

  const onRemove = async (areaId) => {
    const { data } = await api.post("/area/delete", { areaId });
    if (data.message === "success") {
      fetchAreas();
    }
  };

  const onDetails = (areaId) => {
    navigate(`/admin/${areaId}`);
  };

  const onAdd = async () => {
    const { data } = await api.post("/area/add", { areaname, areaType });
    if (data.message === "success") {
      setAreaname("");
      setAreaType("");
      fetchAreas();
    }
  };

  return (
    <Flex padding="6" flexDirection="column" overflowY="auto">
      <Flex justifyContent="space-around" w="full" alignItems="flex-end">
        <FormControl>
          <FormLabel>Type of area of focus</FormLabel>
          <Select
            placeholder="Please select"
            value={areaType}
            onChange={(e) => setAreaType(e.target.value)}
          >
            <option value="1">Learning Traits</option>
            <option value="2">Health and Disability</option>
          </Select>
        </FormControl>
        <FormControl ml="4">
          <FormLabel>Please input area of focus to add</FormLabel>
          <Input
            value={areaname}
            onChange={(e) => setAreaname(e.target.value)}
          />
        </FormControl>
        {!isAdd && (
          <Button
            ml="6"
            minWidth="100"
            colorScheme="red"
            onClick={() => {
              setIsAdd(true);
              setAreaname("");
              setAreaType("");
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
          disabled={!areaname || !areaType}
        >
          {isAdd ? "Add" : "Edit"}
        </Button>
      </Flex>
      <SimpleGrid mt="12" columns={1} spacing={4}>
        {areas.map(({ areaId, areaname, areaType }) => (
          <ItemCard
            key={areaId}
            title={areaname}
            type={areaType}
            onEdit={() => {
              setIsAdd(false);
              setAreaname(areaname);
              setSelectedAreaId(areaId);
              setAreaType(areaType);
            }}
            onRemove={() => onRemove(areaId)}
            onDetails={() => onDetails(areaId)}
          />
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default Areas;
