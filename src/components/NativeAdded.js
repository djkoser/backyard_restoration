// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeUserNative, updateProjectNotes } from '../redux/userNativesReducer';

const NativeAdded = (props) => {
  const dispatch = useDispatch();
  const { native_id, botanical_name, common_name, moisture, sun, height, src, project_notes } = props;

  const [editing, setEditing] = useState(false);
  const [projectNotesInput, setProjectNotesInput] = useState(project_notes);

  useEffect(() => {
    if (!editing && project_notes !== projectNotesInput) {
      dispatch(updateProjectNotes(native_id, projectNotesInput));
    }
  }, [editing]);

  return (
    <div className="nativeAddedLI">
      <div>
        <img className="nativeAddedPic" onClick={() => dispatch(removeUserNative(native_id))} alt={`Added plant ${botanical_name}, commonly known as ${common_name}.`} src={src} width='50px' />
        <strong>Common Name: </strong>{common_name}, <strong>Botanical Name: </strong><em>{botanical_name}</em>, <strong>Moisture: </strong>{moisture}, <strong>Sun: </strong>{sun}, <strong>Height: </strong>{height} in
      </div>
      <li className='nativeAddedInputs'>
        <button className="editProjectNotesButton" onClick={() => setEditing(!editing)}>{!project_notes && !editing ? 'Add Notes' : project_notes && !editing ? 'Edit Notes' : 'Submit'}</button>
        <span className={`toPrint ${project_notes ? '' : 'hideInPrint'}`} >Notes: </span>
        <span className="toPrint">{project_notes}</span>
        <textarea rows="2" className='nativeAddedText' disabled={editing ? false : true} onChange={e => setProjectNotesInput(e.target.value)} value={projectNotesInput}></textarea>
      </li>
    </div>
  );
};

export default NativeAdded;