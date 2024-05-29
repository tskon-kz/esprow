import React from 'react';
import classNames from 'classnames';
import { JsonListItem as JsonListItemType } from '@/modules/json-list/types';
import JsonItemRow from './components/json-item-row';
import * as styles from './styles.module.css';

interface Props {
	className: string
  data: JsonListItemType
}

function JsonListItem(props: Props) {
	const dataKeys = Object.keys(props.data);

	const rows = dataKeys.map(key => (
		<JsonItemRow
			title={key}
			value={props.data[key]}
		/>
	));

	return (
		<li className={classNames(styles.wrapper, props.className)}>
			{rows}
		</li>
	);
}

export default JsonListItem;
