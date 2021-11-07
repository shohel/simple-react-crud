import React from 'react';
import { useFlowContext } from '../FlowContext';

function Header() {
	const {flowState, flowDispatch} = useFlowContext();

	const addNewFlow = () => {
		let flowName = prompt( "Enter the flow name" );

		if ( !flowName || !flowName.length ) {
			return;
		}

		let newFlow = {
			id: Date.now().toString(),
			is_checked: false,
			name: flowName,
			status: 'Published',
			date: new Date().toJSON().slice(0, 19).replace('T', ' ')
		}

		flowDispatch( { type : 'add_new_flow', playload : { newFlow : newFlow } } );
	}

	const handleExport = e => {
		e.preventDefault();

		let a = document.createElement("a");
		let file = new Blob( [JSON.stringify( flowState )], {type: 'text/plain'});
		a.href = URL.createObjectURL(file);
		a.download = 'flows.json.txt';
		a.click();
	}

	const element = (
		<div className={'list-header'}>
			<h2>Flows</h2>
			<button type="button" className={'button-primary'} onClick={ addNewFlow } > Add New</button>
			<button type="button" onClick={ handleExport } > Export All ({flowState.length}) </button>
		</div>
	);

	return element;
}

export default Header;