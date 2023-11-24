import React from 'react';
import NoteItem from './NoteItem';
import PropTypes from 'prop-types';

function NoteList({ notes }) {
  return (
    <div>
      {notes?.length > 0 ? (
        <section className='notes-list'>
          {notes.map(({ id, title, body, createdAt }) => (
            <NoteItem key={id} id={id} title={title} body={body} createdAt={createdAt} />
          ))}
        </section>
      ) : (
        <section className='notes-list-empty'>
          <p class='notes-list__empty'>Tidak ada catatan</p>
        </section>
      )}
    </div>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default NoteList;
