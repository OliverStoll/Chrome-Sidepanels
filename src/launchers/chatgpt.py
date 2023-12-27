import subprocess
import pyautogui
from time import sleep


link = "chat.openai.com"
subprocess.Popen([r"C:\Program Files\Google\Chrome\Application\chrome.exe", "--new-window", link])
sleep(0.1)
pyautogui.hotkey('win', 'right')




