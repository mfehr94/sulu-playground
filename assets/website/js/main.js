// This is the main file for the javascript.
import './polyfills'; // Should stay as first imported file.
import web from '@sulu/web';
import $ from 'jquery';

// Core components:
// Import Expand from '@sulu/web/packages/components/expand/expand';

// Import your components here:
// Import TestComponent from './component/filename';

window.$ = window.jQuery = $;
window.web = web;

// Register core components here:
// Web.registerComponent('expand', Expand);

// Register your components here:
// Web.registerComponent('test-component', TestComponent);
