import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'CSDN',
          title: '山异CSDN🧷',
          href: 'https://blog.csdn.net/qq_63683610?spm=1000.2115.3001.5343',
          blankTarget: true,
        },
        {
          key: 'Github',
          title: <GithubOutlined />,
          href: 'https://github.com/shangyisky',
          blankTarget: true,
        },
        {
          key: 'Github',
          title: 'Github',
          href: 'https://github.com/shangyisky',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
