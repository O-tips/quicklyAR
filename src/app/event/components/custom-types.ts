// custom-types.d.ts

import * as React from 'react';

declare module 'react' {
  interface IntrinsicElements {
    "a-scene": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    "a-assets": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    "a-asset-item": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    "a-camera": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    "a-entity": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    "a-gltf-model": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}
