import { useCallback, useEffect, useState } from 'react';
import { Button, Input, Table, Pagination, Select, Card, Checkbox } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import './UserList.css';

type UserData = {
	limit: number;
	skip: number;
	total: number;
	users: User[];
};
function UserList() {
	const [users, setUsers] = useState<User[]>([]);
	const [totalUsers, setTotalUsers] = useState<number>(0);
	const [search, setSearch] = useState<string>('');
	const [skip, setSkip] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const fetchUsers = useCallback(async () => {
		setIsLoading(true);
		try {
			const res = await axios.get(
				`https://dummyjson.com/users/search?q=${search}&limit=10&skip=${skip}`
			);
			const data: UserData = res.data;
			setUsers(data.users);
			setTotalUsers(data.total);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	}, [skip, search]);

	useEffect(() => {
		fetchUsers();
	}, [skip, search]);

	const handleSearch = (query: string) => {
		setSearch(query);
		setSkip(0);
	};

	const handleOnPageChange = (page: number) => {
		setSkip(10 * (page - 1));
		setCurrentPage(page);
	};

	const columns = [
		{
			title: 'Name',
			dataIndex: ['firstName', 'lastName'],
			render: (_: any, record: User) => (
				<div>
					{record.firstName} {record.lastName}
				</div>
			),
		},
		{
			title: 'City',
			dataIndex: 'address.city',
			render: (_: any, record: User) => <div>{record.address.city}</div>,
		},
		{
			title: 'Birthday',
			dataIndex: 'birthDate',
			render: (_: any, record: User) => (
				<div>{new Date(record.birthDate).toLocaleDateString()}</div>
			),
		},
	];

	return (
		<Card
			className="user-list-container"
			title={
				<div className="user-filters">
					<div className="search-bar-container">
						<label>Name</label>
						<Input
							placeholder="Search User"
							className="search-input"
							onChange={(event) =>
								handleSearch(event.target.value)
							}
							suffix={
								<Button
									className="button-input"
									type="primary"
									shape="circle"
									icon={<SearchOutlined />}
								/>
							}
						/>
					</div>
					<div className="select-city-input">
						<label>City</label>
						<Select
							placeholder="Select city"
							className="city-filter"
						/>
					</div>
					<div className="check-older-cities">
						<label>Highlight oldest per city</label>
						<Checkbox />
					</div>
				</div>
			}
		>
			<Table
				className="user-table"
				pagination={{ position: ['none', 'none'] }}
				columns={columns}
				dataSource={users}
				loading={isLoading}
			/>
			<Pagination
				className="pagination"
				showSizeChanger={false}
				current={currentPage}
				total={totalUsers}
				onChange={handleOnPageChange}
			/>
		</Card>
	);
}

export default UserList;
