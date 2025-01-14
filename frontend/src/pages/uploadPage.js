import React, { useState, useEffect } from 'react';

function UploadPage({ walletAddress }) {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    const fetchNfts = async () => {
      try {
        const response = await fetch(`/nfts/${walletAddress}`);
        const data = await response.json();
        setNfts(data);
      } catch (error) {
        console.error('Error fetching NFTs:', error);
      }
    };

    if (walletAddress) {
      fetchNfts();
    }
  }, [walletAddress]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('walletAddress', walletAddress);

    try {
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log('Upload successful:', data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <h1>Upload Page</h1>
      <div>
        <h2>Your NFTs</h2>
        <ul>
          {nfts.map((nft, index) => (
            <li key={index}>
              <img src={nft.image_url} alt={nft.name} width="100" />
              <p>{nft.name}</p>
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            File:
            <input type="file" onChange={handleFileChange} />
          </label>
        </div>
        <div>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Description:
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default UploadPage;