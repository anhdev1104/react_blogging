import Button from '@/components/button';
import DashboardHeading from '../dashboard/DashboardHeading';
import Table from '@/components/table';
import { LabelStatus } from '@/components/label';
import { ActionDelete, ActionEdit, ActionView } from '@/components/action';
import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { categoryStatus } from '@/utils/constants';

const CategoryManage = () => {
  const [categoryList, setCategoryList] = useState([]);
  console.log('🚀 ~ CategoryManage ~ categoryList:', categoryList);
  useEffect(() => {
    const colRef = collection(db, 'categories');
    onSnapshot(colRef, snapshot => {
      const result = [];
      snapshot.forEach(doc => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategoryList(result);
    });
  }, []);
  return (
    <div>
      <DashboardHeading title="Categories" desc="Manage your category">
        <Button kind="ghost" height="60px" to="/manage/add-category">
          Create category
        </Button>
      </DashboardHeading>
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
            categoryList.map((category, index) => (
              <tr key={category.id}>
                <td>{index + 1}</td>
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
                    <ActionEdit />
                    <ActionDelete />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CategoryManage;
