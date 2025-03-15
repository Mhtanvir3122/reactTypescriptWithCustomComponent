

import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Drawer from "../../components/Drawer";
import DrawerBody from "../../components/Drawer/DrawerBody";
import DrawerFooter from "../../components/Drawer/DrawerFooter";
import Button from "../../components/UI/button/Button";
import TextArea from "../../components/UI/input/textArea";
import Input2 from "../../components/UI/input/Input2";
import Input from "../../components/UI/input/Input";
import SearchableSelect from "../../components/UI/Select/new";
import Select from "react-select/dist/declarations/src/Select";
import DynamicField from "../../components/UI/Select/new";
const initPayload = {
  meta: {
    page: 0,
    limit: 20,
  },
  body: { searchKey: "", isActive: true, isDeleted: false, organizationId: "" },
};
interface IRoleForm {
  isOpen: boolean;
  onSubmit: (data: any) => void;
  onClose: () => void;
  updateData?: any;
  submitLoading?: boolean;
  roleData?: any
}

const RoleAssignForm = ({
  isOpen,
  onClose,
  onSubmit,
  updateData,
  submitLoading, roleData
}: IRoleForm) => {

  const {
    register,
    handleSubmit,
    reset,
    getValues, watch,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isOpen && updateData) {
      reset({
        ...updateData, roles: updateData?.roles?.map((item: any) => ({
          value: item.id,
          label: item.name
        }))
      });
    } else reset({ updateData });

    // eslint-disable-next-line
  }, [isOpen, updateData, reset]);


  return (
    <Drawer
      title={`Role Assign Form`}
      isOpen={isOpen}
      handleClose={onClose}
      className="w-md-25 w-xl-25"
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DrawerBody>

          <div className="row">
            <div className="col-xl-6 col-md-6 col-sm-12 col-lg-6">
              <Input2
                register={register("username",)}
                label="username"
                disabled
                type="text"
                // value={"username"}
                onValueChange={(value) => setValue("username", value)}
                placeholder="Enter User username"
                inputStyle={{
                  padding: "8px", width: "100%", maxWidth: "100%", // Caps the width
                  minWidth: "100%"
                }}

              />
            </div>

            <div className="col-xl-12 col-md-12 col-sm-12 col-lg-12">



              <SearchableSelect
                setValue={setValue}
                options={roleData}
                onChange={(e) => { console.log(e); }}
                fieldName="roles"
                defaultValue={updateData?.roles} // Preloading previous selection
                isMulti
                isReq={true}
                register={register}
                errors={errors}
                label="Roles"
              />

              {/* <SearchableSelect
                setValue={setValue}
                options={roleData}
                fieldName="roles"
                defaultValue={updateData?.roles} // Preloading previous selection
                isMulti
                isReq={true}
                register={register}
                errors={errors}
                label="Roles"
              /> */}
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
export default RoleAssignForm;
