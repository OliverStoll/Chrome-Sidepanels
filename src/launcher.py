import subprocess

link = "file://C:/DRIVE"
chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
subprocess.Popen([chrome_path, "--new-tab", link])