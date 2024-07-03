import Button from '@/components/button/Button';
import { Radio } from '@/components/checkbox';
import { Dropdown } from '@/components/dropdown';
import Field from '@/components/field/Field';
import Input from '@/components/input/Input';
import Label from '@/components/label';
import { postStatus } from '@/utils/constants';
import { useForm } from 'react-hook-form';
import slugify from 'slugify';
import styled from 'styled-components';
import ImageUpload from '@/components/image/ImageUpload';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase/config';
import useFirebaseImage from '@/hooks/useFirebaseImage';
import Toggle from '@/components/toggle/Toggle';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/contexts/authContext';
import { toast } from 'react-toastify';
const PostAddNewStyles = styled.div``;

const PostAddNew = () => {
  const { userInfo } = useContext(AuthContext);
  const { control, watch, setValue, handleSubmit, getValues, reset } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: '',
      slug: '',
      status: 2,
      categoryId: '',
      hot: false,
    },
  });
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState('');
  const watchStatus = watch('status');
  const watchHot = watch('hot');
  const { image, progress, setImage, handleSelectImage, handleDeleteImage, handleUploadImage } = useFirebaseImage(
    setValue,
    getValues
  );

  const addPostHandler = async values => {
    const cloneValues = { ...values };
    cloneValues.slug = slugify(cloneValues.slug || cloneValues.title, { lower: true });
    cloneValues.status = Number(cloneValues.status);
    handleUploadImage(cloneValues?.image);
    const colRef = collection(db, 'posts');
    await addDoc(colRef, {
      ...cloneValues,
      image,
      userId: userInfo.uid,
    });
    toast.success('Tạo bài viết mới thành công !');
    reset();
    setImage(undefined);
    setSelectCategory(null);
  };
  const handleClickOption = item => {
    setValue('categoryId', item.id);
    setSelectCategory(item.name);
  };

  useEffect(() => {
    (async () => {
      const colRef = collection(db, 'categories');
      const q = query(colRef, where('status', '==', 1));
      const querySnapshot = await getDocs(q);
      const result = [];
      querySnapshot.forEach(doc => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(result);
    })();
  }, []);

  return (
    <PostAddNewStyles>
      <h1 className="dashboard-heading">Add new post</h1>
      <form onSubmit={handleSubmit(addPostHandler)}>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Title</Label>
            <Input control={control} placeholder="Enter your title" name="title" required></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input control={control} placeholder="Enter your slug" name="slug"></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Image</Label>
            <ImageUpload
              handleDeleteImage={handleDeleteImage}
              onChange={handleSelectImage}
              progress={progress}
              image={image}
              className="h-[250px]"
            />
          </Field>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Select placeholder={selectCategory || 'Select the category'}></Dropdown.Select>
              <Dropdown.List>
                {categories.length > 0 &&
                  categories.map(item => (
                    <Dropdown.Option key={item.id} onClick={() => handleClickOption(item)}>
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
            {selectCategory && (
              <span className="p-3 capitalize rounded-lg bg-green-50 text-green-500 text-sm font-medium">
                {selectCategory}
              </span>
            )}
          </Field>

          {/* <Field>
            <Label>Author</Label>
            <Input control={control} placeholder="Find the author"></Input>
          </Field> */}
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Feature post</Label>
            <Toggle on={watchHot === true} onClick={() => setValue('hot', !watchHot)} />
          </Field>
          <Field>
            <Label>Status</Label>
            <div className="flex items-center gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={+watchStatus === postStatus.APPROVED}
                onClick={() => setValue('status', 'approved')}
                value={postStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={+watchStatus === postStatus.PENDING}
                onClick={() => setValue('status', 'pending')}
                value={postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={+watchStatus === postStatus.REJECTED}
                onClick={() => setValue('status', 'reject')}
                value={postStatus.REJECTED}
              >
                Reject
              </Radio>
            </div>
          </Field>
        </div>
        <Button type="submit" className="mx-auto">
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;
