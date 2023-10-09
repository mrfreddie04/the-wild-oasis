import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency, formatPercentage } from "../../utils/helpers";
import Stat from "./Stat";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  //calculate stats
  const numBookings = bookings.length;
  const sales = bookings.reduce((runningTotal, booking) => runningTotal + booking.totalPrice, 0);
  const checkIns = confirmedStays.length;
  // number of nights with guests / number of nights w/in this period
  const occupancy =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) / (numDays * cabinCount);

  return (
    <>
      <Stat title='Bookings' color='blue' icon={<HiOutlineBriefcase />} value={numBookings} />
      <Stat
        title='Sales'
        color='green'
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat title='Check ins' color='indigo' icon={<HiOutlineCalendarDays />} value={checkIns} />
      <Stat
        title='Occupancy rate'
        color='yellow'
        icon={<HiOutlineChartBar />}
        value={formatPercentage(occupancy)}
      />
    </>
  );
}

export default Stats;
