vmmng
======

Simple, yet effective, VMWare ESXi comand line wrapper written in Ruby. I wrote this so I don't have to use that pesky Windows VM to power on and off appliances. I will keep adding more stuff to this when I can.

##Usage

    vmmng [list | status | on | off | restart] {Vmid}
            list - This will list all available VM's on the ESXi host
            status {Vmid} - Checks the power state of the specified VM
            on {Vmid} - Turns on the VM
            off {Vmid} - Turns off the VM
            restart {Vmid} - Turns on and off the VM

##Installation

1. Clone the repo

    `git clone https://github.com/andreicek/vmmng.git`
    
2. Edit the script and replace `USERNAME` and `HOSTNAME`

    `USERNAME = root`
    
    `HOSTNAME = the.server.com`

3. Move the `vmmng` script in your bin folder

    `mv vmmng ~/.dotfiles/bin`
    
4. Allow it to run

    `chmod +x ~/.dotfiles/bin/vmmng`
    
##Dependencies

* Any Ruby
* Shell access turned on on ESXi and key auth on also
