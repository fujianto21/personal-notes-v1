import React from 'react';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import ButtonAction from '../components/ButtonAction';
import { getActiveNotes } from '../utils/local-data';
import { useSearchParams } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function HomePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  const navigate = useNavigate();
  function addButtonHandler() {
    navigate('/notes/new');
  }

  return <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} onAddButtonHandler={addButtonHandler} />;
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getActiveNotes(),
      keyword: props.defaultKeyword || ''
    };

    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
  }

  onKeywordChangeHandler(keyword) {
    this.setState(() => {
      return {
        keyword
      };
    });
    this.props.keywordChange(keyword);
  }

  render() {
    const notes = this.state.notes.filter(({ title }) =>
      title.toLowerCase().includes(this.state.keyword.toLowerCase())
    );

    return (
      <section className='homepage'>
        <h2>Catatan Aktif</h2>
        <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />
        <NoteList notes={notes} />
        <div className='homepage__action'>
          <ButtonAction title='Tambah' onClick={this.props.onAddButtonHandler} icon={<FiPlus />} />
        </div>
      </section>
    );
  }
}

export default HomePageWrapper;
