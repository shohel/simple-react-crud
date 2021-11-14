import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {remotePost} from '../utils/remoteRequest';
import tableCss from './Table.module.scss';
import Skeleton from 'react-loading-skeleton';
import styles from '../dynamicFormBuilder.module.scss'
import RenderField from '../form/RenderField';


const DynamicForm = () => {
	const { register, handleSubmit, watch, formState: { errors } } = useForm();
	const [initApiLoaded, setInitApiLoaded] = useState( false );
	const [fields, setFields] = useState( [] );

	useEffect( () => {

		remotePost( _rdlist_object.rest_routes.get_form_fields ).then( response => {
			if ( response.success ) {
				setFields( JSON.parse(response.fields) );
			}
			setInitApiLoaded(true);
		} );

	}, [] );



	return (

		<div className={styles.frontendFormWrap}>
			{!!initApiLoaded ?
				<>
					{!!fields.length &&
					 <>
						 <h1> Form </h1>
						 <RenderField fields={fields} />
					 </>
					}
				</>

				:

				<Skeleton count={5} />
			}

		</div>

	);

}

export default DynamicForm;