import styled from "styled-components";
import { useState, useEffect } from "react";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { useSettings } from "../settings/useSettings";
import { useCheckin } from "./useCheckin";
import { formatCurrency } from "../../utils/helpers";

import BookingDataBox from "../../features/bookings/BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isLoading } = useBooking();
  const { isCheckingIn, checkin } = useCheckin();
  const { isLoading: isLoadingSettings, settings: { breakfastPrice } = {} } = useSettings();
  const moveBack = useMoveBack();

  useEffect(() => {
    if (booking?.isPaid) {
      setConfirmPaid(true);
    }
  }, [booking?.isPaid]);

  if (isLoading || isLoadingSettings) {
    return <Spinner />;
  }

  const { id: bookingId, guests, totalPrice, numGuests, hasBreakfast, numNights } = booking;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId });
    }
  }

  function handleConfirmPaid(e) {
    setConfirmPaid(e.target.checked);
  }

  function handleAddBreakfast(e) {
    setAddBreakfast(e.target.checked);
    setConfirmPaid(false);
  }

  const optionalBreakfastPrice = numGuests * numNights * breakfastPrice;
  const confirmedPrice = !addBreakfast
    ? `${formatCurrency(totalPrice)}`
    : `${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(
        totalPrice
      )} + ${formatCurrency(optionalBreakfastPrice)})`;

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            id='breakfast'
            onChange={handleAddBreakfast}
            checked={addBreakfast}
            disabled={hasBreakfast || isCheckingIn}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          id='confirm'
          onChange={handleConfirmPaid}
          checked={confirmPaid}
          disabled={confirmPaid || isCheckingIn}
        >
          I confirm the {guests.fullName} has paid the total amount {confirmedPrice}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button $variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
