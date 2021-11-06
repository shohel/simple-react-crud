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

	const element = (
		<div className={'list-header'}>
			<h2>Flows</h2>
			<button type="button" className={'button-primary'} onClick={ addNewFlow } > Add New</button>
		</div>
	);

	return element;
}

export default Header;