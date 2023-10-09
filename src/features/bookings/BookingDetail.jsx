import styled from "styled-components";
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const statusToTagName = {
  unconfirmed: "blue",
  "checked-in": "green",
  "checked-out": "silver",
};

function BookingDetail() {
  const navigate = useNavigate();
  const { isLoading, booking } = useBooking();
  const { isCheckingOut, checkout } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const moveBack = useMoveBack();

  const isWorking = isLoading || isCheckingOut || isDeleting;

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resourceName='booking' />;

  const { status, id } = booking;

  const handleCheckOut = () => {
    checkout(id, {
      onSuccess: () => {
        moveBack();
      },
    });
  };

  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading as='h1'>Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Modal>
        <ButtonGroup>
          {status === "unconfirmed" && (
            <Button onClick={() => navigate(`/checkin/${id}`)}>
              <HiArrowDownOnSquare />
              Check in
            </Button>
          )}
          {status === "checked-in" && (
            <Button disabled={isWorking} onClick={handleCheckOut}>
              <HiArrowUpOnSquare />
              Check out
            </Button>
          )}
          {/* {status === "unconfirmed" && (
            <Modal.Open opensWindowName='booking-delete'>
              <Button $variation='danger'>
                <HiTrash />
                Delete
              </Button>
            </Modal.Open>
          )} */}

          <Modal.Open opensWindowName='booking-delete'>
            <Button $variation='danger'>
              <HiTrash />
              Delete
            </Button>
          </Modal.Open>

          <Button $variation='secondary' onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>

        <Modal.Window name='booking-delete'>
          <ConfirmDelete
            resourceName={`booking ${id}`}
            disabled={isWorking}
            onConfirm={() =>
              deleteBooking(id, {
                onSettled: () => moveBack(),
              })
            }
          />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default BookingDetail;
