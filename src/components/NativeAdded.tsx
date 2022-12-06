import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteUserNative,
  updateUserNative
} from '../redux/userNativePlantsSlice';
import { NativeAddedProps } from '../types';

const NativeAdded: React.FC<NativeAddedProps> = (props) => {
  const dispatch = useDispatch();
  const {
    id,
    botanicalName,
    commonName,
    moisture,
    sun,
    height,
    src,
    projectNotes
  } = props;

  const [editing, setEditing] = useState(false);
  const [projectNotesInput, setProjectNotesInput] = useState(projectNotes);

  useEffect(() => {
    if (!editing && projectNotes !== projectNotesInput) {
      dispatch(updateUserNative({ id, projectNotes: projectNotesInput }));
    }
  }, [editing]);

  return (
    <div className="nativeAddedLI">
      <div>
        <img
          className="nativeAddedPic"
          onClick={() => dispatch(deleteUserNative(id))}
          alt={`Added plant ${botanicalName}, commonly known as ${commonName}.`}
          src={src}
          width="50px"
        />
        <strong>Common Name: </strong>
        {commonName}, <strong>Botanical Name: </strong>
        <em>{botanicalName}</em>, <strong>Moisture: </strong>
        {moisture}, <strong>Sun: </strong>
        {sun}, <strong>Height: </strong>
        {height} in
      </div>
      <li className="nativeAddedInputs">
        <button
          className="editProjectNotesButton"
          onClick={() => setEditing(!editing)}
        >
          {!projectNotes && !editing
            ? 'Add Notes'
            : projectNotes && !editing
            ? 'Edit Notes'
            : 'Submit'}
        </button>
        <span className={`toPrint ${projectNotes ? '' : 'hideInPrint'}`}>
          Notes:{' '}
        </span>
        <span className="toPrint">{projectNotes}</span>
        <textarea
          rows={2}
          className="nativeAddedText"
          disabled={editing ? false : true}
          onChange={(e) => setProjectNotesInput(e.target.value)}
          value={projectNotesInput}
        ></textarea>
      </li>
    </div>
  );
};

export default NativeAdded;
