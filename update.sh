#!/bin/bash

echo "🚀 Atualizando projeto..."

git add .

echo "📝 Digite a mensagem do commit:"
read msg

git commit -m "$msg"

git push origin main

echo "✅ Atualizado com sucesso!"
