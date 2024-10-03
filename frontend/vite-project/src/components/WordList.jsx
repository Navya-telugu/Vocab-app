import React from 'react';
import WordCard from './WordCard';
import { Grid } from '@mui/material';

const WordList = ({ words }) => {
    if (!Array.isArray(words)) {
        return <div>No words found.</div>;
    }

    return (
        <Grid container spacing={3}>
            {words.map((word) => (
                <Grid item key={word._id} xs={12} sm={6} md={4}>
                    <WordCard word={word} />
                </Grid>
            ))}
        </Grid>
    );
};

export default WordList;
