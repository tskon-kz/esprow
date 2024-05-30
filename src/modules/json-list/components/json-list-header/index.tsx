import React from 'react';

interface Props {
  onDownload: ()=>void
}

function JsonListHeader(props: Props) {
	return (
		<header>
			<h1>Json list data</h1>
			<button
				type="button"
				onClick={props.onDownload}
			>
				Download
			</button>
		</header>
	);
}

export default JsonListHeader;
