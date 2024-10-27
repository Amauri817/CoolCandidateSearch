import { useState, useEffect } from 'react';
import {Candidate} from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const candidates = JSON.parse(localStorage.getItem('SavedCandidates') || '[]');
    setSavedCandidates(candidates);
  }, []);

// Delete candidate from localStorage
const deleteCandidate = (username: string) => {
  try {
    const savedCandidates = JSON.parse(localStorage.getItem('SavedCandidates') || '[]');
    const updatedCandidates = savedCandidates.filter((saved: Candidate) => saved.login !== username);

    localStorage.setItem('SavedCandidates', JSON.stringify(updatedCandidates));
    console.log(`Candidate ${username} has been deleted.`);
    window.location.reload();
  } catch (error) {
    console.error('Error deleting candidate', error);
  }
};

  return (
    <div className='saved'>
      <h1 style={{textAlign:"center"}}>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Bio</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody style={{textAlign:"center"}}>
            {savedCandidates.map((candidate, index) => (
              <tr key={index}>
                <td>
                  <a href={candidate.html_url} target='_blank'><img src={candidate.avatar_url} alt={candidate.name} width={100}height={100}/></a>
                </td>
                <td>{candidate.login || "Empty"}</td>
                <td>{candidate.location || "Empty"}</td>
                <td>{candidate.email || "Empty"}</td>
                <td>{candidate.company || "Empty"}</td>
                <td>{candidate.bio || "Empty"}</td>
                <td>
                  <button style={{padding:"20px", backgroundColor:"red"}} onClick={() => deleteCandidate(candidate.login)}>➖</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No candidates have been accepted</p>
      )}
    </div>
  );
};

export default SavedCandidates;