import React, {
	Children, ReactNode, useMemo, useState,
} from 'react';

interface Props {
  chunkSize: number,
  children: ReactNode[]
}

const DeferRenderer = (props: Props) => {
	const [renderedCount, setRenderedCount] = useState(props.chunkSize);

	const childrenList = useMemo(() => Children.toArray(props.children), [props.children]);

	React.useEffect(() => {
		if (renderedCount < childrenList.length) {
			const updateCount = () => setRenderedCount(Math.min(renderedCount + props.chunkSize, childrenList.length));
			window.requestIdleCallback(updateCount, { timeout: 200 });
		}
	}, [renderedCount, childrenList.length, props.chunkSize]);

	return childrenList.slice(0, renderedCount);
};

export default DeferRenderer;
