import styled, { withTheme } from 'styled-components';
import React from 'react';
import 'react-circular-progressbar/dist/styles.css';
import CircularProgressbar from 'react-circular-progressbar';
import Card from './Card';
import Grid from './Grid';
import { Label } from './Label';
import Subtitle from './Subtitle';

const TopCard = styled(Card)`
  margin-bottom: ${({ theme }) => theme.size.gap};
`;

const CardContent = styled.div`
  display: flex;
  align-items: center;
`;

const ChartWrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 8rem;
  margin-right: 1.2rem;
`;

const ValueLabel = styled(Label)`
  color: ${({ theme }) => theme.color.text.primary};
  font-size: ${({ theme }) => theme.font.size.heading.tertiary};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  margin-right: 0.5rem;
`;

const BlockLabel = styled(Label)`
  display: inline-block;
`;

const PieChart = withTheme(({ theme, value, total }) => (
  <CircularProgressbar
    initialAnimation
    percentage={parseInt(value / total * 100, 10)}
    text={value}
    styles={{
      trail: {
        stroke: theme.color.elements.line,
      },
      path: {
        stroke: theme.color.accent.secondary,
      },
      text: {
        fill: theme.color.text.primary,
        fontSize: theme.font.size.heading.secondary,
        fontWeight: theme.font.weight.bold,
      },
    }}
  />
));

const Statistics = ({ primary, secondary }) => (
  <>
    <TopCard bottomFlat>
      <CardContent>
        <ChartWrapper>
          <PieChart
            value={primary.value}
            total={primary.total}
          />
        </ChartWrapper>
        <div>
          <Subtitle>{primary.title}</Subtitle>
          <Label size="tertiary">{primary.text}</Label>
        </div>
      </CardContent>
    </TopCard>
    <Card topFlat>
      <Grid cols={2}>
        {secondary.map(({ value, label }) => (
          <div key={label}>
            <ValueLabel inline>{value}</ValueLabel>
            <BlockLabel size="tertiary">{label}</BlockLabel>
          </div>
        ))}
      </Grid>
    </Card>
  </>
);

export default Statistics;
