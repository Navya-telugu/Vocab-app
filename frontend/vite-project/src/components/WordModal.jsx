import React from 'react';
import { Modal, Typography, Box, Button } from '@mui/material';

const WordModal = ({ word, open, handleClose }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Typography variant="h4">{word.word}</Typography>
                <Typography variant="body1">Definition: {word.definition || "N/A"}</Typography>
                <Typography variant="body1">Phonetics: {word.phonetics || "N/A"}</Typography>
                {word.examples && word.examples.length > 0 ? (
                    <Typography variant="body2">Examples: {word.examples.join(', ')}</Typography>
                ) : (
                    <Typography variant="body2">No examples available.</Typography>
                )}
                <Button onClick={handleClose}>Close</Button>
            </Box>
        </Modal>
    );
};

export default WordModal;
