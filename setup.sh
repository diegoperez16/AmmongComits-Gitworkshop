#!/bin/bash

# Run: chmod +x setup.sh && ./setup.sh

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}"
echo "╔═══════════════════════════════════════════════╗"
echo "║        🎮 NEON RUNNER MISSION BOARD 🎮        ║"
echo "╚═══════════════════════════════════════════════╝"
echo -e "${NC}"

# Check Node.js
echo -e "${YELLOW}Checking prerequisites...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not installed — get it from https://nodejs.org${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node --version)${NC}"

# Install dependencies
echo ""
echo -e "${YELLOW}Installing dependencies...${NC}"
npm install
echo -e "${GREEN}✓ Dependencies installed${NC}"

# Check .env.local
echo ""
echo -e "${YELLOW}Checking environment...${NC}"
if [ ! -f ".env.local" ]; then
    echo -e "${RED}⚠️  .env.local not found${NC}"
    echo ""
    echo "Create .env.local with your Supabase credentials:"
    echo ""
    echo "  NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co"
    echo "  NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>"
    echo "  NEXT_PUBLIC_GAME_REPO_URL=https://github.com/<org>/<repo>"
    echo ""
    echo "Then run setup.sql in the Supabase SQL Editor."
    echo ""
    read -p "Press Enter to continue once configured, or Ctrl+C to exit..."
else
    echo -e "${GREEN}✓ .env.local found${NC}"
fi

# Start dev server
echo ""
read -p "Start dev server now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${GREEN}Starting — open http://localhost:3000${NC}"
    echo -e "${CYAN}Press Ctrl+C to stop${NC}"
    npm run dev
else
    echo -e "${GREEN}Run ${CYAN}npm run dev${GREEN} when ready.${NC}"
fi
