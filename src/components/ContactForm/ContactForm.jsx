import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'redux/operations';
import { selectItems } from 'redux/selectors';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { nanoid } from 'nanoid';
import { Input, InputGroup, InputLeftElement, Button } from '@chakra-ui/react';
import { PhoneIcon, AtSignIcon, AddIcon } from '@chakra-ui/icons';

export function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const allContacts = useSelector(selectItems);

  const addChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };
  const addSubmit = e => {
    e.preventDefault();
    if (
      allContacts.some(
        contact =>
          contact.name.toLowerCase().trim() === name.toLowerCase().trim()
      )
    ) {
      setName('');
      e.target.reset();
      return Notify.failure(`${name} is already in contacts!`);
    } else if (allContacts.some(contact => contact.number === number)) {
      e.target.reset();
      setNumber('');
      const nameAdded = allContacts.find(contact => contact.number === number);
      return Notify.failure(
        `${number} is already in contacts with ${nameAdded.name}!`
      );
    } else {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      dispatch(addContact(newContact));
      e.target.reset();
      setName('');
      setNumber('');
    }
  };
  return (
    <form onSubmit={addSubmit}>
      <label>
        <InputGroup mb="20px" mt="20px">
          <InputLeftElement pointerEvents="none">
            <AtSignIcon color="white" />
          </InputLeftElement>
          <Input
            _focus={{
              borderColor: 'pink.500',
              boxShadow: '0 0 0 1px #D53F8C',
            }}
            size="md"
            w="100%"
            type="text"
            name="name"
            value={name}
            onChange={addChange}
            pattern="[A-Za-zА-Яа-яЁё]{2,20}"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </InputGroup>
      </label>
      <label>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <PhoneIcon color="white" />
          </InputLeftElement>
          <Input
            _focus={{
              borderColor: 'pink.500',
              boxShadow: '0 0 0 1px #D53F8C',
            }}
            size="md"
            w="100%"
            type="tel"
            name="number"
            value={number}
            onChange={addChange}
            pattern="\+?[0-9\s\-\(\)]+"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </InputGroup>
      </label>
      <Button
        leftIcon={<AddIcon />}
        colorScheme="pink"
        variant="solid"
        type="submit"
        mr="auto"
        ml="auto"
        display="flex"
        mt="20px"
      >
        Add contact
      </Button>
    </form>
  );
}
