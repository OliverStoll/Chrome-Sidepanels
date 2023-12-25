import subprocess
import psutil
import pychrome


chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"


def open_in_new_window(link="file://C:/DRIVE"):
    subprocess.Popen([chrome_path, "--new-window", link])


def open_in_new_tab(link="file://C:/DRIVE"):
    subprocess.Popen([chrome_path, "--new-tab", link])







if __name__ == "__main__":
    open_in_new_window()
