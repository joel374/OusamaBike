import {
  Box,
  chakra,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  useColorModeValue,
} from "@chakra-ui/react";

import { FaInstagram, FaTwitter, FaYoutube, FaWhatsapp } from "react-icons/fa";
import Logo, { heroColor } from "./reuseable/Logo";

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      target={"_blank"}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={10} mt={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "1fr 1fr 1fr " }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box>
              <Logo />
            </Box>
            <Text fontSize={"sm"}>
              © 2022 Chakra Templates. All rights reserved
            </Text>
            <Stack direction={"row"} spacing={6}>
              <SocialButton label={"Whatsapp"} href={"#"}>
                <FaWhatsapp />
              </SocialButton>
              <SocialButton
                label={"Instagram"}
                href={"https://www.instagram.com/ousamabikestore/"}
              >
                <FaInstagram />
              </SocialButton>
            </Stack>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Company</ListHeader>
            <Link href={"#"}>About us</Link>
            <Link href={"#"}>Blog</Link>
            <Link href={"#"}>Contact us</Link>
            <Link href={"#"}>Pricing</Link>
            <Link href={"#"}>Testimonials</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Support</ListHeader>
            <Link href={"#"}>Help Center</Link>
            <Link href={"#"}>Terms of Service</Link>
            <Link href={"#"}>Legal</Link>
            <Link href={"#"}>Privacy Policy</Link>
            <Link href={"#"}>Satus</Link>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
