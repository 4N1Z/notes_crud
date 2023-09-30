import Link from "next/link";
import styles from "./Notes.module.css";
import CreateNote from "./CreateNote";

// We come to /notes and this page.tsx will be rendered. Only this can be rendered.
async function getNotes() {
  const res = await fetch(
    "http://127.0.0.1:8090/api/collections/notes/records",
    { cache: "no-cache" }
  );

  const data = await res.json();
  return data?.items as any[];
}

//This is the card for the note.
function Note({ note }: any) {
  const { id, title, content, created } = note || {};
  return (
    <Link href={`/notes/${id}`}>
      <div className={styles.note}>
        <h2>{title}</h2>
        <h5>{content}</h5>
        <p>{created}</p>
      </div>
    </Link>
  );
}

export default async function NotesPage() {
  const notes = await getNotes();
  return (
    <div>
      <h1>Notes - folder</h1>
      <div className={styles.grid}>
        {notes?.map((note) => {
          return <Note key={note._id} note={note} />;
        })}
      </div>
      <CreateNote />
    </div>
  );
}
