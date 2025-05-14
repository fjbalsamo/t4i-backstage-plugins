import {
  InfoCard,
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
} from '@backstage/core-components';
import { Grid, Typography } from '@material-ui/core';
import React from 'react';

export const RootComponent = () => {
  return (
    <Page themeId="tool">
      <Header title="Benvenido a azure-gpt!" subtitle="IA en backstage">
        <HeaderLabel label="Owner" value="Team X" />
        <HeaderLabel label="Lifecycle" value="Alpha" />
      </Header>
      <Content>
        <ContentHeader title="Tech 4 Impact"></ContentHeader>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <InfoCard title="¿Necesitas ayuda?">
              <Typography variant="body1">
                Gracias por usar nuestro plugin de IA. Si tienes alguna pregunta
                o necesitas ayuda, no dudes en contactarnos. Estamos aquí para
                ayudarte a aprovechar al máximo esta herramienta.
              </Typography>
            </InfoCard>
          </Grid>
          <Grid item>
            <h1>Aqui va el contenido del plugin</h1>
          </Grid>
        </Grid>
      </Content>
    </Page>
  );
};
