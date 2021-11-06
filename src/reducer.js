
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
		default:
			return state;
	}
}

export default reducer;