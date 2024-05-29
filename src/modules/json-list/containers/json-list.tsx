import React from 'react';
import JsonListBody from '@/modules/json-list/components/json-list-body';
import mockData from '../mock-data';

function JsonList() {
	return (
		<JsonListBody list={mockData} />
	);
}

export default JsonList;
