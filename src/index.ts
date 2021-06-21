import { App } from '@aws-cdk/core';
import { JaiTest1Stack } from './jai-test-1-stack';

const app = new App();
new JaiTest1Stack(app, 'JaiTest1Stack');
