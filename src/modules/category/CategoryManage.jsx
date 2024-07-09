import { ActionDelete, ActionEdit, ActionView } from '@/components/action';
import Button from '@/components/button';
import { LabelStatus } from '@/components/label';
import Table from '@/components/table';
import { db } from '@/firebase/config';
import { categoryStatus } from '@/utils/constants';
import { collection, deleteDoc, doc, getDocs, limit, onSnapshot, query, startAfter, where } from 'firebase/firestore';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import DashboardHeading from '../dashboard/DashboardHeading';

const CATEGORY_PER_PAGE = 1;

const CategoryManage = () => {
  const [categoryList, setCategoryList] = useState([]);
  const navigate = useNavigate();
  const [filter, setFilter] = useState('');
  const [lastDoc, setLastDoc] = useState();
  const [totalLength, setTotalLength] = useState(0);

  useEffect(() => {
    (async () => {
      const colRef = collection(db, 'categories');
      const q = filter
        ? query(colRef, where('name', '>=', filter), where('name', '<=', filter + 'utf8'))
        : query(colRef, limit(CATEGORY_PER_PAGE));

      const documentSnapshots = await getDocs(q);

      // Get the last visible document
      const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setLastDoc(lastVisible);
      onSnapshot(colRef, snapshot => {
        setTotalLength(snapshot.size);
      });
      onSnapshot(q, snapshot => {
        const result = [];
        snapshot.forEach(doc => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setCategoryList(result);
      });
    })();
  }, [filter]);

  const handleDeleteCategory = async docId => {
    const colRef = doc(db, 'categories', docId);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        deleteDoc(colRef);
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });
      }
    });
  };

  const handleInputFilter = debounce(e => {
    setFilter(e.target.value);
  }, 500);

  const handleLoadMoreCategory = async () => {
    const nextRef = query(collection(db, 'categories'), startAfter(lastDoc), limit(CATEGORY_PER_PAGE));
    onSnapshot(nextRef, snapshot => {
      const result = [];

      snapshot.forEach(doc => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategoryList([...categoryList, ...result]);
    });
    const documentSnapshots = await getDocs(nextRef);

    // Get the last visible document
    const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };

  return (
    <div>
      <DashboardHeading title="Categories" desc="Manage your category">
        <Button kind="ghost" height="60px" to="/manage/add-category">
          Create category
        </Button>
      </DashboardHeading>
      <div className="mb-10 flex justify-end">
        <input
          type="text"
          placeholder="Search category ..."
          className="py-4 px-5 bg-gray-100 rounded-lg"
          onChange={handleInputFilter}
        />
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.length > 0 &&
            categoryList.map(category => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                  <span className="italic text-gray-400">{category.slug}</span>
                </td>
                <td>
                  {category.status === categoryStatus.APPROVED && <LabelStatus type="success">APPROVED</LabelStatus>}
                  {category.status === categoryStatus.UNAPPROVED && (
                    <LabelStatus type="warning">UNAPPROVED</LabelStatus>
                  )}
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <ActionView />
                    <ActionEdit onClick={() => navigate(`/manage/update-category?id=${category.id}`)} />
                    <ActionDelete onClick={() => handleDeleteCategory(category.id)} />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      {totalLength > categoryList.length && (
        <div className="mt-10">
          <Button className="mx-auto" onClick={handleLoadMoreCategory}>
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategoryManage;
