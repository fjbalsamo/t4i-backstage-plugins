import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Tooltip,
  Typography,
} from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ReactMarkdown from 'react-markdown';
import { IMessage } from '../../api/interfaces';

type ComponentProps = IMessage & {
  username?: string;
};

export const MdChatMessage = (props: ComponentProps) => {
  const { content, role, timestamp, username } = props;

  const user = username ?? 'Usuario';

  const dateStr = timestamp ? new Date(timestamp).toLocaleString() : '-';

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
  };

  return (
    <Card
      variant={role === 'user' ? 'outlined' : 'elevation'}
      style={{ minWidth: 800 }}
      elevation={role === 'user' ? 0 : 1}
    >
      <CardHeader
        title={
          <Typography variant="h6">
            {role === 'user' ? user : 'Asistente'}
          </Typography>
        }
        subheader={
          <Typography variant="caption" color="textSecondary">
            {dateStr}
          </Typography>
        }
        action={
          role === 'assistant' ? (
            <Tooltip title="Copiar Respuesta" placement="right">
              <IconButton onClick={handleCopy}>
                <FileCopyIcon />
              </IconButton>
            </Tooltip>
          ) : null
        }
      />
      <CardContent>
        <ReactMarkdown>{content}</ReactMarkdown>
      </CardContent>
    </Card>
  );
};
