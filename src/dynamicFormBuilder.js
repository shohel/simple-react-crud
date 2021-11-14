import React, {useState, useEffect} from 'react'
import styles from './dynamicFormBuilder.module.scss'
import tableCss from './elements/Table.module.scss'
import {useForm, useWatch} from 'react-hook-form';
import {remotePost} from './utils/remoteRequest';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const DynamicFormBuilder = () => {
	const [initApiLoaded, setInitApiLoaded] = useState( false );
	const [fields, setFields] = useState( [] );
	const {register, handleSubmit, watch, reset, formState: {errors}} = useForm();
	const fieldType = watch( 'fieldType' );

	useEffect( () => {

		remotePost( _rdlist_object.rest_routes.get_form_fields ).then( response => {
			if ( response.success ) {
				setFields( JSON.parse(response.fields) );
			}
			setInitApiLoaded(true);
		} );

	}, [] );

	const saveField = data => {
		data = {ID: new Date().getTime(), ...data, fieldName: camalize( data.fieldTitle )}

		const newFields = [...fields, data];
		setFields( newFields );
		reset();

		remotePost( _rdlist_object.rest_routes.save_form_fields, {fields: JSON.stringify( newFields )} );
	}
	
	const deleteField = (e, ID) => {
		e.preventDefault();

		const updatedFields = fields.filter( field => {
			return field.ID !== ID;
		} )

		setFields( updatedFields );

		remotePost( _rdlist_object.rest_routes.save_form_fields, {fields: JSON.stringify( updatedFields )} );
	}

	const camalize = function camalize( str ) {
		if ( !str ) {
			return ''
		}
		return str.replace( /\W /g, '' ).toLowerCase().replace( /[^a-zA-Z0-9]+(.)/g, ( m, chr ) => chr.toUpperCase() ).
		           trim();
	}

	return (
		<div className={styles.formBuilder}>
			<div className={styles.fieldsWrap}>
				<select {...register( 'fieldType' )} >
					<option value="">Select field type</option>
					<option value="text">Text</option>
					<option value="radio">Radio</option>
					<option value="checkbox">Checkbox</option>
					<option value="textarea">Text Area</option>
				</select>

				{fieldType &&

				 <div className={styles.fieldComposeWrap}>
					 <div className={styles.formGroup}>
						 <label>Field Title</label>
						 <input type="text" className={styles.formControl} {...register( 'fieldTitle', { required : true } )}  />

						 {errors.fieldTitle && <p className={styles.error}>The field title is required</p>}
					 </div>

					 <div className={styles.formGroup}>
						 <label>Required
							 <input type="checkbox"  {...register( 'isRequired' )} defaultValue={true}/>
						 </label>
					 </div>

					 <div className={styles.formGroup}>
						 <button type="button" className={'button-primary'} onClick={handleSubmit( saveField )}>Save
							 Field
						 </button>
					 </div>
				 </div>

				}
			</div>

			<div className={styles.fieldsList}>

				{!!initApiLoaded ?
					<>
						{!!fields.length &&
						 <>
							 <h1>Available Fields</h1>

							 <table className={tableCss.table}>

								 <thead>
									 <tr>
										 <th>Type</th>
										 <th>Title</th>
										 <th>Name</th>
										 <th>Required</th>
										 <th>Action</th>
									 </tr>
								 </thead>

								 <tbody>
									 {fields.map( function( field, index ) {
										 return (
											 <tr key={index}>
												 <td>{field.fieldType}</td>
												 <td>{field.fieldTitle}</td>
												 <td>{field.fieldName}</td>
												 <td>{field.isRequired}</td>
												 <td>
													 <button type="button" onClick={ e => { deleteField(e, field.ID) } } >X</button>
												 </td>
											 </tr>
										 )
									 } )}
								 </tbody>

							 </table>
						 </>
						}
					</>

					:

					<Skeleton count={5} />
				}

			</div>



		</div>

	)
}

export default DynamicFormBuilder;