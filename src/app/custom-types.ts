/* eslint-disable */
import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "a-scene": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'mindar-image'?: string;
        'color-space'?: string;
        'renderer'?: string;  // Added this line to include the 'renderer' attribute
        'vr-mode-ui'?: string;
        'device-orientation-permission-ui'?: string;
      };
      "a-assets": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "a-asset-item": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'src'?: string;
      };
      "a-camera": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'position'?: string;
      };
      "a-entity": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "a-gltf-model": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'rotation'?: string;
        'position'?: string;
        'scale'?: string;
        'src'?: string;
        'visible'?: string;
      };
    }
  }
}
