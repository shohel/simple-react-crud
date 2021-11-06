import React from 'react';
import {useFlowContext} from '../FlowContext';
import TableAction from './TableAction';

const Table = () => {
	const {flowState, flowDispatch} = useFlowContext();

	const toggleSelect = ( flow_id ) => {
		flowDispatch( { type : 'toggle_select', playload: { select_id : flow_id } } )
	}

	const toggleSelectAll = ( e ) => {
		flowDispatch( { type: 'toggle_all', checked : e.target.checked } );
	}

	const rowDelete = ( flow_index, e ) => {
		e.preventDefault();
		flowDispatch( { type: 'delete_row', playload : { flow_index : flow_index } } );
	}

	return (
		<>
			<TableAction />

			<table>
				<thead>
					<tr>
						<th> <input type="checkbox" onChange={ e => { toggleSelectAll( e ) } } /> </th>
						<th> Name </th>
						<th> Status </th>
						<th> <strong> Actions </strong> </th>
					</tr>
				</thead>

				<tbody>
					{flowState.map( (flow, index) => {
						return <tr key={flow.id}>
							<td> <input type="checkbox" checked={flow.is_checked} onChange={ e => { toggleSelect( flow.id ) } } /> </td>
							<td> { flow.name } </td>
							<td className={'status-col'}> <p>{flow.status} <br /> {flow.date} </p> </td>
							<td>
								<a href="#"> Edit </a> |
								<a href="#" onClick={ e => { rowDelete( index, e ) } }> Delete </a>
							</td>
						</tr>
					})}
				</tbody>
			</table>

			<TableAction />
		</>
	);
}

export default Table;