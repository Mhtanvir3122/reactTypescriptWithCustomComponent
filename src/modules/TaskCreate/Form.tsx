

import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Drawer from "../../components/Drawer";
import DrawerBody from "../../components/Drawer/DrawerBody";
import DrawerFooter from "../../components/Drawer/DrawerFooter";
import Button from "../../components/UI/button/Button";
import TextArea from "../../components/UI/input/textArea";
import Input2 from "../../components/UI/input/Input2";
import SearchableSelect from "../../components/UI/Select/new";
import DatePicker from "../../components/UI/input/DateInput";

interface IRoleForm {
  isOpen: boolean;
  onSubmit: (data: any) => void;
  onClose: () => void;
  updateData?: any;
  submitLoading?: boolean;
}

const RoleForm = ({
  isOpen,
  onClose,
  onSubmit,
  updateData,
  submitLoading,
}: IRoleForm) => {

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    control, watch,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isOpen && updateData && !updateData?.menu) {

      reset({
        ...updateData,
        dueDate: updateData?.dueDate?new Date(updateData?.dueDate).toISOString().split('T')[0]:null
      });
    } else reset({});

    // eslint-disable-next-line
  }, [isOpen, updateData, reset]);


  return (
    <Drawer
      title={` Create Task`}
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
                label="Task Name"
                type="text"
                // value={"link"}
                onValueChange={(value) => setValue("name", value)}
                placeholder="Enter Task Name"
                inputStyle={{
                  padding: "8px", width: "100%", maxWidth: "100%", // Caps the width
                  minWidth: "100%"
                }}


              />

            </div>
            <div className="col-xl-6 col-md-6 col-sm-12 col-lg-6">
              <SearchableSelect
                setValue={setValue}
                options={[{ id: "1", name: 'HIGH' }, { id: "2", name: 'LOW' }]}
                onChange={(e) => { setValue('priority', e?.label) }}
                fieldName="priority"
                isMulti={false}
                label='Priority'
                isReq={true}
                errors={errors}
                defaultValue={updateData?.priority === "HIGH" ? { id: "1", name: 'HIGH' } : updateData?.priority === "LOW" ? { id: "2", name: 'LOW' } : null}
              />

            </div>
            <div className="col-xl-6 col-md-6 col-sm-12 col-lg-6">


            <div className="d-flex gap-2 align-items-center">
              <div className="w-100">
                <DatePicker
                  label="Task End date"
                  register={register("dueDate", { required: "Date is required" })}
                  error={errors.dueDate?.message}
                  isRequired={true}
                />


              </div>

              <div>
              </div>

              <div
                className="d-flex justify-content-center align-items-center"
                onClick={() => setValue('dateField', null)}
                style={{ cursor: 'pointer' }}
              >
                X
              </div>
            </div>
            </div>


            <div className="col-xl-6 col-md-6 col-sm-12 col-lg-6">
              {/* <SearchableSelect
                  setValue={setValue}
                  options={[{ id: "1", name: 'TODO' }, { id: "2", name: 'IN_PROGRESS' },{ id: "3", name: 'EXPIRED' }, { id: "4", name: 'COMPLETED' }]}
                  onChange={() => { }}
                  fieldName="status"
                  isMulti={false}
                  label='Status'
                  isReq={true}
                  errors={errors}
                  /> */}

              <TextArea
                label="Description"
                // onValueChange={(e) => console.log(e,"llll")}
                placeholder="Enter Description"
                inputStyle={{
                  width: "100%",
                  maxWidth: "100%",
                  minWidth: "100%",
                  minHeight: "100px",
                  height: "100px",
                }}

                register={register("description", { required: "This field is required" })} // Required validation
                error={errors?.description?.message}
                isRequired={true}
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
export default RoleForm;
