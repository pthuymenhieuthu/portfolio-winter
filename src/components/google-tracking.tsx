import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-JCEWNL7GJ3';
    script.async = true;
    document.head.appendChild(script);

    const inlineScript = document.createElement('script');
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-JCEWNL7GJ3');
    `;
    document.head.appendChild(inlineScript);
  }, []);

  return <div>Your React App</div>;
};

export default App;