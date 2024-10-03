import React, { useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import WordModal from './WordModal';

const WordCard = ({ word }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Card>
                <CardContent>
                    <Typography variant="h5">{word.word}</Typography>
                    <Typography variant="body2">{word.definition}</Typography>
                    <Button variant="outlined" onClick={() => setOpen(true)}>
                        View Details
                    </Button>
                </CardContent>
            </Card>
            <WordModal word={word} open={open} handleClose={() => setOpen(false)} />
        </>
    );
};

export default WordCard;
