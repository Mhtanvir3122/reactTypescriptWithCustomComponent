

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Drawer from "../../components/Drawer";
import DrawerBody from "../../components/Drawer/DrawerBody";
import DrawerFooter from "../../components/Drawer/DrawerFooter";
import Button from "../../components/UI/button/Button";
import Input2 from "../../components/UI/input/Input2";
import SearchableSelect from "../../components/UI/Select/new";
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
  data?: any;

}

const RoleForm = ({
  isOpen,
  onClose,
  onSubmit,
  updateData,
  submitLoading,
  data,
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
    if (isOpen && updateData) {
      reset({
        ...updateData, permissionRole: updateData?.permissionRole?.map((item: any) => ({
          value: item.id,
          label: item.name
        }))
      });
    } else reset({ updateData });

    // eslint-disable-next-line
  }, [isOpen, updateData, reset]);




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
                register={register("link",)}
                label="link"
                type="text"
                // value={"link"}
                onValueChange={(value) => setValue("link", value)}
                placeholder="Enter User link"
                inputStyle={{
                  padding: "8px", width: "100%", maxWidth: "100%", // Caps the width
                  minWidth: "100%"
                }}

              />

            </div>
            <div className="col-xl-6 col-md-6 col-sm-12 col-lg-6">
              <Input2
                register={register("section",)}
                label="section"
                type="text"
                // value={"section"}
                onValueChange={(value) => setValue("section", value)}
                placeholder="Enter User section"
                inputStyle={{
                  padding: "8px", width: "100%", maxWidth: "100%", // Caps the width
                  minWidth: "100%"
                }}

              />

            </div>

            <div className="col-xl-6 col-md-6 col-sm-12 col-lg-6">
              <Input2
                register={register("icon",)}
                label="icon"
                type="text"
                // value={"icon"}
                onValueChange={(value) => setValue("icon", value)}
                placeholder="Enter User icon"
                inputStyle={{
                  padding: "8px", width: "100%", maxWidth: "100%", // Caps the width
                  minWidth: "100%"
                }}

              />

            </div>

            {/* <Controller
              control={control}
              name="permissionRole"
              render={({ field }) => (
                <SearchableSelect
                  {...field} // Pass the field props to the SearchableSelect
                  options={updateData?.sub ? updateData?.DTO : data || []}
                  // onChange={(e: any) => setValue('roleID', e?.map((e: any) => e?.value))}
                  defaultValue={watch('permissionRole')}
                  setValue={setValue}
                />
              )}
            /> */}

            {/* <SearchableSelect
                  setValue={setValue}
                  options={updateData?.sub ? updateData?.DTO : data || []}
                  onChange={() => { }}
                  fieldName="permissionRole"
                  isMulti={true}
                  defaultValue={updateData?.roles}
                /> */}


            <SearchableSelect
              setValue={setValue}
              options={updateData?.sub ? updateData?.DTO : data || []}
              fieldName="roles"
              defaultValue={updateData?.permissionRole
              } // Preloading previous selection
              isMulti
              isReq={true}
              register={register}
              errors={errors}
              label="Roles"
            />


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
