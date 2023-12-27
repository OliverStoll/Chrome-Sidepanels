# Do everything in chrome
Bundle of chrome extensions to do everything in chrome. This is a personal project to make my life easier. Feel free to use it if you want.


# How to install
- Clone the repo
- Install the chrome extensions via [chrome://extensions]() -> Developer mode -> Load unpacked
- 


#### How to create launcher (Windows)
```shell
# create local explorer launcher
pyinstaller -i ../res/launcher.ico -n "Local Explorer" --onefile --noconsole --specpath build/ .\src\launcher\local-explorer.py
# create chatgpt launcher
pyinstaller -i ../res/chatgpt.ico -n "ChatGPT" --onefile --noconsole --specpath build/ .\src\launcher\chatgpt.py
# create spotify launcher
pyinstaller -i ../res/spotify.ico -n "Spotify" --onefile --noconsole --specpath build/ .\src\launcher\spotify.py
```

# Additional Info
This repository depends on additional installations of autohotkey to handle focus of the sidebar