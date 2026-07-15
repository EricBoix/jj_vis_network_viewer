import { useRef } from 'react';
import { useRdfStore } from '../hooks/useRdfStore';

export function LoadRdfButton() {
  const { loadRdfFromFile } = useRdfStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      loadRdfFromFile(file);
    }
  };

  return (
    <>
      <input
        type="file"
        accept=".ttl,.rdf,.nt"
        onChange={handleFileUpload}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        style={styles.button}
      >
        Load RDF File
      </button>
    </>
  );
}

const styles = {
  button: {
    backgroundColor: 'white',
    color: '#2B7CE9',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 500,
  },
} satisfies Record<string, React.CSSProperties>;
