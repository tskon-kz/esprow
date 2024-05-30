import React, { ChangeEventHandler } from 'react';
import { JsonValue } from '@/modules/json-list/types';
import config from '@/modules/json-list/config';
import * as styles from './styles.module.css';

interface Props {
  title: string
  value: unknown
	isEditMode: boolean
	onChange: (fieldName: string, value: JsonValue)=>void
}

function JsonItemRow(props: Props) {
	if (typeof props.value === 'object') return null;

	const inputHandler: ChangeEventHandler<HTMLInputElement|HTMLTextAreaElement> = (e) => {
		props.onChange(e.target.name, e.target.value);
	};

	function getInput() {
		if (props.title.toLowerCase() === config.defaultFieldKey) {
			return (
				<span className={styles.value}>
					{String(props.value)}
				</span>
			);
		}

		if (typeof props.value === 'object') {
			return (
				<span className={styles.value}>
					{JSON.stringify(props.value)}
				</span>
			);
		}

		if (typeof props.value === 'number') {
			return (
				<input
					type="number"
					name={props.title}
					value={props.value}
					onChange={inputHandler}
				/>
			);
		}

		if (typeof props.value === 'boolean') {
			return (
				<div className={styles.boolWrapper}>
					<div className={styles.radioWrapper}>
						True
						<input
							type="radio"
							name={props.title}
							checked={props.value}
							value="true"
							onChange={() => props.onChange(props.title, true)}
						/>
					</div>

					<div className={styles.radioWrapper}>
						False
						<input
							type="radio"
							name={props.title}
							checked={!props.value}
							value="false"
							onChange={() => props.onChange(props.title, false)}
						/>
					</div>
				</div>
			);
		}

		if (typeof props.value === 'string') {
			// TODO email and date
			return (props.value.length >= config.longTextBreakpoint) ? (
				<textarea
					name={props.title}
					value={props.value}
					rows={3}
					onChange={inputHandler}
				/>
			) : (
				<input
					type="text"
					name={props.title}
					value={props.value}
					onChange={inputHandler}
				/>
			);
		}

		return null;
	}

	return (
		<label className={styles.wrapper}>
			<span className={styles.label}>
				{`${props.title.replace(/([A-Z])/g, ' $1')}:`}
			</span>

			{props.isEditMode ? getInput() : (
				<span className={styles.value}>
					{String(props.value)}
				</span>
			)}

		</label>
	);
}

export default JsonItemRow;
