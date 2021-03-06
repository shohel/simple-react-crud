const reducer = (state, action) => {

	const data = state.data;
	let newData;

	switch ( action.type ) {
		case 'UPDATE' :
			return action.playload;
		case 'paginate':

			return {...state, current_page: action.current_page};
		case 'toggle_select':
			let input_id = action.playload.select_id;

			newData = data.map( list => {
				if ( input_id === list.list_ID ) {

					return {...list, is_checked: !list.is_checked}
				}
				return list;
			} );

			return {...state, data: newData};

		case 'toggle_all':
			newData = data.map( list => {
				return {...list, is_checked: action.checked}
			} );

			return {...state, data: newData};

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

			newData = [...data.slice( 0, action.playload.list_index ), ...data.slice( action.playload.list_index + 1 )];
			return {
				...state,
				data: newData,
				total: (
					state.total - 1
				)
			};

		case 'edit_list':

			let getListIndex = state.data.findIndex( list => {
				return list.list_ID === action.playload.list_ID;
			} );

			let new_state = {...state};
			new_state.data[getListIndex] = {...action.playload}

			return new_state;

		case 'search' :
			let search_term = action.playload.search_term.toLowerCase();

			return {...state, search_term: search_term};

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