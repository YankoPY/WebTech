import axios from 'axios';
import { useEffect, useState } from 'react';

const VotesList: React.FC = () => {
    const [votes, setVotes] = useState([]);

    useEffect(() => {
        const fetchVotes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/getVotes');
                setVotes(response.data);
            } catch (error) {
                console.error('Error fetching votes:', error);
            }
        };

        fetchVotes();
    }, []);

    return (
        <div>
            <h2>Votes List</h2>
            <ul>
                {votes.map((vote: any) => (
                    <li key={vote.id}>
                        Date: {vote.date}, Hour: {vote.hour}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VotesList;
