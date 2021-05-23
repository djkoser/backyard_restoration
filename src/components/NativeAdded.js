// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeUserNative, updateProjectNotes } from "../redux/userNativesReducer";

const NativeAdded = (props) => {
  const dispatch = useDispatch();
  const { native_id, botanical_name, common_name, moisture, sun, height, bloom_time, src, project_notes } = props;

  const [editing, setEditing] = useState(false);
  const [projectNotesInput, setProjectNotesInput] = useState(project_notes);

  useEffect(() => {
    if (!editing) {
      dispatch(updateProjectNotes(native_id, projectNotesInput));
    }
  }, [editing]);

  return (
    <li>
      <img className="nativeAddedPic" onClick={() => dispatch(removeUserNative(native_id))} alt={`${botanical_name}, commonly known as ${common_name}.`} src={src || "./placeholderFlower.png"} width='50px' />
      <span>Common Name:<strong>{common_name}</strong>, Botanical Name:<strong><em>{botanical_name}</em></strong>, Moisture:{moisture}, Sun:{sun}, Height:{height}, Bloom Time:{bloom_time}
        <button className="editProjectNotesButton" onClick={() => setEditing(!editing)}>Add Notes</button>
        {project_notes ? (<span>Notes: </span>) : null}
        <textarea className='nativeAddedText' disabled={editing ? false : true} onChange={e => setProjectNotesInput(e.target.value)} value={projectNotesInput}></textarea>
      </span>
    </li>
  );
};

export default NativeAdded;