import subprocess
import pyautogui
from time import sleep


link = "file://C:/DRIVE"
subprocess.Popen([r"C:\Program Files\Google\Chrome\Application\chrome.exe", "--new-window", link])
sleep(0.1)
pyautogui.hotkey('win', 'left')
