#!/usr/bin/env node

//const { Command } = require('commander');
import {Command} from 'commander';
const program = new Command();

program
  .name('Mans commande...')
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0');

program.command('ifnti')
    .argument('<string>', "Niveau etude (L1, L2 ou L3)")
    .action((str, options) => {
        console.log("Bonjour " + str);     
    });

program.parse();
