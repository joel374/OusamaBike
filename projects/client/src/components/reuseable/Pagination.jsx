import { Box, Button } from "@chakra-ui/react";
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai";
import { heroColor } from "./Logo";

const Pagination = ({
  previousPage,
  page,
  setPage,
  maxPage,
  nextPage,
  maxItemsPerPage,
  totalItem,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItem / maxItemsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <Box p="20px" fontSize={"16px"}>
      <Box display="flex" alignItems={"center"} justifyContent="center" gap="4">
        <Box w="51.9px">
          <Button
            onClick={previousPage}
            disabled={page === 1 ? true : null}
            display={page === 1 ? "none" : "block"}
            _hover={false}
            _active={false}
            bgColor="transparent"
          >
            <AiOutlineLeftCircle fontSize={"20px"} />
          </Button>
        </Box>

        <Box display={"flex"} gap="2">
          {pageNumbers.map((number) => (
            <Box
              p="2px 5px"
              fontSize={"14px"}
              border={"1px solid var(--color-border,#E5E7E9)"}
              onClick={() => setPage(number)}
              cursor="pointer"
              bgColor={page === number ? heroColor : "white"}
              color={page === number ? "white" : "black"}
            >
              {number}
            </Box>
          ))}
        </Box>

        <Box w="51.9px">
          <Button
            onClick={nextPage}
            disabled={page >= maxPage ? true : null}
            display={page >= maxPage ? "none" : "block"}
            _hover={false}
            _active={false}
            bgColor="transparent"
          >
            <AiOutlineRightCircle fontSize={"20px"} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Pagination;
