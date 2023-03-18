import { Button } from "@chakra-ui/react";
import { heroColor } from "./Logo";

const ButtonMod = ({ text, isDisabled }) => {
  return (
    <Button
      isDisabled={isDisabled}
      type="submit"
      _hover={false}
      _active={false}
      h={{ lg: "40px", md: "48px", base: "48px" }}
      w={{ lg: "auto", md: "100%", base: "100%" }}
      color="white"
      bgColor={heroColor}
    >
      {text}
    </Button>
  );
};

export default ButtonMod;
