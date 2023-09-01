@echo off

rem Check if Chrome is running
tasklist /fi "imagename eq chrome.exe" > nul
if %errorlevel% == 0 (
  echo "Chrome is running"
) else (
  echo "Chrome is not running"
  start chrome.exe
)

rem Sleep for 5 second
timeout 5