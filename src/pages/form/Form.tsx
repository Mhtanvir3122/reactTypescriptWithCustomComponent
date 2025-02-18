

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Drawer from "../../components/Drawer";
import DrawerBody from "../../components/Drawer/DrawerBody";
import DrawerFooter from "../../components/Drawer/DrawerFooter";
import Button from "../../components/UI/button/Button";
import TextArea from "../../components/UI/input/textArea";
import Input2 from "../../components/UI/input/Input2";
const initPayload = {
  meta: {
    page: 0,
    limit: 20,
  },
  body: { searchKey: "", isActive: true, isDeleted: false, organizationId: "" },
};
interface ITypeBranchForm {
  isOpen: boolean;
  onSubmit: (data: any) => void;
  onClose: () => void;
  updateData?: any;
  submitLoading?: boolean;
}

const TypeBranchForm = ({
  isOpen,
  onClose,
  onSubmit,
  updateData,
  submitLoading,
}: ITypeBranchForm) => {
  const [options, setOptions] = useState<object>();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    control,
    setValue,
    formState: { errors },
  } = useForm();

console.log(updateData);
useEffect(() => {
  if (isOpen && updateData) {
   
    reset({...updateData});
  } else reset({});
  // eslint-disable-next-line
}, [isOpen, updateData,reset]);

  return (
    <Drawer
      title={`ধরণ-শাখা  করুন`}
      isOpen={isOpen}
      handleClose={onClose}
      className="w-md-25 w-xl-25"
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DrawerBody>

          <div className="row">
            <div className="col-xl-6 col-md-6 col-sm-12 col-lg-6">
              <Input2
                register={register("name",)}
                label="name"
                type="text"
                // value={"name"}
                onValueChange={(value) => setValue("name", value)}
                placeholder="Enter User Name"
                inputStyle={{
                  padding: "8px", width: "100%", maxWidth: "100%", // Caps the width
                  minWidth: "100%"
                }}

              />

            </div>
            <div className="col-xl-6 col-md-6 col-sm-12 col-lg-6">
              <Input2
                register={register("email")}
                label="email"
                type="text"
                // value={"email"}
                onValueChange={(value) => setValue("email", value)}
                placeholder="Enter User Name"
                inputStyle={{
                  padding: "8px", width: "100%", maxWidth: "100%", // Caps the width
                  minWidth: "100%",

                }}

              />

            </div>

            <div className="col-xl-6 col-md-6 col-sm-12 col-lg-6 ">

              <TextArea
                label="department"
                register={register("department")}
                onValueChange={(e) => setValue("department", e)}
                placeholder="Enter department"
                inputStyle={{
                  // padding: "8px",
                  width: "100%",  // Takes full width of parent
                  maxWidth: "100%", // Caps the width
                  minWidth: "100%", // Sets a minimum width
                  minHeight: "100px",
                  height: "100px",
                }}
              />
            </div>

          </div>        
          </DrawerBody>

        <DrawerFooter>
          <div className="d-flex gap-3 justify-content-end">
            <Button
              // color="secondary"
              onClick={onClose}
            // isDisabled={submitLoading}
            >
              বন্ধ করুন
            </Button>
            <Button type="submit" >
              save
            </Button>
          </div>
        </DrawerFooter>
      </form>
    </Drawer>
  );
};
export default TypeBranchForm;
