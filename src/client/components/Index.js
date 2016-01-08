import React, { Component } from 'react';
import { Link } from 'react-router';
import DocumentMeta from 'react-document-meta';

export default class Index extends Component {
  render() {
    const tags = {
      title: 'This is the title',
      description: 'Wohoooooooo',
      meta: {
        name: {
          keywords: 'Nice!',
          'og:title': 'Nice!!!!',
        },
      },
    };

    return (
      <div>
        <DocumentMeta {...tags} extend />
        <Link to="/counter">Go Counter!</Link>
        <Link to="/admin">Go Admin!</Link>
      </div>
    );
  }
}
