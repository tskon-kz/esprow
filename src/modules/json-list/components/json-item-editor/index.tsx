import React, { FormEventHandler, useEffect, useState } from 'react';
import { JsonObject } from '@/modules/json-list/types';
import JsonItemEditorRow from '../json-item-editor-row';
import * as styles from './styles.module.css';

interface Props {
  index: number
  itemData: JsonObject|null
  onChange: (index: number, payload: JsonObject)=>void
  onClose: ()=>void
}

function JsonItemEditor(props: Props) {
	const [form, setForm] = useState(props.itemData);

	useEffect(() => { setForm(props.itemData); }, [props.itemData]);

	const submitHandler: FormEventHandler = (e) => {
		e.preventDefault();
		if (!form) return;
		props.onChange(props.index, form);
	};

	if (!form) return null;

	return (
		<div className={styles.modalBackdrop}>
			<form className={styles.modalContent} onSubmit={submitHandler}>
				<div className={styles.fieldsWrapper}>
					{Object.keys(form).map(key => (
						<JsonItemEditorRow
							key={key}
							fieldName={key}
							initValue={props.itemData![key]}
							value={form[key]}
							onChange={(fieldName, value) => setForm(state => ({ ...state, [fieldName]: value }))}
						/>
					))}
				</div>

				<div className={styles.actions}>
					<button
						className={styles.saveButton}
						type="submit"
					>
						Save
					</button>

					<button
						type="button"
						onClick={props.onClose}
					>
						Close
					</button>
				</div>
			</form>
		</div>
	);
}

export default JsonItemEditor;
