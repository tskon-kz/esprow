import { JsonList } from './types';

const mockData: JsonList = [
	{
		id: '12',
		firstName: 'Lindsey',
		lastName: 'Stirling',
		born: 'September 21 1986',
		age: 37,
		isPublicPerson: true,
		email: 'lindsey@strirling.com',
		about: `Lindsey Stirling is no stranger to anyone interested in playing the violin. 
			She's an American composer, dancer, and violinist with a massive fanbase — as evident from her millions of YouTube subscribers, 
			four Billboard chart-topping albums, and two Billboard Music Awards.`,
	},

	{
		id: '13',
		firstName: 'Lindsey 2',
		lastName: 'Stirling 2',
		born: 'September 21 1986',
		age: 37,
		isPublicPerson: true,
		email: 'lindsey@strirling.com',
		about: `Lindsey Stirling is no stranger to anyone interested in playing the violin. 
			She's an American composer, dancer, and violinist with a massive fanbase — as evident from her millions of YouTube subscribers, 
			four Billboard chart-topping albums, and two Billboard Music Awards.`,
	},

	{
		id: '14',
		firstName: 'Lindsey 3',
		lastName: 'Stirling 3',
		born: 'September 21 1986',
		age: 37,
		isPublicPerson: true,
		email: 'lindsey@strirling.com',
		about: `Lindsey Stirling is no stranger to anyone interested in playing the violin. 
			She's an American composer, dancer, and violinist with a massive fanbase — as evident from her millions of YouTube subscribers, 
			four Billboard chart-topping albums, and two Billboard Music Awards.`,
		object: { some: 1, some2: 'second field' },
		array: [1, 'two', { three: 3 }],
	},
];

export default mockData;
