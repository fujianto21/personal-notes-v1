import React from 'react';
import NoteInput from '../components/NoteInput';
import ButtonAction from '../components/ButtonAction';
import { addNote } from '../utils/local-data';
import { useNavigate } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';

function AddPageWrapper() {
  const navigate = useNavigate();

  function saveNoteHandler(note) {
    addNote(note);
    navigate('/');
  }

  return <AddPage onSaveNoteHandler={saveNoteHandler} />;
}

class AddPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: ''
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyInputEventHandler = this.onBodyInputEventHandler.bind(this);
    this.onClickSaveButton = this.onClickSaveButton.bind(this);
  }

  onTitleChangeEventHandler(event) {
    this.setState(() => {
      return {
        title: event.target.value
      };
    });
  }

  onBodyInputEventHandler(event) {
    this.setState(() => {
      return {
        body: event.target.innerHTML
      };
    });
  }

  onClickSaveButton() {
    this.props.onSaveNoteHandler(this.state);
  }

  render() {
    return (
      <section className='add-new-page'>
        <NoteInput
          state={this.state}
          onTitleChange={this.onTitleChangeEventHandler}
          onBodyInput={this.onBodyInputEventHandler}
        />
        <div className='add-new-page__action'>
          <ButtonAction title='Simpan' onClick={this.onClickSaveButton} icon={<FiCheck />} />
        </div>
      </section>
    );
  }
}
export default AddPageWrapper;
