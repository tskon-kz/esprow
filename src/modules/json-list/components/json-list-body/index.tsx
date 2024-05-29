import React from 'react';
import { JsonList } from '@/modules/json-list/types';
import { DEFAULT_KEY_FIELD } from '@/modules/json-list/constants';
import JsonListItem from '../json-list-item';
import * as styles from './styles.module.css';

interface Props {
  list: JsonList
}

function JsonListBody(props: Props) {
	const rows = props.list.map((item, i) => {
		const key = item[DEFAULT_KEY_FIELD] ? String(item[DEFAULT_KEY_FIELD]) : Math.random();

		return (
			<JsonListItem
				key={key}
				data={item}
				className={styles.item}
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
