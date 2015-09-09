vmmng
======

[![NPM](https://nodei.co/npm/vmmng.png)](https://nodei.co/npm/vmmng/)

Simple, yet effective, VMWare ESXi command line wrapper written in JavaScript. I wrote this so I don't have to use that pesky Windows VM to power on and off appliances. I will keep adding more stuff to this when I can.

##Usage

```
l, --list
-o, --on <number[]>
-f, --off <number[]>
-s, --status <number[]>
-h, --help
```

##Installation

```npm install -g vmmng```

##Dependencies

* You need to have a private key set up on the ESXi host, and located in your ```.ssh``` folder under the name ```id_rsa```.
