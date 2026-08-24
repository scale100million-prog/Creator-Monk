import * as React from 'react';

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'wistia-player': React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLElement>,
          HTMLElement
        > & { 'media-id'?: string; aspect?: string };
      }
    }
  }
}

export {};


