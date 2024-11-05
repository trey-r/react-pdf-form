import { useState } from "react";
import { Checkbox, CheckboxGroup, Text } from "@chakra-ui/react";
import { useAreaContext } from "../contexts/areaContext";

const AreaSection = ({ areaname, strategies }) => {
  const [selected, setSelected] = useState([]);
  const { onSetAreas } = useAreaContext();

  const onChange = (e) => {
    setSelected(e);
    onSetAreas(areaname, e);
  };

  return (
    <>
      <Text fontWeight="bold" mt="4">
        {areaname}
      </Text>
      <CheckboxGroup value={selected} onChange={onChange}>
        {strategies.map(({ strategyname }) => (
          <Checkbox key={strategyname} value={strategyname}>
            {strategyname}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </>
  );
};

export default AreaSection;
