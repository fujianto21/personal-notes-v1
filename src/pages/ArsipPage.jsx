import React from 'react';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import { getArchivedNotes } from '../utils/local-data';
import { useSearchParams } from 'react-router-dom';

function ArsipPageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return <ArsipPage defaultKeyword={keyword} keywordChange={changeSearchParams} />;
}

class ArsipPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getArchivedNotes(),
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
        <h2>Catatan Arsip</h2>
        <SearchBar keyword={this.state.keyword} keywordChange={this.onKeywordChangeHandler} />
        <NoteList notes={notes} />
      </section>
    );
  }
}

export default ArsipPageWrapper;
