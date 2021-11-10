import React, { useState } from 'react';
import {useListContext} from '../ListContext';
import PluralText from '../utils/PluralText';
import styles from './TableAction.module.scss';


const TableAction = () => {
	const {listState, listDispatch} = useListContext();
	const [action, setAction ] = useState( '' );

	const onChangeActionHandler = e => {
		let bulkAction = e.target.value;
		setAction( bulkAction );
	}

	const onApplyAction = e => {
		e.preventDefault();

		listDispatch( { type: 'bulk_action', playload : action } );
		setAction( '' );
	}

	return (
		<div className={ styles.tableActionWrap }>
			<div className={ styles.actionDropdownWrap }>

				<select value={action} onChange={ e => { onChangeActionHandler( e ) } } >
					<option value="" >Bulk Action</option>
					<option value="delete">Delete</option>
				</select>

				<button onClick={ e => { onApplyAction( e ) } }> Apply </button>
			</div>

			<div className={'action-lists-count'}>
				<PluralText count={listState.total} singular={'Item'} plural={'Items'} show_count={true} />
			</div>

		</div>
	);
}

export default TableAction;