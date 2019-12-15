const theme = {
  color: {
    accent: {
      primary: {
        base: '#445ee9',
        light: '#32dfff',
      },
      secondary: '#c344e9',
      error: '#f21a2c',
      blocked: '#aaa',
    },
    background: {
      base: '#fff',
      light: '#f5f5f5',
      dark: '#222',
      overlay: 'rgba(0, 0, 0, 0.5)',
    },
    text: {
      primary: '#222',
      secondary: '#aaa',
      tertiary: '#fff',
      base: '#666',
    },
    elements: {
      line: '#ddd',
      icon: {
        base: '#aaa',
        active: '#222',
        inverse: '#fff',
      },
    },
  },
  font: {
    family: 'Quicksand, sans-serif',
    size: {
      base: '16px',
      heading: {
        primary: '3rem',
        secondary: '2rem',
        tertiary: '1.5rem',
        base: '1rem',
      },
      label: {
        primary: '1rem',
        secondary: '0.875rem',
        tertiary: '0.75rem',
        base: '1rem',
      },
    },
    weight: {
      base: '500',
      bold: '700',
    },
    lineHeight: {
      label: '1.2',
      heading: '1.3',
      caption: '1.5',
      text: '1.8',
    },
  },
  size: {
    borderRadius: '6px',
    border: '1px',
    line: '2px',
    gap: '5px',
    chart: '5px',
  },
  layer: {
    content: '1',
    raised: '10',
    floating: '100',
    navigation: '300',
    overlay: '400',
    modal: '500',
  },
  effects: {
    overlay: {
      primary: '#445ee9c0',
      light: '#ffffffc0',
      dark: '#000000c0',
    },
    shadow: '0 3px 15px 0 rgba(0, 0, 0, 0.06)',
    transition: {
      quick: '0.2s ease-out',
      base: '0.4s ease-out',
      slow: '1s ease-out',
    },
    pressed: 'scale(0.95)',
  },
};

export default theme;
