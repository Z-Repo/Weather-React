import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoAPIOptions } from "../../api";

const Search = ({onSearchChange}) => {
    console.log(geoAPIOptions)
    const [search, setSearch] = useState(null);

    const loadOptions = (inputValue) => {
        return fetch(`${GEO_API_URL}/cities?minpopulation=20000&namePreFix=${inputValue}`, geoAPIOptions)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
    }

    const handleOnChange = (searchData) =>{
        setSearch(searchData);
        onSearchChange(searchData);
    }
    return(
        <AsyncPaginate
        placeholder="Search for a city"
        debounceTimeout={500}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
        />
    )
}

export default Search;