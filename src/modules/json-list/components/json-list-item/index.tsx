import React from 'react';
import classNames from 'classnames';
import { JsonObject } from '@/modules/json-list/types';
import * as styles from './styles.module.css';

interface Props {
	className: string
  data: JsonObject|null
	onEdit: ()=>void
}

function JsonListItem(props: Props) {
	if (!props.data) return null;

	const dataKeys = Object.keys(props.data);

	const rows = dataKeys.map(key => (
		<div key={key} className={styles.propertyWrapper}>
			<span className={styles.propertyLabel}>
				{`${key.replace(/([A-Z])/g, ' $1')}:`}
			</span>
			<span className={styles.propertyValue}>
				{String(props.data![key])}
			</span>
		</div>
	));

	return (
		<li className={classNames(styles.wrapper, props.className)}>
			<button
				className={styles.editButton}
				type="button"
				onClick={props.onEdit}
			>
				Edit
			</button>

			<div className={styles.rowsWrapper}>
				{rows}
			</div>
		</li>
	);
}

export default JsonListItem;
