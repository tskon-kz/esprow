import React from 'react';
import * as styles from './styles.module.css';

interface Props {
  title: string
  value: unknown
}

function JsonItemRow(props: Props) {
	if (typeof props.value === 'object') return null;

	return (
		<label className={styles.wrapper}>
			<span className={styles.label}>
				{props.title.replace(/([A-Z])/g, ' $1')}
			</span>

			<input
				type="text"
				value={String(props.value)}
			/>
		</label>
	);
}

export default JsonItemRow;
