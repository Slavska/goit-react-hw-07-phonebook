import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectFilterContacts,
  selectLoading,
  selectError,
} from 'redux/selectors';
import { deleteContact, fetchContacts } from 'redux/operations';
import { CloseIcon } from '@chakra-ui/icons';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Box,
  Spinner,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Circle,
  Button,
} from '@chakra-ui/react';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilterContacts);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Card
      bgGradient="linear(to-r, pink.200, purple.500)"
      w="100%"
      pr="0"
      pl="0"
    >
      <CardHeader>
        <Heading
          size="md"
          h="auto"
          color="white"
          fontSize="4xl"
          fontWeight="extrabold"
          textAlign="center"
        >
          Contacts
        </Heading>
      </CardHeader>
      {isLoading && !error && (
        <Spinner
          color="pink.500"
          size="md"
          display="flex"
          mr="auto"
          ml="auto"
        />
      )}
      <CardBody display="flex" flexWrap="wrap" gap="20px">
        {contacts.map(({ id, name, phone }) => (
          <Box
            key={id}
            justifyContent="space-between"
            w="210px"
            display="flex"
            alignItems="center"
            color="green"
            bg="white"
            borderRadius="10px"
            p="10px"
          >
            <Popover isLazy placement="top-start">
              <PopoverTrigger>
                <Button color="pink.500" bg="white">
                  {name}
                </Button>
              </PopoverTrigger>
              <PopoverContent color="purple.500" w="210px">
                <PopoverHeader fontWeight="semibold">{name}</PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>{phone}</PopoverBody>
              </PopoverContent>
            </Popover>
            <Circle
              cursor="pointer"
              ml="auto"
              bg="pink.500"
              display="flex"
              size="40px"
              type="submit"
              onClick={() => dispatch(deleteContact(id))}
            >
              <CloseIcon color="white" w="10px" />
            </Circle>
          </Box>
        ))}
      </CardBody>
    </Card>
  );
};
