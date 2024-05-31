import React from 'react';
import { JsonList } from '@/modules/json-list/types';
import config from '@/modules/json-list/config';
import DeferRenderer from '@/common/components/defer-renderer';
import JsonListItem from '../json-list-item';
import * as styles from './styles.module.css';

interface Props {
  list: JsonList
	onEdit: (index: number)=>void
}

function JsonListBody(props: Props) {
	return (
		<ul className={styles.wrapper}>
			<DeferRenderer chunkSize={4}>
				{props.list.map((item, i) => {
					const key = item[config.defaultFieldKey] ? String(item[config.defaultFieldKey]) : Math.random();

					return (
						<JsonListItem
							key={key}
							data={item}
							className={styles.item}
							onEdit={() => props.onEdit(i)}
						/>
					);
				})}
			</DeferRenderer>
		</ul>
	);
}

export default JsonListBody;
