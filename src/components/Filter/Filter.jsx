import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/filterSlice';
import { selectFilter } from 'redux/selectors';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';

export const Filter = () => {
  const dispatcher = useDispatch();
  const filter = useSelector(selectFilter);

  const onChange = e => {
    dispatcher(setFilter(e.target.value));
  };

  return (
    <form>
      <label>
        <InputGroup mb="20px" mt="20px">
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="white" />
          </InputLeftElement>
          <Input
            _focus={{
              borderColor: 'pink.500',
              boxShadow: '0 0 0 1px #D53F8C',
            }}
            size="md"
            w="100%"
            type="text"
            name={filter}
            value={filter}
            onChange={onChange}
            pattern="[A-Za-zА-Яа-яЁё]{2,20}"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </InputGroup>
      </label>
    </form>
  );
};
