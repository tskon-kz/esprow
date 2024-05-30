import React, { FormEvent, useEffect, useState } from 'react';
import classNames from 'classnames';
import { JsonObject } from '@/modules/json-list/types';
import JsonItemRow from './components/json-item-row';
import * as styles from './styles.module.css';

interface Props {
	className: string
  data: JsonObject|null
	onSave: (payload: JsonObject)=>void
}

function JsonListItem(props: Props) {
	const [isEditMode, setIsEditMode] = useState(false);
	const [form, setForm] = useState<JsonObject|null>(props.data);

	useEffect(() => {
		setForm(props.data);
	}, [props.data]);

	if (!form) return null;

	const dataKeys = Object.keys(form);

	const rows = dataKeys.map(key => (
		<JsonItemRow
			key={key}
			title={key}
			value={form[key]}
			isEditMode={isEditMode}
			onChange={(fieldName, value) => { setForm(state => ({ ...state, [fieldName]: value })); }}
		/>
	));

	const submitHandler = (e: FormEvent) => {
		e.preventDefault();
		props.onSave(form);
		setIsEditMode(false);
	};

	return (
		<li className={classNames(styles.wrapper, props.className)}>
			<form
				onSubmit={submitHandler}
			>
				<div className={styles.actions}>
					{!isEditMode && (
						<button
							className={styles.editButton}
							type="button"
							onClick={() => setIsEditMode(true)}
						>
							Edit
						</button>
					)}

					{isEditMode && (
						<button
							className={styles.saveButton}
							type="submit"
						>
							Save
						</button>
					)}

				</div>

				<div className={styles.rowsWrapper}>
					{rows}
				</div>
			</form>
		</li>
	);
}

export default JsonListItem;
