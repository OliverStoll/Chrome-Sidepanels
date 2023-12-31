#Requires AutoHotkey v2.0
#Warn All, StdOut     ; Enable warnings to assist with detecting common errors.
#SingleInstance Force

; function that checks if alt+i is pressed in chrome
#HotIf WinGetProcessName("A") == "chrome.exe"


CheckIfSidebarOpen() {
    DetectHiddenText false
    text := WinGetText("A")
    DetectHiddenText true
    return StrCompare(text, "Chrome Legacy Window`r`n")
}

; TODO: check the window size and dont assume fullsized windows
ClickSidebarSimple(sleepTime := 500) {
    Sleep(100)
    if (CheckIfSidebarOpen()) {
        sleep(sleepTime)
        try {
            ControlClick "x1800 y140", "A"
        } catch {
        }
    }
    return
}




; focus chatgpt sidebar
~!i:: {
    Sleep(100)
    if (CheckIfSidebarOpen()) {
        sleep(500)
        loop 10 {
            sleep(100)
            try {
                ControlClick "x1800 y970", "A"
            } catch {
                continue
            }
        }
    }
}

; focus localexplorer sidebar
~!o:: ClickSidebarSimple()
~!u:: ClickSidebarSimple()
~!h:: ClickSidebarSimple(2000)