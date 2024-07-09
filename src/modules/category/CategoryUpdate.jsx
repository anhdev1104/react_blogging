import Button from '@/components/button/Button';
import { Radio } from '@/components/checkbox';
import Field from '@/components/field/Field';
import Input from '@/components/input';
import Label from '@/components/label';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import slugify from 'slugify';
import DashboardHeading from '../dashboard/DashboardHeading';
import { categoryStatus } from '@/utils/constants';
import { db } from '@/firebase/config';

const CategoryUpdate = () => {
  const {
    control,
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: 'onChange',
    defaultValues: {},
  });
  const [params] = useSearchParams();
  const categoryId = params.get('id');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, 'categories', categoryId);
      const singleDoc = await getDoc(colRef);
      reset(singleDoc.data());
    }
    fetchData();
  }, [categoryId, reset]);

  const watchStatus = watch('status');
  const handleUpdateCategory = async values => {
    const colRef = doc(db, 'categories', categoryId);
    await updateDoc(colRef, {
      name: values.name,
      slug: slugify(values.slug || values.name, { lower: true }),
      status: Number(values.status),
    });
    toast.success('Cập nhập danh mục thành công !');
    navigate('/manage/category');
  };
  if (!categoryId) return null;
  return (
    <div>
      <DashboardHeading title="Update category" desc={`Update your category id: ${categoryId}`}></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateCategory)}>
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input control={control} name="name" placeholder="Enter your category name"></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input control={control} name="slug" placeholder="Enter your slug"></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <div className="flex flex-wrap gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.APPROVED}
                value={categoryStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.UNAPPROVED}
                value={categoryStatus.UNAPPROVED}
              >
                Unapproved
              </Radio>
            </div>
          </Field>
        </div>
        <Button
          kind="primary"
          className="mx-auto w-[200px]"
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Update category
        </Button>
      </form>
    </div>
  );
};

export default CategoryUpdate;
