import { Button, Input, Table, Pagination, Select, Card, Checkbox } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './UserList.css';

function UserList() {
	// type UserData = {
	// 	users: User[];
	// };
	const columns = [
		{
			title: 'Name',
			dataIndex: 'firstName',
		},
		{
			title: 'City',
			dataIndex: 'address.city',
		},
		{
			title: 'Birthday',
			dataIndex: 'birthDate',
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
							onChange={(event) => event.target.value}
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
			/>
			<Pagination className="pagination" showSizeChanger={false} />
		</Card>
	);
}

export default UserList;
