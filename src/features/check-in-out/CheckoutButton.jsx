import { useCheckout } from "./useCheckout";
import Button from "../../ui/Button";

function CheckoutButton({ bookingId }) {
  const { isCheckingOut, checkout } = useCheckout();

  const handleCheckOut = () => {
    checkout(bookingId);
  };

  return (
    <Button $variation='primary' $size='small' onClick={handleCheckOut} disabled={isCheckingOut}>
      Check out
    </Button>
  );
}

export default CheckoutButton;
