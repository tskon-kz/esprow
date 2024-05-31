import React, { ChangeEventHandler, useState } from 'react';
import isValidJson from '@/common/helpers/is-valid-json';
import { JsonList } from '@/modules/json-list/types';
import * as styles from './styles.module.css';
import classNames from 'classnames';

interface Props {
  onDownload: ()=>void
	onUpload: (payload: JsonList)=>void
}

function JsonListHeader(props: Props) {
	const [isUploadError, setIsUploadError] = useState(false);

	const handleChange:ChangeEventHandler<HTMLInputElement> = (e) => {
		const file = e.target.files && e.target.files[0];
		if (!file) return;

		const fileReader = new FileReader();
		fileReader.readAsText(file, 'UTF-8');
		fileReader.onload = (e) => {
			const result = String(e.target!.result);

			if (!isValidJson(String(result))) {
				setIsUploadError(true);
				return;
			}

			setIsUploadError(false);
			props.onUpload(JSON.parse(result));
		};
	};

	return (
		<header>
			<h1>Json list data</h1>

			<div className={styles.actions}>
				<input
					className={classNames({ [styles.uploaderError]: isUploadError })}
					type="file"
					accept="application/JSON"
					onChange={handleChange}
				/>

				<button
					type="button"
					onClick={props.onDownload}
				>
					Download
				</button>
			</div>
		</header>
	);
}

export default JsonListHeader;
