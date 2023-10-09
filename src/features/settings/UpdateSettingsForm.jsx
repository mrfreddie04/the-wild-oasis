import { useSettings } from "./useSettings";
import { useUpdateSettings } from "./useUpdateSetting";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";

function UpdateSettingsForm() {
  const { isLoading, error, settings: { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = {} } = useSettings();
  const { isUpdating, updateSettings } = useUpdateSettings();

  if (error) {
    console.log(error.message);
  }

  if (isLoading) {
    return <Spinner />;
  }

  const isWorking = isLoading || isUpdating;

  function handleUpdate(e, field) {
    const { value } = e.target;

    if (!value) return;
    updateSettings({ [field]: value });
  }

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' defaultValue={minBookingLength} disabled={isWorking} onBlur={(e) => handleUpdate(e, "minBookingLength")} />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' defaultValue={maxBookingLength} disabled={isWorking} onBlur={(e) => handleUpdate(e, "maxBookingLength")} />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' defaultValue={maxGuestsPerBooking} disabled={isWorking} onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")} />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' defaultValue={breakfastPrice} disabled={isWorking} onBlur={(e) => handleUpdate(e, "breakfastPrice")} />
      </FormRow>
      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isWorking}>Update settings</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
