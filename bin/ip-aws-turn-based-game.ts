#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { IpAwsTurnBasedGameStack } from '../lib/ip-aws-turn-based-game-stack';

const app = new cdk.App();
new IpAwsTurnBasedGameStack(app, 'IpAwsTurnBasedGameStack');
