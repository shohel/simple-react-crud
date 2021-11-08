
import defaultFlows from './Data';

const reducer = (state, action) => {
	switch ( action.type ) {
		case 'toggle_select':
			let input_id = action.playload.select_id;

			return state.map( flow => {
				if ( input_id === flow.id ) {
					return {...flow, is_checked: !flow.is_checked}
				}
				return flow;
			} );

		case 'toggle_all':
			return state.map( flow => {
				return {...flow, is_checked: action.checked}
			} );
		case 'add_new_flow':

			return [...state, ...[action.playload.newFlow]];

		case 'bulk_action':

			if ( 'delete' === action.playload ) {
				return state.filter( flow => {
					return !flow.is_checked;
				} );
			}
			return state;
		case 'delete_row':
			return [...state.slice( 0, action.playload.flow_index ), ...state.slice( action.playload.flow_index + 1 )];
		case 'update_flow_name':
			let flow_index = action.playload.flow_index;
			let flow_name = action.playload.new_name;

			let new_state = [...state];
			new_state[flow_index] = {...new_state[flow_index], name: flow_name}
			return new_state;

		case 'search_flows' :
			let search_term = action.playload.search_term.toLowerCase();

			if ( search_term.length ) {
				return defaultFlows.filter( flow => {
					return flow.name.toLowerCase().includes( search_term );
				} );
			}

			return defaultFlows;

		case 'upload_json' :

			let uploaded_json_data = action.playload.json_data;

			if ( uploaded_json_data.length ) {
				alert( 'Json data has been imported successfully.' );
				return uploaded_json_data;
			}

			return state;

		default:
			return state;
	}
}

export default reducer;