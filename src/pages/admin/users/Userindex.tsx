import React, { useContext } from "react";
import { Button, Modal, Space, Table } from "antd";
import type { TableProps } from "antd";
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import PlusCircleOutlined from '@ant-design/icons/PlusCircleOutlined';
import { useNavigate } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../utils/firebase/auth/firebaseAuth';
import { AdminDashboardContext } from '../../../utils/context/admin-state-context/AdminContext';
import { AdminDashboardProps } from '../../../utils/context/admin-state-context/types/AdminTypes';
import { Cart } from '../../../utils/context/store/types/CartTypes';

export interface UserDataType {
	firstName: string;
	lastName: string;
	email: string;
	uid: string;
	phoneNo: string;
	dob: string;
	orders: Cart[];
	
}

const UsersTable: React.FC = () => {
  const { userDocs } = useContext(AdminDashboardContext) as AdminDashboardProps;
  const navigate = useNavigate();
  const { confirm } = Modal;

  const deleteProduct = async (id: string) => {
    try {
      const productRef = doc(db, "products", id);
      await deleteDoc(productRef);
      console.log("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const showDeleteConfirm = (id: string) => {
    confirm({
      title: "Are you sure you want to delete this product?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone",
      onOk() {
        deleteProduct(id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

	const columns: TableProps<UserDataType>['columns'] = [
		{
			title: 'FirstName',
			dataIndex: 'firstName',
			key: 'firstName',
			render: (text) => <a className=" font-poppins">{text}</a>,
		},
		{
			title: 'LastName',
			dataIndex: 'lastName',
			key: 'name',
			render: (text) => <a className=" font-poppins">{text}</a>,
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'name',
			render: (text) => <a className=" font-poppins">{text}</a>,
		},
		{
			title: 'Phone No',
			dataIndex: 'phoneNo',
			key: 'name',
			render: (text) => <a className=" font-poppins">{text}</a>,
		},
		{
			title: 'Date of Birth',
			dataIndex: 'dob',
			key: 'name',
			render: (text) => <a className=" font-poppins">{text}</a>,
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, record) => (
				<Space size='middle'>
					<Button
						type='primary'
						className=" font-poppins"
						danger
						onClick={() => showDeleteConfirm(record.uid)}>
						Inactivate Account
					</Button>
				</Space>
			),
		},
	];

  return (
    <>
      <div className="w-full font-poppins flex mb-5">
        <h1 className="text-main font-bold">List of all User</h1>
        <button
          onClick={() => navigate("/admin-dashboard/product/add-new-product")}
          className="ml-auto rounded-lg right-5 px-3 py-2 bg-main text-white"
        >
          <PlusCircleOutlined className="text-white" /> Add New Product
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={userDocs || []}
        onRow={() => ({
          onClick: (event) => {
            event.stopPropagation();
          },
        })}
      />
    </>
  );
};

export default UsersTable;
