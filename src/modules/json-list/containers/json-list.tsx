import React, { useState } from 'react';
import JsonListHeader from '@/modules/json-list/components/json-list-header';
import JsonListBody from '@/modules/json-list/components/json-list-body';
import mockData from '../mock-data';
import { JsonList as JsonListType, JsonObject } from '../types';
import downloadFile from '@/common/helpers/download-file';

function JsonList() {
	const [list, setList] = useState<JsonListType>(mockData);

	const listChangeHandler = (index: number, payload: JsonObject) => {
		setList((state) => {
			const result = [...state];
			result.splice(index, 1, payload);
			return result;
		});
	};
	const downloadHandler = () => {
		downloadFile(JSON.stringify(list), 'EditedArray.json');
	};

	return (
		<>
			<JsonListHeader onDownload={downloadHandler} />
			<JsonListBody
				list={list}
				onChange={listChangeHandler}
			/>
		</>

	);
}

export default JsonList;
