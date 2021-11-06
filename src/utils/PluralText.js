import React from 'react';


const makeTextPlural = ( count, singular, plural, showCount ) => {
	let output = singular
	if (count !== 1) {
		output = plural || `${singular}s`
	}

	return showCount ? `${count} ${output}` : output
}

const PluralText = ( props ) => {
	let count = props.count;
	let singular = props.singular;
	let plural = props.plural;
	let showCount = props.show_count;

	return(
		<span className={'text-pluralize'}> {makeTextPlural( count, singular, plural, showCount )} </span>
	);
}

export default PluralText;