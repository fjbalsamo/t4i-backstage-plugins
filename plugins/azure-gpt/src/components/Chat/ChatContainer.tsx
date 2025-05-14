import React from 'react';
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  Paper,
  Divider,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import SendIcon from '@material-ui/icons/Send';
import ChatIcon from '@material-ui/icons/Chat';
import CancelIcon from '@material-ui/icons/Cancel';
import { useChatContainer } from './useChatContainer';

export const ChatContainer = () => {
  const [
    { input, messages, loading },
    { setInput, onClickSend, onKeyDownSend, cleanChat },
  ] = useChatContainer();
  return (
    <Paper
      elevation={3}
      sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2 }}
    >
      <Box
        flexGrow={1}
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h5" gutterBottom>
          Chat Asistente
        </Typography>
        {messages.length > 0 && (
          <Tooltip title="Limpiar Chat" placement='left'>
            <IconButton onClick={cleanChat}>
              <CancelIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <Divider sx={{ mb: 2 }} />

      <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2, minHeight: 600 }}>
        {messages.length === 0 && (
          <Box
            flexGrow={1}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={6}
          >
            <Typography variant="h3" color="textSecondary" align="center">
              Comienza a chatear con el asistente.
            </Typography>
            <ChatIcon
              fontSize="large"
              color="disabled"
              style={{ fontSize: 200 }}
            />
          </Box>
        )}

        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              mb: 1,
            }}
          >
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                bgcolor: msg.sender === 'user' ? 'secondary.main' : 'grey.300',
                color: 'ActiveBorder',
                maxWidth: '70%',
              }}
            >
              <Typography variant="body2">{msg.text}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Escribe tu mensaje..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKeyDownSend}
          autoComplete="off"
          disabled={loading}
          InputProps={{
            endAdornment: loading ? (
              <CircularProgress color="inherit" size={20} />
            ) : null,
          }}
        />
        <Button
          color="success"
          onClick={onClickSend}
          variant="outlined"
          endIcon={<SendIcon />}
          disabled={loading}
        >
          Enviar
        </Button>
      </Box>
    </Paper>
  );
};
