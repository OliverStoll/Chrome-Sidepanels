# (Even) better local explorer
QoL improvements to the local explorer chrome extension.


# How to install
- Install the local explorer chrome extension & configure it
- Install the "Better File explorer for Chrome"
- Install CSS & JS injection extensions (Amino: Live CSS Editor & Custom Javascript for Websites 2)
- Add the given files from this repo


# How to create launcher (Windows)
```shell
pyinstaller -i ../res/launcher.ico -n "Local Explorer" --onefile --noconsole --specpath build/ .\src\launcher.py
```