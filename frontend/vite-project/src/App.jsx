import axios from 'axios';
import { useState, useEffect } from 'react';
import WordList from './components/WordList'; // Make sure this path is correct

const App = () => {
    const [word, setWord] = useState('');
    const [words, setWords] = useState([]);

    // Fetch words from the backend
    const fetchWords = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/words');
            console.log(response.data)
            setWords(response.data);
        } catch (error) {
            console.error('Error fetching words:', error);
        }
    };

    // Add a word to the backend
    const addWord = async () => {
        if (word.trim() === '') {
            alert('Please enter a word');
            return;
        }

        try {
            await axios.post('http://localhost:3000/api/words/add', { word });
            setWord('');  // Clear input after successful submission
            fetchWords();  // Refresh word list
        } catch (error) {
            console.error('Error adding word:', error);
        }
    };

    useEffect(() => {
        fetchWords();  // Load words on component mount
    }, []);

    return (
        <div>
            <h1>Vocabulary App</h1>
            <input
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="Enter a word"
            />
            <button onClick={addWord}>Add Word</button>

            {/* Use WordList component to display word cards */}
            <WordList words={words} />
        </div>
    );
};

export default App;
