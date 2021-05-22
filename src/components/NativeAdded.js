// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeUserNative, updateProjectNotes } from '../redux/userNativesReducer';

const NativeAdded = (props) => {
  const dispatch = useDispatch();
  const { native_id, botanical_name, common_name, moisture, sun, height, bloom_time, src, project_notes } = props;

  [editing, setEditing] = useState(false);
  [projectNotesInput, setProjectNotesInput] = useState(project_notes);

  useEffect(() => {
    if (!editing) {
      dispatch(updateProjectNotes(id, projectNotesInput));
    };
  }, [editing])

  return (
    <li key={`nativeAdded${native_id}`}>
      <img className="nativeAddedPic" onClick={() => dispatch(removeUserNative(native_id))} alt={`${botanical_name}, commonly known as ${common_name}.`} src={src || "./placeholderFlower.png"} width='50px' />
      <span>Common Name:<strong>{common_name}</strong>, Botanical Name:<strong><em>{botanical_name}</em></strong>, Moisture:{moisture}, Sun:{sun}, Height:{height}, Bloom Time:{bloom_time}
        <button className="editProjectNotesButton" onClick={() => setEditing(!editing)}>Add Notes</button>
        {project_notes ? (<span>Notes: </span>) : null}
        <textarea className='nativeAddedText' disabled={editing ? false : true} onChange={e => setProjectNotes(e.target.value)} value={notesInput}></textarea>
      </span>
    </li>
  )
};

export default NativeAdded