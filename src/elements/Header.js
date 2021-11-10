import React from 'react';
import styles from './Header.module.scss';
import { useListContext } from '../ListContext';

function Header() {
	const {listState, listDispatch} = useListContext();

	const addNewList = () => {
		let listName = prompt( "Enter the list name" );

		if ( !listName || !listName.length ) {
			return;
		}

		let newList = {
			id: Date.now().toString(),
			is_checked: false,
			name: listName,
			status: 'Published',
			date: new Date().toJSON().slice(0, 19).replace('T', ' ')
		}

		listDispatch( { type : 'add_new_list', playload : { newList : newList } } );
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
					listDispatch( {type: 'upload_json', playload: {json_data: JSON.parse( e.target.result )}} );
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
		let file = new Blob( [JSON.stringify( listState )], {type: 'text/plain'});
		a.href = URL.createObjectURL(file);
		a.download = 'lists.json';
		a.click();
	}

	const element = (
		<div className={ styles.list_header }>
			<h2>Lists</h2>
			<button type="button" className={'button-primary'} onClick={ addNewList } > Add New</button>
			<button type="button" onClick={ importHandler } > Import </button>
			<button type="button" onClick={ handleExport } > Export All ({listState.length}) </button>
		</div>
	);

	return element;
}

export default Header;