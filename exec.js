// exec.js
var SSH = require('simple-ssh');
var Table = require('cli-table');
var fs = require('fs');
var vimcmd = "vim-cmd";

var ssh = new SSH({
    host: 'esxi01.d.h',
    user: 'root',
    key: fs.readFileSync(process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'] + '/.ssh/id_rsa')
});

module.exports = {
  getAll: function(callback) {
    ssh.exec(vimcmd, {
      args: ['vmsvc/getallvms'],
      out: function(stdout) {
        var output = formatListToTable(stdout);

        callback(output);
      }
    }).start();
  },
  on: function(vm, callback) {
    ssh.exec(vimcmd, {
      args: ['vmsvc/power.on', vm],
    })
    .exec(vimcmd, {
      args: ['vmsvc/power.getstate', vm],
      out: function(stdout) {
        callback(stdout.split('\n')[1]);
      }
    })
    .start();
  },
  off: function(vm, callback) {
    ssh.exec(vimcmd, {
      args: ['vmsvc/power.off', vm],
    })
    .exec(vimcmd, {
      args: ['vmsvc/power.getstate', vm],
      out: function(stdout) {
        callback(stdout.split('\n')[1]);
      }
    })
    .start();
  },
  status: function(vm, callback) {
    ssh.exec(vimcmd, {
      args: ['vmsvc/power.getstate', vm],
      out: function(stdout) {
        callback(stdout.split('\n')[1]);
      }
    }).start();
  }
}

ssh.on('error', function(err) {
    console.log('Oops, something went wrong.');
    console.log(err);
    ssh.end();
});

function formatListToTable(stdout) {
  var lines = stdout.split('\n');
  lines.shift();
  lines.pop();

  var table = new Table({
    head: ['ID', 'Name', 'OS'],
    chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
         , 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
         , 'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
         , 'right': '' , 'right-mid': '' , 'middle': ' ' },
    style: { 'padding-left': 0, 'padding-right': 0 }
  });

  lines.forEach(function(element) {
    var c = element.replace(/\s\s+/g, ' ').split(' ');
    var row = [c[0], c[1], c[4]];
    table.push(row);
  });

  return table.toString();
}
