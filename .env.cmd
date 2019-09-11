@echo off
%1 mshta vbscript:CreateObject("Shell.Application").ShellExecute("cmd.exe","/c %~s0 ::","","runas",1)(window.close)&&exit
cd /d "%~dp0"
color 0A

cmd /c npm config set registry "http://registry.npmjs.org" 
cmd /c npm config set prefix "D:\nvm\nodejs\npm_global"
cmd /c npm config set cache "D:\nvm\nodejs\npm_cache"
cmd /c npm config set python "D:\Python\Python37\"

echo:
cmd /k cd /d %cd%
