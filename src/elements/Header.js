import React from 'react';
import styles from './Header.module.scss';
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

	const importHandler = e => {
		const inputFileElement = document.createElement( 'input' )
		inputFileElement.setAttribute( 'type', 'file' )
		//inputFileElement.setAttribute( 'multiple', 'true' )
		inputFileElement.setAttribute( 'accept', '.json' )

		inputFileElement.addEventListener(
			'change',
			( e ) => {

				let reader = new FileReader();
				reader.onload = ( e ) => {
					flowDispatch( {type: 'upload_json', playload: {json_data: JSON.parse( e.target.result )}} );
				};
				reader.readAsText( e.target.files[0] );
			},
			false,
		)
		inputFileElement.click();
	}

	const handleExport = e => {
		e.preventDefault();

		let a = document.createElement("a");
		let file = new Blob( [JSON.stringify( flowState )], {type: 'text/plain'});
		a.href = URL.createObjectURL(file);
		a.download = 'flows.json';
		a.click();
	}

	const element = (
		<div className={ styles.list_header }>
			<h2>Flows</h2>
			<button type="button" className={'button-primary'} onClick={ addNewFlow } > Add New</button>
			<button type="button" onClick={ importHandler } > Import </button>
			<button type="button" onClick={ handleExport } > Export All ({flowState.length}) </button>
		</div>
	);

	return element;
}

export default Header;