import React from "react";
import { DictionaryEntry, Phonetic } from "../types/Dictionary";
import AudioPlayer from "./AudioPlayer";

interface Props {
  data: DictionaryEntry;
}

const WordResult: React.FC<Props> = ({ data }) => {
  const firstMeaning = data.meanings?.[0];
  const firstDef = firstMeaning?.definitions?.[0];
  const audioUrl = data.phonetics?.find((p) => p.audio)?.audio;

  return (
    <div className="card">
      <div className="word-header">
        <h2>{data.word}</h2>

        <div className="phonetics">
          {data.phonetics.map((p: Phonetic, i: number) => (
            <span key={i} className="phonetic-text">
              {p.text}
            </span>
          ))}
        </div>
      </div>

      <div className="meta">
        <p>
          <strong>Part of speech:</strong> {firstMeaning?.partOfSpeech}
        </p>
      </div>

      <div className="definition">
        <h3>Definition</h3>
        <p>{firstDef?.definition}</p>

        {firstDef?.example && (
          <blockquote className="example">"{firstDef.example}"</blockquote>
        )}
      </div>

      {audioUrl && <AudioPlayer src={audioUrl} />}
    </div>
  );
};

export default WordResult;
