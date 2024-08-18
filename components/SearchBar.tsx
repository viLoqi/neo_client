import { Input } from "@chakra-ui/react";
import { MagnifyingGlass } from "@phosphor-icons/react";

interface Input {
    placeholderT: string
    changeHandler: any
}
const SearchBar = ({ placeholderT, changeHandler }: Input) => {
    return <div className='flex justify-between items-center py-2 my-4 h-14 rounded-lg bg-light-bg-subtle'>
        <div className="flex items-center w-full p-4">
            <MagnifyingGlass />
            <Input placeholder={placeholderT} className='ml-2 focus:outline-none w-full bg-inherit' onChange={changeHandler} variant='unstyled' />
        </div>
    </div>;
}

export default SearchBar;