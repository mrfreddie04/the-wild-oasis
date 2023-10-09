import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

function CabinAdd() {
  return (
    <div>
      <Modal>
        <Modal.Open opensWindowName='cabin-add'>
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name='cabin-add'>
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// function CabinAdd() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   return (
//     <div>
//       <Button
//         $variation='primary'
//         $size='medium'
//         onClick={() => setIsOpenModal((isOpenModal) => !isOpenModal)}
//       >
//         Add new cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default CabinAdd;
