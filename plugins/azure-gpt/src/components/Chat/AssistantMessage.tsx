import React from 'react';
import { Box, IconButton, Tooltip } from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ReactMarkdown from 'react-markdown';

type Props = {
  message: string;
};

export const AssistantMessage = (props: Props) => {
  const { message } = props;

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
  };

  return (
    <Box flexGrow={1} display="flex" flexDirection="column">
      <Box flexGrow={1} display="flex" flexDirection="row">
        <Box flexGrow={1} />
        <Tooltip title="Copiar Respuesta">
          <IconButton onClick={handleCopy}>
            <FileCopyIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <ReactMarkdown>{message}</ReactMarkdown>
    </Box>
  );
};
