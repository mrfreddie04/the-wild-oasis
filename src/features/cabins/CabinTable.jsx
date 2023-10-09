// import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { useCabins } from "./useCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty.jsx";

function CabinTable() {
  const [searchParams] = useSearchParams();
  const { isLoading, cabins, error } = useCabins();

  if (error) {
    console.log(error.message);
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (!cabins?.length) return <Empty resourceName='cabins' />;

  const filterValue = searchParams.get("discount") || "all";
  const filteredCabins =
    filterValue === "all"
      ? cabins
      : filterValue === "no-discount"
      ? cabins.filter((cabin) => cabin.discount === 0)
      : cabins.filter((cabin) => cabin.discount > 0);

  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction == "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => modifier * (a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0)
  );

  return (
    <Menus>
      <Table $columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
