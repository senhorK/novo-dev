#!/bin/bash

echo "🚀 Atualizando projeto..."

echo "⚠️ Lembrete:"
echo "Username: seu usuário GitHub"
echo "Senha: USE TOKEN (não é senha normal)"
echo "Pegue aqui: https://github.com/settings/tokens"
echo ""

git add .

echo "📝 Mensagem do commit:"
read msg

git commit -m "$msg"
git push origin main

echo "✅ Atualizado com sucesso!"
