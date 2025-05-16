

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Drawer from "../../components/Drawer";
import DrawerBody from "../../components/Drawer/DrawerBody";
import DrawerFooter from "../../components/Drawer/DrawerFooter";
import Button from "../../components/UI/button/Button";
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
      title={`All My Task(Agent)`}
      isOpen={isOpen}
      handleClose={onClose}
      className="w-md-25 w-xl-25"
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DrawerBody>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
              <strong>Task Name:</strong> {updateData?.name}
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
              <strong>Priority:</strong> {updateData?.priority}
            </div>

          
            <div className="col-lg-4 col-md-12 col-sm-12">
              <strong>Description:</strong> {updateData?.description}
            </div>



            <br />
            <br />


            <hr  className="container"/>


            <div className="col-xl-6 col-md-6 col-sm-12 col-lg-6">
              <SearchableSelect
                setValue={setValue}
                options={[
                  { id: "1", name: 'TODO' }, 
                  { id: "2", name: 'IN_PROGRESS' },
                  { id: "3", name: 'EXPIRED' }, 
                  { id: "4", name: 'COMPLETED' },
               ]}

                onChange={(e) => {setValue('status',e?.label) }}
                fieldName="status"
                isMulti={false}
                label='Status '
                isReq={true}
                errors={errors}
                defaultValue={updateData?.status==='TODO'? { id: "1", name: 'TODO' }:
                updateData?.status==='IN_PROGRESS'? { id: "2", name: 'IN_PROGRESS' }:
                updateData?.status==='EXPIRED'?     { id: "3", name: 'EXPIRED' }:
                updateData?.status==='COMPLETED'?    { id: "4", name: 'COMPLETED' }:[]}

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
export default RoleAssignForm;
