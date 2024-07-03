import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';

export default function useFirebaseImage(setValue, getValues) {
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState();
  if (!setValue || !getValues) return;

  const handleUploadImage = file => {
    const storage = getStorage();
    const storageRef = ref(storage, 'images/' + file?.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

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
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          console.log('File available at', downloadURL);
          setImage(downloadURL);
        });
      }
    );
  };

  const handleSelectImage = e => {
    const file = e.target.files[0];
    if (!file) return;
    setValue('image_name', file.name);
    handleUploadImage(file);
  };

  const handleDeleteImage = () => {
    const storage = getStorage();
    const imageRef = ref(storage, 'images/' + getValues('image_name'));

    deleteObject(imageRef)
      .then(() => {
        setImage(null);
        setProgress(0);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return {
    image,
    progress,
    handleSelectImage,
    handleDeleteImage,
    handleUploadImage,
  };
}
