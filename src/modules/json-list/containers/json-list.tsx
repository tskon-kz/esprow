import React, { useCallback, useState } from 'react';
import JsonListHeader from '@/modules/json-list/components/json-list-header';
import JsonListBody from '@/modules/json-list/components/json-list-body';
import JsonItemEditor from '@/modules/json-list/components/json-item-editor';
import mockData from '@/generated-mock.json';
import { JsonList as JsonListType, JsonObject } from '../types';
import downloadFile from '@/common/helpers/download-file';

function JsonList() {
	const [list, setList] = useState<JsonListType>(mockData);
	// TODO set to null after reload json
	const [editingElementIndex, setEditingElementIndex] = useState<null|number>(null);

	const listChangeHandler = useCallback((index: number, payload: JsonObject) => {
		setList((state) => {
			const result = [...state];
			result.splice(index, 1, payload);
			return result;
		});
	}, []);

	const downloadHandler = () => {
		downloadFile(JSON.stringify(list), 'EditedArray');
	};

	return (
		<>
			<JsonListHeader onDownload={downloadHandler} />
			<JsonListBody
				list={list}
				onEdit={setEditingElementIndex}
			/>
			{(editingElementIndex !== null) && (
				<JsonItemEditor
					index={editingElementIndex}
					itemData={list[editingElementIndex]}
					onChange={listChangeHandler}
					onClose={() => setEditingElementIndex(null)}
				/>
			)}
		</>

	);
}

export default JsonList;
