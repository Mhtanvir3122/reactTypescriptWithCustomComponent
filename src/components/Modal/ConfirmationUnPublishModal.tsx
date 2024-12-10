import Modal from ".";
import Button from "../UI/button/Button";
import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";
import ModalHeader from "./ModalHeader";


interface ConfirmationUnPublishModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  isSubmitting?: boolean;
  unPublishData?: any;
  getList?: any;
}

export const ConfirmationUnPublishModal = ({
  isOpen,
  isSubmitting,
  onClose,
  unPublishData,
  getList,
}: ConfirmationUnPublishModalProps) => {
 

  return (
    <div>
      <Modal   size="xl" isOpen={isOpen} handleClose={onClose} noHeader>
        <ModalHeader
          handleClose={onClose}
          title="নিশ্চিতকরণ"
          className="bg-warning "
          titleClass="text-white"
        />
        <ModalBody>আপনি কি আসলেই অপ্রকাশিত করতে চাচ্ছেন ?</ModalBody>

        <ModalFooter className="d-flex justify-content-between p-3  ">
          <div></div>
          <div className="d-flex gap-3">
            <Button
              onClick={() => onClose && onClose()}
            >jhggjgj
           </Button>
            <Button
             
            >
              অপ্রকাশিত করুন
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};
