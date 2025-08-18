import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';

interface DataType {
	key: string;
	name: string;
	age: number;
	address: string;
	tags: string[];
}

const columns: TableProps<DataType>['columns'] = [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
		render: (text) => <a>{text}</a>,
	},
	{
		title: 'Age',
		dataIndex: 'age',
		key: 'age',
	},
	{
		title: 'Address',
		dataIndex: 'address',
		key: 'address',
	},
	{
		title: 'Tags',
		key: 'tags',
		dataIndex: 'tags',
		render: (_, { tags }) => (
			<>
				{tags.map((tag) => {
					let color = tag.length > 5 ? 'geekblue' : 'green';
					if (tag === 'loser') {
						color = 'volcano';
					}
					return (
						<Tag  color={color} key={tag}>
							{tag.toUpperCase()}
						</Tag>
					);
				})}
			</>
		),
	},
	{
		title: 'Action',
		key: 'action',
		render: () => (
			<Space size='middle'>
				<a className=' bg-main px-3 py-2 text-white rounded-lg'>Confirm</a>
				<a className=' bg-red-500 px-3 py-2 text-white rounded-lg'>Delete</a>
			</Space>
		),
	},
];

const data: DataType[] = [];

const RecentOrdersTable: React.FC = () => (
	<Table columns={columns} dataSource={data} />
);

export default RecentOrdersTable;
