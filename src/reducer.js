
import defaultLists from './Data';

const reducer = (state, action) => {
	switch ( action.type ) {
		case 'toggle_select':
			let input_id = action.playload.select_id;

			return state.map( list => {
				if ( input_id === list.id ) {
					return {...list, is_checked: !list.is_checked}
				}
				return list;
			} );

		case 'toggle_all':
			return state.map( list => {
				return {...list, is_checked: action.checked}
			} );
		case 'add_new_list':

			return [...state, ...[action.playload.newList]];

		case 'bulk_action':

			if ( 'delete' === action.playload ) {
				return state.filter( list => {
					return !list.is_checked;
				} );
			}
			return state;
		case 'delete_row':
			return [...state.slice( 0, action.playload.list_index ), ...state.slice( action.playload.list_index + 1 )];
		case 'update_list_name':
			let list_index = action.playload.list_index;
			let list_name = action.playload.new_name;

			let new_state = [...state];
			new_state[list_index] = {...new_state[list_index], name: list_name}
			return new_state;

		case 'search' :
			let search_term = action.playload.search_term.toLowerCase();

			if ( search_term.length ) {
				return defaultLists.filter( list => {
					return list.name.toLowerCase().includes( search_term );
				} );
			}

			return defaultLists;

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