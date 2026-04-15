@echo off
setlocal

start "Quiz Backend" cmd /k "cd /d \"%~dp0backend\" && npm run dev"
start "Quiz Frontend" cmd /k "cd /d \"%~dp0frontend\" && npm run dev"

