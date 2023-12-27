import subprocess
import pyautogui
from time import sleep

link = "chrome://newtab"
subprocess.Popen([r"C:\Program Files\Google\Chrome\Application\chrome.exe", "--new-window", link])
sleep(0.1)
pyautogui.hotkey('win', 'right')
sleep(0.3)
pyautogui.hotkey('alt', 'u')
sleep(0.3)
pyautogui.hotkey('tab')




