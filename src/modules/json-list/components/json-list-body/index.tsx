import React from 'react';
import { JsonList, JsonObject } from '@/modules/json-list/types';
import JsonListItem from '../json-list-item';
import * as styles from './styles.module.css';
import config from '@/modules/json-list/config';

interface Props {
  list: JsonList
	onChange: (index: number, payload: JsonObject)=>void
}

function JsonListBody(props: Props) {
	const rows = props.list.map((item, i) => {
		const key = item[config.defaultFieldKey] ? String(item[config.defaultFieldKey]) : Math.random();

		return (
			<JsonListItem
				key={key}
				data={item}
				className={styles.item}
				onSave={payload => props.onChange(i, payload)}
			/>
		);
	});

	return (
		<ul className={styles.wrapper}>
			{rows}
		</ul>
	);
}

export default JsonListBody;
