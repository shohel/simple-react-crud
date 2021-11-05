import React from 'react';
import {useFlowContext} from '../FlowContext';

const Table = () => {
	const {flowState, flowDispatch} = useFlowContext();

	const toggleSelect = ( flow_id ) => {
		flowDispatch( { type : 'toggle_select', playload: { select_id : flow_id } } )
	}

	const toggleSelectAll = ( e ) => {
		flowDispatch( { type: 'toggle_all', checked : e.target.checked } );
	}

	return (
		<>
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
					{flowState.map( (flow) => {
						return <tr key={flow.id}>
							<td> <input type="checkbox" checked={flow.is_checked} onChange={ e => { toggleSelect( flow.id ) } } /> </td>
							<td> { flow.name } </td>
							<td className={'status-col'}> <p>{flow.status} <br /> {flow.date} </p> </td>
							<td> <strong> # </strong> </td>
						</tr>
					})}
				</tbody>


			</table>
		</>
	);
}

export default Table;