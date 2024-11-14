import React, { useEffect, useState } from 'react';

const Header: React.FC = () => {
  const [headerContent, setHeaderContent] = useState('');

  useEffect(() => {
    fetch('src/header.html')
      .then(response => response.text())
      .then(data => setHeaderContent(data));
  }, []);

  return <div id="header-container" className="header-container" dangerouslySetInnerHTML={{ __html: headerContent }} />;
};

export default Header;