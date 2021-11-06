import React, { useState } from 'react';
import {useFlowContext} from '../FlowContext';
import PluralText from '../utils/PluralText';


const TableAction = () => {
	const {flowState, flowDispatch} = useFlowContext();
	const [action, setAction ] = useState( '' );

	const onChangeActionHandler = e => {
		let bulkAction = e.target.value;
		setAction( bulkAction );
	}

	const onApplyAction = e => {
		e.preventDefault();

		flowDispatch( { type: 'bulk_action', playload : action } );
		setAction( '' );
	}

	return (
		<div className={'table-action-wrap'}>
			<div className={'action-dropdown-wrap'}>

				<select value={action} onChange={ e => { onChangeActionHandler( e ) } } >
					<option value="" >Bulk Action</option>
					<option value="delete">Delete</option>
				</select>

				<button onClick={ e => { onApplyAction( e ) } }> Apply </button>
			</div>

			<div className={'action-flows-count'}>
				<PluralText count={flowState.length} singular={'Item'} plural={'Items'} show_count={true} />
			</div>

		</div>
	);
}

export default TableAction;