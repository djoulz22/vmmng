#!/usr/bin/env node
var commandLineArgs = require('command-line-args');

var exec = require('./exec');

var cli = commandLineArgs([
    { name: "list", alias: "l", type: Boolean},
    { name: "on", alias: "o", type: Number, multiple: true },
    { name: "off", alias: "f", type: Number, multiple: true },
    { name: "status", alias: "s", type: Number, multiple: true },
    { name: "help", alias: "h", type: Boolean, defaultOption: false}
]);

var usage = cli.getUsage({
    title: "vmmng",
    description: "VMWare ESXi command line wrapper",
    footer: "Project home: [underline]{https://github.com/andreicek/vmmng}"
});

var options = cli.parse();

if (options.help) {
  console.log(usage);
}
else if (options.list) {
  exec.getAll(function(vms) {
    console.log(vms);
  });
}
else if (typeof options.on !== "undefined") {
  exec.on(options.on[0], function(stdout) {
    console.log(stdout);
  });
}
else if (typeof options.off !== "undefined") {
  exec.off(options.off[0], function(stdout) {
    console.log(stdout);
  });
}
else if (typeof options.status !== "undefined") {
  exec.status(options.status[0], function(stdout) {
    console.log(stdout);
  });
}
else {
  console.log(usage);
}
