import { Button } from "@chakra-ui/react";
import { heroColor } from "./Logo";

const ButtonMod = ({ text, isDisabled }) => {
  return (
    <Button
      isDisabled={isDisabled}
      type="submit"
      _hover={false}
      _active={false}
      color="white"
      bgColor={heroColor}
    >
      {text}
    </Button>
  );
};

export default ButtonMod;
