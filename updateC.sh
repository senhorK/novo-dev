

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













git config --global --add safe.directory /storage/emulated/0/Documents/dev/public

git init

git remote add origin https://github.com/senhorK/novo-dev.git

git add .

git commit -m "primeiro commit"

git branch -M main

git push -u origin main
