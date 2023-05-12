import { Text } from "@chakra-ui/react";
export const heroColor = "#EDBF69";
const Logo = ({ color }) => {
  return (
    <Text
      fontSize={"30px"}
      fontWeight="bold"
      color={color ? color : heroColor}
      display="inline"
      fontFamily="serif"
      fontStyle={"oblique"}
    >
      OusamaBike
    </Text>
  );
};

export default Logo;
