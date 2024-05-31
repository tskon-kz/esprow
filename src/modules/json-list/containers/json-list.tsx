import React, { useState } from 'react';
import JsonListHeader from '@/modules/json-list/components/json-list-header';
import JsonListBody from '@/modules/json-list/components/json-list-body';
import JsonItemEditor from '@/modules/json-list/components/json-item-editor';
import { JsonList as JsonListType, JsonObject } from '../types';
import downloadFile from '@/common/helpers/download-file';

function JsonList() {
	const [list, setList] = useState<JsonListType>([]);
	const [editingElementIndex, setEditingElementIndex] = useState<null|number>(null);

	const listChangeHandler = (index: number, payload: JsonObject) => {
		setList((state) => {
			const result = [...state];
			result.splice(index, 1, payload);
			return result;
		});
		setEditingElementIndex(null);
	};

	const uploadHandler = (payload: JsonListType) => {
		setList(payload);
		setEditingElementIndex(null);
	};

	const downloadHandler = () => {
		downloadFile(JSON.stringify(list), 'EditedArray');
	};

	return (
		<>
			<JsonListHeader
				onUpload={uploadHandler}
				onDownload={downloadHandler}
			/>
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
