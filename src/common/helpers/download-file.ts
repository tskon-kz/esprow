import isValidJson from './is-valid-json';

function downloadJson(json: string, fileName:string) {
	if (!isValidJson(json)) {
	// eslint-disable-next-line no-alert
		window.alert('invalid format');
		return;
	}

	const blob = new Blob([json as BlobPart], { type: 'text/json' });
	const tempLink = document.createElement('a');
	tempLink.download = `${fileName}.json`;
	tempLink.href = window.URL.createObjectURL(blob);
	const clickEvent = new MouseEvent('click', {
		view: window,
	});
	tempLink.dispatchEvent(clickEvent);
	tempLink.remove();
}

export default downloadJson;
