

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Drawer from "../../components/Drawer";
import DrawerBody from "../../components/Drawer/DrawerBody";
import DrawerFooter from "../../components/Drawer/DrawerFooter";
import Button from "../../components/UI/button/Button";
import DatePicker from "../../components/UI/input/DateInput";
import Input2 from "../../components/UI/input/Input2";
import TextArea from "../../components/UI/input/textArea";
import CheckboxComponent from "../../components/UI/input/CheckBox";
import RadioButtonComponent from "../../components/UI/input/RadioButton";
import SearchableSelect from "../../components/UI/Select/new";
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

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isOpen && updateData) {
      reset({ ...updateData });
    } else reset({ updateData });

    // eslint-disable-next-line
  }, [isOpen, updateData, reset]);

  const [selectedDate, setSelectedDate] = useState("");


  return (
    <Drawer
      title={`Employee Form`}
      isOpen={isOpen}
      handleClose={onClose}
      className="w-md-25 w-xl-25"
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DrawerBody>

          <div className="row">



            <div className="col-xl-6 col-md-6 col-sm-12 col-lg-6 ">


              <div className="d-flex gap-4">
                <RadioButtonComponent
                  register={register}
                  name="favoriteColor"
                  value="Red"
                  label="Red"
                />
                <RadioButtonComponent
                  register={register}
                  name="favoriteColor"
                  value="Blue"
                  label="Blue"
                />
                <RadioButtonComponent
                  register={register}
                  name="favoriteColor"
                  value="Green"
                  label="Green"
                />
              </div>
              <div className="col-xl-6 col-md-6 col-sm-12 col-lg-6 ">
                <SearchableSelect
                  setValue={setValue}
                  options={[{ id: "1", name: '4' }, { id: "ff", name: 'fff' }]}
                  onChange={() => { }}
                  fieldName="rolesf"
                  isMulti={false}
                />
                {/* <SearchableSelect
                  setValue={setValue}
                  options={[{ id: "1", name: '4' }, { id: "ff", name: 'fff' }]}
                  onChange={() => { }}
                  fieldName="roles"
                  isMulti={false}
                /> */}
                {/* <Controller
                  control={control}
                  name="roles"
                  render={({ field }) => (
                    <SearchableSelect
                      {...field} // Pass the field props to the SearchableSelect
                      options={[{ id: "1", name: '4' }, { id: "ff", name: 'fff' }]}

                      onChange={(e: any) => console.log(e)}

                      defaultValue={watch('roles')}
                      setValue={setValue}
                      isMulti={true}
                    />
                  )}
                /> */}
              </div>
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




// <div className="col-xl-6 col-md-6 col-sm-12 col-lg-6">
// <Input2
//   register={register("name",)}
//   label="User Name"
//   type="text"
//   // value={"name"}
//   // onValueChange={(value) => setValue("name", value)}
//   placeholder="Enter User Name"
//   inputStyle={{
//     padding: "8px", width: "100%", maxWidth: "100%",
//     minWidth: "100%"
//   }}

// />

// {/* <Input2
//   label="Uncontrolled Input"
//   register={register("inputField")}
//   isRequired={false}
// /> */}
// </div>
// <div className="col-xl-6 col-md-6 col-sm-12 col-lg-6">


// <div className="d-flex gap-2 align-items-center">
//   <div className="w-100">
//     <DatePicker
//       label="Select Date"
//       register={register("dateField", { required: "Date is required" })}
//       error={errors.dateField?.message}
//       isRequired={true}
//     />

//     {/* <DatePicker
//       label="Select Date"
//       register={register("dateFieldss")}
//       isRequired={false}
//     /> */}
//   </div>

//   <div>
//   </div>

//   <div
//     className="d-flex justify-content-center align-items-center"
//     onClick={() => setValue('dateField', null)}
//     style={{ cursor: 'pointer' }}
//   >
//     X
//   </div>
// </div>


// </div>
// <div className="col-xl-6 col-md-6 col-sm-12 col-lg-6">
// <Input2
//   label="Email"
//   type="text"
//   // onValueChange={(value) => console.log(value)}
//   placeholder="Enter User Name"
//   inputStyle={{
//     padding: "8px", width: "100%", maxWidth: "100%",
//     minWidth: "100%",

//   }}
//   register={register("email", { required: "This field is required" })} // Required validation
//   error={errors?.email?.message}
//   isRequired={true}
// />

// </div>

// <div className="col-xl-6 col-md-6 col-sm-12 col-lg-6 ">

// <TextArea
//   label="Department"
//   // onValueChange={(e) => console.log(e,"llll")}
//   placeholder="Enter department"
//   inputStyle={{
//     width: "100%",
//     maxWidth: "100%",
//     minWidth: "100%",
//     minHeight: "100px",
//     height: "100px",
//   }}

//   register={register("department", { required: "This field is required" })} // Required validation
//   error={errors?.department?.message}
//   isRequired={true}
// />

// {/* <TextArea
//   label="Optional Text Area"
//   register={register("textAreaField")} // No required validation
//   isRequired={false}
//   inputStyle={{
//     width: "100%",
//     maxWidth: "100%",
//     minWidth: "100%",
//     minHeight: "100px",
//     height: "100px",
//   }}
// /> */}
// </div>

// <div className="col-xl-6 col-md-6 col-sm-12 col-lg-6 ">

// {/* Use the CheckboxComponent and pass the register function */}
// <CheckboxComponent
//   lebel='Test?'
//   register={register}
//   name="acceptTerms"
//   initialChecked={false} // Set default checked value


// />
// </div>