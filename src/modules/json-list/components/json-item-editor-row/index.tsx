import React, { ChangeEventHandler } from 'react';
import { JsonValue } from '@/modules/json-list/types';
import isValiDate from '@/common/helpers/is-valid-date';
import config from '@/modules/json-list/config';
import * as styles from './styles.module.css';

const emailRegExp = /^[a-zA-Z0-9.-]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/;

type InputType = 'text'|'long-text'|'number'|'email'|'datetime-local'|'boolean'|'json'|'key-property'

interface Props {
  fieldName: string
  initValue: JsonValue
  value: JsonValue
  onChange: (fieldName: string, value: JsonValue)=>void
}

function JsonItemEditorRow(props: Props) {
	const fieldType = getFieldType(props.fieldName, props.initValue);
	if (!fieldType) return null;

	const inputHandler: ChangeEventHandler<HTMLInputElement|HTMLTextAreaElement> = (e) => {
		props.onChange(e.target.name, e.target.value);
	};

	const getInput = () => {
		switch (fieldType) {
		case 'key-property': return (
			<span className={styles.value}>
				{String(props.value)}
			</span>
		);

		case 'json': return (
			<span className={styles.value}>
				{JSON.stringify(props.value)}
			</span>
		);

		case 'text':
		case 'email': return (
			<input
				type={fieldType}
				name={props.fieldName}
				value={props.value as number|string}
				onChange={inputHandler}
			/>
		);

		case 'number': return (
			<input
				type="number"
				name={props.fieldName}
				value={props.value as number|string}
				onChange={e => props.onChange(e.target.name, Number(e.target.value))}
			/>
		);

		case 'long-text': return (
			<textarea
				name={props.fieldName}
				value={props.value as string}
				rows={3}
				onChange={inputHandler}
			/>
		);

		case 'datetime-local': return (
			<input
				type="datetime-local"
				name={props.fieldName}
				value={dateForDateTimeInputValue(props.value as string)}
				onChange={inputHandler}
			/>
		);

		case 'boolean': return (
			<div className={styles.boolWrapper}>
				<div className={styles.radioWrapper}>
					True
					<input
						type="radio"
						name={props.fieldName}
						checked={props.value as boolean}
						value="true"
						onChange={() => props.onChange(props.fieldName, true)}
					/>
				</div>

				<div className={styles.radioWrapper}>
					False
					<input
						type="radio"
						name={props.fieldName}
						checked={!props.value}
						value="false"
						onChange={() => props.onChange(props.fieldName, false)}
					/>
				</div>
			</div>
		);

		default: return null;
		}
	};

	return (
		<label className={styles.wrapper}>
			<span className={styles.label}>
				{`${props.fieldName.replace(/([A-Z])/g, ' $1')}:`}
			</span>

			{getInput()}
		</label>
	);
}

export default JsonItemEditorRow;

function getFieldType(key: string, value: JsonValue):InputType|null {
	if (key.toLowerCase() === config.defaultFieldKey) return 'key-property';
	if (typeof value === 'object') return 'json';
	if (typeof value === 'number') return 'number';
	if (typeof value === 'boolean') return 'boolean';

	if (typeof value === 'string') {
		if (emailRegExp.test(value)) return 'email';
		if (isValiDate(value)) return 'datetime-local';
		return (value.length >= config.longTextBreakpoint) ? 'long-text' : 'text';
	}

	return null;
}

function dateForDateTimeInputValue(date: string) {
	const initDate = new Date(date);
	const offset = new Date().getTimezoneOffset() * 60 * 1000;
	return new Date(initDate.getTime() - offset).toISOString().slice(0, 19);
}
