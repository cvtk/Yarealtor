import { EventBus } from './event-bus.js';

EventBus.$on('onAuthStateChanged', user => {
  console.log('onAuthStateChanged');
});