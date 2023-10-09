import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get("sortBy") || ""; //empty string selects the first element

  const handleSelect = (value) => {
    searchParams.set("sortBy", value);
    setSearchParams(searchParams);
  };

  return <Select options={options} value={currentSort} onSelect={handleSelect} type='white' />;
}

export default SortBy;
