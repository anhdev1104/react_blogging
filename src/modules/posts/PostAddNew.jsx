import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Button from '@/components/button/Button';
import { Checkbox, Radio } from '@/components/checkbox';
import { Dropdown } from '@/components/dropdown';
import Field from '@/components/field/Field';
import Input from '@/components/input/Input';
import Label from '@/components/label';
import { postStatus } from '@/utils/constants';
import { useForm } from 'react-hook-form';
import slugify from 'slugify';
import styled from 'styled-components';
import ImageUpload from '@/components/image/ImageUpload';
import { useEffect, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase/config';
const PostAddNewStyles = styled.div``;

const PostAddNew = () => {
  const { control, watch, setValue, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: '',
      slug: '',
      status: 2,
      category: '',
    },
  });
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState();

  const handleUploadImage = file => {
    const storage = getStorage();
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      'state_changed',
      snapshot => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progressBar = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressBar);
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      error => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          console.log('File available at', downloadURL);
        });
      }
    );
  };

  const handleSelectImage = e => {
    const file = e.target.files[0];
    if (!file) return;
    setValue('image', file);
    file.preview = URL.createObjectURL(file);
    setImage(file.preview);
  };

  const watchStatus = watch('status');
  const watchCategory = watch('category');

  const addPostHandler = async values => {
    const cloneValues = { ...values };
    cloneValues.slug = slugify(cloneValues.slug);
    cloneValues.status = Number(cloneValues.status);
    handleUploadImage(cloneValues.image);
    console.log(cloneValues);
    // const colRef = collection(db, 'posts');
    // await addDoc(colRef, {
    //   image,
    // });
  };
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
            <ImageUpload onChange={handleSelectImage} progress={progress} image={image} className="h-[250px]" />
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
          <Field>
            <Label>Author</Label>
            <Input control={control} placeholder="Find the author"></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Option>Knowledge</Dropdown.Option>
              <Dropdown.Option>Blockchain</Dropdown.Option>
              <Dropdown.Option>Setup</Dropdown.Option>
              <Dropdown.Option>Nature</Dropdown.Option>
              <Dropdown.Option>Developer</Dropdown.Option>
            </Dropdown>
          </Field>
          <Field></Field>
        </div>
        <Button type="submit" className="mx-auto">
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;
