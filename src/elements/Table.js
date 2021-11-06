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

	const editRow = ( flow_index, e ) => {
		e.preventDefault();

		let oldFlowName = flowState[flow_index].name;
		let flowName = prompt( "Enter the flow name", oldFlowName );

		if ( !flowName || !flowName.length ) {
			return;
		}

		flowDispatch( { type: 'update_flow_name', playload : { flow_index : flow_index, new_name : flowName } } );
	}

	return (
		<>
			<TableAction />

			{flowState.length ?

				<table>
					<thead>
						<tr>
							<th>
								<input type="checkbox" onChange={e => {
									toggleSelectAll( e )
								}}/>
							</th>
							<th>Name</th>
							<th>Status</th>
							<th>
								<strong>Actions</strong>
							</th>
						</tr>
					</thead>

					<tbody>
						{flowState.map( ( flow, index ) => {
							return <tr key={flow.id}>
								<td>
									<input type="checkbox" checked={flow.is_checked} onChange={e => {
										toggleSelect( flow.id )
									}}/>
								</td>
								<td> {flow.name} </td>
								<td className={'status-col'}>
									<p>{flow.status}
										<br/>
										{flow.date}
									</p>
								</td>
								<td>
									<a href="#" onClick={e => {
										editRow( index, e )
									}}>Edit
									</a>
									<span className={'action-divider'}> | </span>
									<a href="#" onClick={e => {
										rowDelete( index, e )
									}}>Delete
									</a>
								</td>
							</tr>
						} )}
					</tbody>
				</table>

				:

				<div className={'nodata-jumbotron'}>
					<h3> There is no available flows to show </h3>
				</div>

			}

			<TableAction />
		</>
	);
}

export default Table;