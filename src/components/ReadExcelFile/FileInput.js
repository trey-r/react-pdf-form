const FileInput = ({ onFileSelect }) => {
  const onFileChange = (e) => {
    const file = e.target.files[0];
    onFileSelect(file);
  };

  return <input type="file" onChange={onFileChange} />;
};

export default FileInput;
