import React from 'react';
import CustomPropTypes from '../utils/CustomPropTypes';
import Layout from '../components/Layout';
import Title from '../components/Title';
import Section from '../components/Section';
import OptionList from '../components/OptionList';
import BackButton from '../components/BackButton';

const AboutScreen = ({ history }) => (
  <Layout narrow>
    <BackButton history={history} />
    <Title>About</Title>
    <Section>
      <h2>What is Tourie?</h2>
      <p>
        Tourie is an intelligent city guide, which can plan a whole route for you and assist you
        during a trip. Watch it learn your habits and inherit your way of thinking. You can
        safely rely on it.
      </p>
    </Section>
    <Section>
      <h2>Team</h2>
      <p>
        Highly skilled and driven individuals, who worked together to make it all possible.
      </p>
      <OptionList>
        <span>Tomasz Gil</span>
        <span>Piotr Janiszewski</span>
        <span>Piotr Ptak</span>
        <span>Mikołaj Rozwadowski</span>
      </OptionList>
    </Section>
  </Layout>
);

AboutScreen.propTypes = {
  history: CustomPropTypes.history.isRequired,
};

export default AboutScreen;
