#!/bin/bash

echo "🚀 Atualizando projeto..."



RED="\e[31m"
GREEN="\e[32m"
BLUE="\e[34m"
RESET="\e[0m"



echo -e "${RED}██████╗  █████╗ ███╗   ██╗███████╗${RESET}"
echo -e "${RED}██╔══██╗██╔══██╗████╗  ██║██╔════╝${RESET}"
echo -e "${RED}██████╔╝███████║██╔██╗ ██║█████╗  ${RESET}"
echo -e "${RED}██╔═══╝ ██╔══██║██║╚██╗██║██╔══╝  ${RESET}"
echo -e "${RED}██║     ██║  ██║██║ ╚████║███████╗${RESET}"
echo -e "${RED}╚═╝     ╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝${RESET}"
echo "╔══════════════════════════════════════╗"
echo "║        Upgrade do Novo Dev           ║"
echo "╠══════════════════════════════════════╣"
echo "║                                      ║"
echo "║                                      ║"
echo "║    ️⚠️        LOGIN INFOR              ║"
echo "║                                      ║"
echo "║                                      ║"
echo "║                                      ║"
echo "║                                      ║"
echo "║     👤       UserName: senhorK       ║"
echo "║     🔑       Password: TOKEN ONLY    ║"
echo "║                                      ║"
echo "║                                      ║"
echo "║                                      ║"
echo -e "║ ${GREEN}https://github.com/settings/tokens   ${RESET}║"
echo "║                                      ║"
echo "║                                      ║"
echo "║      💀  Nao user Senha Normal💀     ║"
echo "║                                      ║"
echo "╚══════════════════════════════════════╝"


















git add .

echo "📝 Mensagem do commit:"
read msg

git commit -m "$msg"
git push origin main

echo "✅ Atualizado com sucesso!"
