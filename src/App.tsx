/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react';
import './App.css';

interface Person {
    id: number;
    name: string;
    cityName: string;
    dateOfBirth: string;
    isOldest?: boolean;
}

const App: React.FC = () => {
	const [people, setPeople] = useState<Person[]>([]);
	const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
	const [searchName, setSearchName] = useState('');
	const [filterCity, setFilterCity] = useState('');
	const [highlightOldest, setHighlightOldest] = useState(false);

	useEffect(() => {
		// Fetch data from API
		fetch('https://dummyjson.com/users')
			.then(response => response.json())
			.then(data => {
				const users = data.users.map((user: any) => ({
					id: user.id,
					name: `${user.firstName} ${user.lastName}`,
					cityName: user.address.city,
					dateOfBirth: user.birthDate
				}));
				setPeople(users);
				setFilteredPeople(users);
			})
			.catch(error => console.error('Error fetching data:', error));
	}, []);

	useEffect(() => {
		// Filter and search functionality
		let filtered = people;

		if (searchName) {
			filtered = filtered.filter(person =>
				person.name.toLowerCase().includes(searchName.toLowerCase())
			);
		}

		if (filterCity) {
			filtered = filtered.filter(person =>
				person.cityName.toLowerCase() === filterCity.toLowerCase()
			);
		}

		if (highlightOldest) {
			const oldestPerCity = new Map<string, Person>();

			filtered.forEach(person => {
				if (!oldestPerCity.has(person.cityName) ||
                    new Date(person.dateOfBirth) < new Date(oldestPerCity.get(person.cityName)!.dateOfBirth)) {
					oldestPerCity.set(person.cityName, person);
				}
			});

			filtered = filtered.map(person => ({
				...person,
				isOldest: oldestPerCity.get(person.cityName)?.id === person.id
			}));
		} else {
			filtered = filtered.map(person => ({ ...person, isOldest: false }));
		}

		setFilteredPeople(filtered);
	}, [searchName, filterCity, highlightOldest, people]);

	return (
		<>
			<div>
				<div className='wrapper'>
					<div className='nameFlex'>
						<div className='userName'>
							<h2>Name</h2>
						</div>
						<div className='city'>
							<h2>City</h2>
						</div>
					</div>

					<div className='inputFlex'>
						<div>
							<input
								type='text'
								placeholder='Enter Name'
								className='nameInput'
								value={searchName}
								onChange={e => setSearchName(e.target.value)}
							/>
						</div>
						<div>
							<select
								className='cityInput'
								value={filterCity}
								onChange={e => setFilterCity(e.target.value)}
							>
								<option value="">Select City</option>
								{Array.from(new Set(people.map(person => person.cityName))).map(city => (
									<option key={city} value={city}>{city}</option>
								))}
							</select>
						</div>

						<div className='highlight'>
							<h2>Highlight oldest per city</h2>
							<input
								type="checkbox"
								className='checkbox'
								checked={highlightOldest}
								onChange={e => setHighlightOldest(e.target.checked)}
							/>
						</div>
					</div>
					<div className='table'>
						<table>
							<thead>
								<tr>
									<th>Name</th>
									<th>City</th>
									<th>Birthday</th>
								</tr>
							</thead>
							<tbody>
								{
									filteredPeople.map((item) => (
										<tr key={item.id} className={item.isOldest ? 'highlight' : ''}>
											<td>{item.name}</td>
											<td>{item.cityName}</td>
											<td>{item.dateOfBirth}</td>
										</tr>
									))
								}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
};

export default App;
